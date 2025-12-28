import { db } from "../../database/firestore.js";

export async function createRegistroDocument(memberId: string, nome: string, rg: string, patente:string, opm: string, status: string, bopm: string, talao: string): Promise<void> {
    try {
        await db.collection("militares").doc(rg).set({
            memberId: memberId,
            nome: nome,
            rg: rg,
            patente: patente,
            opm: opm,
            status: status,
            bopm: bopm,
            talao: talao
        });
        console.log("Documento de militar criado com sucesso!");
    } catch (error) {
        console.error("Erro ao criar documento de militar:", error);
        throw error;
    }
}
