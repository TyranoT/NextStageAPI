"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUsuarioSchema = exports.CriarUsuariosSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CriarUsuariosSchema = zod_1.default.object({
    nome: zod_1.default.string(),
    email: zod_1.default.string(),
    senha: zod_1.default.string(),
    contato: zod_1.default.string()
});
exports.LoginUsuarioSchema = zod_1.default.object({
    email: zod_1.default.string().min(1),
    senha: zod_1.default.string().min(1)
});
