import { FastifyReply, FastifyRequest } from "fastify";
import { CriarUsuariosSchema, ICriarUsuarioSchema, ILoginUsuarioSchema } from "./schema";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";

export const CriarUsuario = async (req: FastifyRequest<{ Body: ICriarUsuarioSchema }>, res: FastifyReply) => {
    const verify = CriarUsuariosSchema.safeParse(req.body);

    if(!verify.success){
        console.log(verify.error.message);
        return res.status(400).send({ error: { default: "Error na tipagem" } });
    }

    const hashSenha = jwt.sign(verify.data.senha, process.env.SECRET_KEY!);

    try {

        await prisma.usuarios.create({
            data: {
                contato: verify.data.contato,
                email: verify.data.email,
                hashSenha: hashSenha,
                nome: verify.data.nome
            }
        })

        return res.status(201).send({ msg: "Usuário Cadastrado" });

    } catch (err) {
        console.error(err);

        return res.status(500).send({ errors: { default: "Erro interno" } });
    }
}

export const LoginUsuario = async (req: FastifyRequest<{Body: ILoginUsuarioSchema}>, res: FastifyReply) => {

    const user = await prisma.usuarios.findFirst({
        where: {
            email: req.body.email
        }
    });

    if(user){
        const decode = jwt.decode(user.hashSenha);

        if(decode == req.body.senha){

            const token = jwt.sign(user, process.env.SECRET_KEY!, {
                expiresIn: "1h",
            });
            
            return res.status(201).send({ msg: "Usuário Logado", data: token })
        } else {
            return res.status(400).send({ errors: { default: "Senha incorreta" } });
        }
    } else {
        return res.status(404).send({ errors: { default: "Usuário não cadastrado"} });
    }

}