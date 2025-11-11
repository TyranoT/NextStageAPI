"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const usuarios_1 = require("../controller/usuarios");
const app = (0, fastify_1.default)({ logger: true });
// Configuração de CORS
app.register(cors_1.default, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
});
// Rotas
app.get("/", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    reply.send({ hello: "world" });
}));
// Usuários
app.post("/cadastrar", usuarios_1.ControllerUsers.CriarUsuario);
app.post("/entrar", usuarios_1.ControllerUsers.LoginUsuario);
// Start
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield app.listen({ port: 3000, host: "localhost" });
        console.log("Server running on http://localhost:3000");
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
});
start();
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield app.ready();
    app.server.emit("request", req, res);
});
