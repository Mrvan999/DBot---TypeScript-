import { db } from "../../database/firestore.js";
export async function createLicenseRequest(memberId, motivo, tempo, observacoes) {
    try {
        await db.collection("licenses").doc(memberId).set({
            memberId: memberId,
            motivo: motivo,
            tempo: tempo,
            observacoes: observacoes,
            status: "Aguardando Aprovação",
            createdAt: new Date(),
        });
        console.log("Documento de licença criado com sucesso!");
    }
    catch (error) {
        console.error("Erro ao criar documento de licença:", error);
        throw error;
    }
}
