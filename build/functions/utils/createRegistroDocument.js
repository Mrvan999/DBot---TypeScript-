import { db } from "../../database/firestore.js";
export async function createRegistroDocument(memberId, nome, rg, patente, opm) {
    try {
        await db.collection("militares").doc(memberId).set({
            memberId: memberId,
            nome: nome,
            rg: rg,
            patente: patente,
            opm: opm
        });
        console.log("Documento de militar criado com sucesso!");
    }
    catch (error) {
        console.error("Erro ao criar documento de militar:", error);
        throw error;
    }
}
