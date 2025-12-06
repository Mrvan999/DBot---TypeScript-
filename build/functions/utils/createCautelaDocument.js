import { db } from "../../database/firestore.js";
export async function createCautelaDocument(memberId, militares, opm, modelo, prefixo, call, motivo, timestamp) {
    try {
        await db.collection("cautelas").doc(memberId).set({
            memberId: memberId,
            militares: militares,
            opm: opm,
            modelo: modelo,
            prefixo: prefixo,
            call: call,
            motivo: motivo,
            timestamp: timestamp
        });
        console.log("Documento de cautela criado com sucesso!");
    }
    catch (error) {
        console.error("Erro ao criar documento de cautela:", error);
        throw error;
    }
}
