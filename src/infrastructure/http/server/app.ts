import Fastify, { FastifyInstance, RouteOptions } from "fastify";
import { type ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { registerCorsMiddleware } from "../plugins/cors.js";
import { registerSwaggerMiddleware } from "../plugins/docs.js";
import { initDB } from "../../database/index.js";
import { env } from "../../../env.js";
import routes from "../routes/index.js";
import { UserRepository } from "../../repositories/user.repo.js";
import { DoctorRepository } from "../../repositories/doctor.repo.js";
import { AppointmentRepository } from "../../repositories/appointment.repo.js";
import { NotificationService, Reminder } from "../../../core/services/notification.srv.js";

export class App {
    private app: FastifyInstance;

    constructor() {
        this.app = Fastify({
            ajv: {
                customOptions: {
                  removeAdditional: 'all',
                  coerceTypes: true,
                  useDefaults: true,
                  keywords: ['kind', 'modifier']
                }
              },
              logger: {
                transport: {
                    targets: [
                        // File logs with rotation
                        {
                            target: 'pino-roll',
                            options: {
                                file: './logs/app.log',
                                size: '10M',
                                interval: '1d',
                                mkdir: true,
                                sync: false
                            },
                            level: 'debug'
                        },
                        // Console logs
                        {
                            target: 'pino-pretty',
                            options: {
                                translateTime: 'yyyy-mm-dd HH:MM:ss.l',
                                ignore: 'pid,hostname',
                                messageFormat: '{level} | {msg}'
                            },
                            level: 'debug'
                        }
                    ]
                },
                level: 'debug'
            }
        });
    }

    private async registerMiddlewares() {
        registerCorsMiddleware(this.app);
        registerSwaggerMiddleware(this.app);
    }

    private async registerRoutes(routes: RouteOptions[]) {
        for (const route of routes) {
            this.app.withTypeProvider<ZodTypeProvider>().route(route);
        }
    }

    private async registerReminders(notificationService: NotificationService) {
        const reminders: Reminder[] = [
            {
                time: 24 * 60 * 60 * 1000,
                callback: (reminder) => {
                    this.app.log.info({
                        msg:`${reminder.time} | Hello ${reminder.user?.firstname}! Reminder: you have an appointment with ${reminder.doctor?.spec} tomorrow at ${reminder.appointmentDate}!`
                    });
                },
            },
            {
                time: 2 * 60 * 60 * 1000,
                callback: (reminder) => {
                    this.app.log.info({
                        msg: `${reminder.time} | Hello ${reminder.user?.firstname}! Reminder: you have an appointment with ${ reminder.doctor?.spec } in 2 hours at ${ reminder.appointmentDate }!`
                    });
                },
            }
        ];

        notificationService.addReminders(reminders);
    }
    
    public async initialize() {
        try {
			await this.registerMiddlewares()
            
            const appointmentRepository = new AppointmentRepository();
            const doctorRepository = new DoctorRepository();
            const userRepository = new UserRepository();

            const notificationService = new NotificationService(
                appointmentRepository, 
                userRepository, 
                doctorRepository
            );

            this.registerReminders(notificationService)

			this.app.after(() => {
                initDB(env.URL_MONGO)
                this.app.setValidatorCompiler(validatorCompiler);
                this.app.setSerializerCompiler(serializerCompiler);
                this.registerRoutes(routes(appointmentRepository, doctorRepository, userRepository))
			})

			await this.app.ready()
			return this.app
		} catch (err) {
			this.app.log.error('Error while initializing app: ', err)
			throw err
		}
    }
}