import { db } from "../../../database/firestore.js";
import { suggestionsNumber } from "./suggestions.numberCreate.js";
export async function suggestionCreateFirestore(memberId, sugestao, sugestaoLink) {
    let suggestionsAtualNumber = await suggestionsNumber();
    try {
        await db.collection("suggestions").doc(suggestionsAtualNumber).set({
            memberId: memberId,
            sugestao: sugestao,
            sugestaoId: sugestaoLink
        });
        console.log("Documento de sugestão criado com sucesso!");
    }
    catch (error) {
        console.error("Erro ao criar documento de sugestão:", error);
        throw error;
    }
    return suggestionsAtualNumber;
}
