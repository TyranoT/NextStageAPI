import Fastify from "fastify";
import cors from "@fastify/cors";
import { ControllerUsers } from "../controller/usuarios";
import { VercelRequest, VercelResponse } from "@vercel/node";

const app = Fastify({ logger: true });

// Configuração de CORS
app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
});

// Rotas
app.get("/", async (request, reply) => {
  reply.send({ hello: "world" });
});

// Usuários
app.post("/cadastrar", ControllerUsers.CriarUsuario);
app.post("/entrar", ControllerUsers.LoginUsuario);

// Start
const start = async () => {
  try {
    await app.listen({ port: 3000, host: "localhost" });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export default async (req: VercelRequest, res: VercelResponse) => {
    await app.ready();
    app.server.emit("request", req, res);
};
