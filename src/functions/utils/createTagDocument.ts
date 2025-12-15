import { db } from "../../database/firestore.js";

export async function createTagDocument(name: string, message: string): Promise<void> {
    try {
        await db.collection("tags").doc(name).set({
            message: message
        });
        console.log("Documento de tag criado com sucesso!");
    } catch (error) {
        console.error("Erro ao criar documento de tag:", error);
        throw error;
    }
}
