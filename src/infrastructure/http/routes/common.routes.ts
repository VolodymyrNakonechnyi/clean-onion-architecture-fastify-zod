import { healthHandler, helloHandler } from "../controllers/common.ctrl.js";
import { healthResponseSchema, helloResponseSchema } from "../schemas/common.schema.js";

export const commonRoutes = () => ([
  {
      method: 'GET',
      url: "/health",
      schema: healthResponseSchema,
      handler: healthHandler
  },
  {
      method: 'GET',
      url: '/',
      schema: helloResponseSchema,
      handler: helloHandler
  }
]);