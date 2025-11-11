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
exports.LoginUsuario = exports.CriarUsuario = void 0;
const schema_1 = require("./schema");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CriarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verify = schema_1.CriarUsuariosSchema.safeParse(req.body);
    if (!verify.success) {
        console.log(verify.error.message);
        return res.status(400).send({ error: { default: "Error na tipagem" } });
    }
    const hashSenha = jsonwebtoken_1.default.sign(verify.data.senha, process.env.SECRET_KEY);
    try {
        yield prisma_1.default.usuarios.create({
            data: {
                contato: verify.data.contato,
                email: verify.data.email,
                hashSenha: hashSenha,
                nome: verify.data.nome
            }
        });
        return res.status(201).send({ msg: "Usuário Cadastrado" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({ errors: { default: "Erro interno" } });
    }
});
exports.CriarUsuario = CriarUsuario;
const LoginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.usuarios.findFirst({
        where: {
            email: req.body.email
        }
    });
    if (user) {
        const decode = jsonwebtoken_1.default.decode(user.hashSenha);
        if (decode == req.body.senha) {
            const token = jsonwebtoken_1.default.sign(user, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });
            return res.status(201).send({ msg: "Usuário Logado", data: token });
        }
        else {
            return res.status(400).send({ errors: { default: "Senha incorreta" } });
        }
    }
    else {
        return res.status(404).send({ errors: { default: "Usuário não cadastrado" } });
    }
});
exports.LoginUsuario = LoginUsuario;
