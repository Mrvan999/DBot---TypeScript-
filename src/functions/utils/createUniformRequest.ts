import { db } from "../../database/firestore.js";

export async function createUniformRequest(memberId: string, messageId: string, nomesolicitante: string, patente: string, re: string, fardamento: string, cursoformacao: string, opm: string, cursoespecializado: string, medalhas: string, laurea: string, adicionais: string, observacoes: string): Promise<void> {
    try {
        await db.collection("uniforms").doc(memberId).set({
            memberId: memberId,
            nome: nomesolicitante,
            patente: patente,
            re: re,
            fardamento: fardamento,
            cursoformacao: cursoformacao,
            opm: opm,
            cursoespecializado: cursoespecializado,
            medalhas: medalhas,
            laurea: laurea,
            adicionais: adicionais,
            observacoes: observacoes,
            status: "Aguardando Aguardando integrante da Diretoria de Logística",
            createdAt: new Date(),
            messageId: messageId
        });
        console.log("Solicitação de fardamento criado com sucesso!");
    } catch (error) {
        console.error("Erro ao criar solicitação de fardamento:", error);
        throw error;
    }
}
