import { db } from "../../../database/firestore.js";

export async function createLicenseRequest(memberId: string, motivo: string, tempo: string, observacoes: string): Promise<void> {
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
    } catch (error) {
        console.error("Erro ao criar documento de licença:", error);
        throw error;
    }
}
