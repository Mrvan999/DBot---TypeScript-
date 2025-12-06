import { db } from "../../database/firestore.js";
export async function createUniformRequest(memberId, messageId, nomesolicitante, patente, re, fardamento, cursoformacao, opm, cursoespecializado, medalhas, laurea, adicionais, observacoes) {
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
    }
    catch (error) {
        console.error("Erro ao criar solicitação de fardamento:", error);
        throw error;
    }
}
