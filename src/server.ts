import Fastify from "fastify";
import cors from "@fastify/cors";

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