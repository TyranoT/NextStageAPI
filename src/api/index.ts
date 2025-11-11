import Fastify from "fastify";
import cors from "@fastify/cors";
import { ControllerUsers } from "../controller/usuarios";
import { VercelRequest, VercelResponse } from "@vercel/node";

// Cria a instância do Fastify apenas uma vez
const app = Fastify({ logger: false });

// Configuração de CORS
app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
});

// Rotas
app.get("/", async (request, reply) => {
  return { hello: "world" };
});

app.post("/cadastrar", ControllerUsers.CriarUsuario);
app.post("/entrar", ControllerUsers.LoginUsuario);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await app.ready();
  app.server.emit("request", req, res);
}
