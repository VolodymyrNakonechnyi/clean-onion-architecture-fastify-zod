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
            logger: true
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