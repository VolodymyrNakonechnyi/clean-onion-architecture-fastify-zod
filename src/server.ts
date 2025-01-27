import { App } from "./infrastructure/http/server/app.js";
import { env } from "./env.js";

async function startServer() {
	try {
		const app = new App();
		const server = await app.initialize();

		await server.listen({ port: env.PORT, host: '0.0.0.0' });

		console.log(`Server is running on port ${env.PORT}`);
	} catch (err) {
		console.error('Error starting server:', err);
		process.exit(1);
	}
}

startServer();