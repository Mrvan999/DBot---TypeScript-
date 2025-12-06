import { db } from "../../../database/firestore.js";
import { ouvidoriaCorregNumber, ouvidoriaDPNumber, ouvidoriaEMNumber } from "./ouvidoria.numberCreate.js";
export async function ouvidoriaCreateFirestore(memberId, ouvidoriaResponsavel, ouvidoriaEmoji, ouvidoriaRoleId) {
    let ouvidoriaResponsavelNumber;
    let ouvidoriaResponsavelType;
    switch (ouvidoriaResponsavel) {
        case "Diretoria de Pessoal da Polícia Militar":
            ouvidoriaResponsavelNumber = await ouvidoriaDPNumber();
            ouvidoriaResponsavelType = "1";
            break;
        case "Corregedoria da Polícia Militar":
            ouvidoriaResponsavelNumber = await ouvidoriaCorregNumber();
            ouvidoriaResponsavelType = "2";
            break;
        case "Estado Maior da Polícia Militar":
            ouvidoriaResponsavelNumber = await ouvidoriaEMNumber();
            ouvidoriaResponsavelType = "3";
            break;
        default:
            ouvidoriaResponsavelNumber = await ouvidoriaDPNumber();
            ouvidoriaResponsavelType = "0";
            break;
    }
    try {
        await db.collection("ouvidoria").doc(`${ouvidoriaResponsavelType}${String(ouvidoriaResponsavelNumber)}`).set({
            memberId: memberId,
            ouvidoriaResponsavel: ouvidoriaResponsavel,
            ouvidoriaEmoji: ouvidoriaEmoji.toString(),
            ouvidoriaRoleId: ouvidoriaRoleId
        });
        console.log("Documento de ouvidoria criado com sucesso!");
    }
    catch (error) {
        console.error("Erro ao criar documento de ouvidoria:", error);
        throw error;
    }
    return `${ouvidoriaResponsavelType}${String(ouvidoriaResponsavelNumber)}`;
}
