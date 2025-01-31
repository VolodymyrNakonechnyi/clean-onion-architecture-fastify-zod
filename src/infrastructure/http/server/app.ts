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
import { NotificationReminder } from "../../../core/services/notification.srv.js";

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
    
    public async initialize() {
        try {
			await this.registerMiddlewares()
            
            const appointmentRepository = new AppointmentRepository();
            const doctorRepository = new DoctorRepository();
            const userRepository = new UserRepository();

            const notificationReminder = new NotificationReminder(appointmentRepository);
            notificationReminder.onReminder((data) => {
                this.app.log.info({
                    msg: 'Appointment reminder triggered',
                    appointment: {
                        id: data.userId,
                        datetime: data.appointmentDate,
                    }
                });

                console.log('Appointment reminder triggered',
                    JSON.stringify({
                        id: data.userId,
                        datetime: data.appointmentDate,
                    }))
            })


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