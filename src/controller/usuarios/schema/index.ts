import z from "zod";

export const CriarUsuariosSchema = z.object({
    nome: z.string(),
    email: z.string(),
    senha: z.string(),
    contato: z.string()
})

export const LoginUsuarioSchema = z.object({
    email: z.string().min(1),
    senha: z.string().min(1)
})

export type ICriarUsuarioSchema = z.infer<typeof CriarUsuariosSchema>;
export type ILoginUsuarioSchema = z.infer<typeof LoginUsuarioSchema>;
