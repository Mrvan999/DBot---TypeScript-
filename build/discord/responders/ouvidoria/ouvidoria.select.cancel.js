import { createResponder, ResponderType } from "#base";
import { db } from "../../../database/firestore.js";
import { icon } from "../../../functions/utils/emojis.js";
import { ouvidoriaCorregNumberMinus, ouvidoriaDPNumberMinus, ouvidoriaEMNumberMinus } from "../../../functions/utils/ouvidoria/ouvidoria.numberCreate.js";
import { ouvidoriaSelectCancelContainer } from "../../containers/commands/slash/private/ouvidoria/ouvidoria.select.cancel.js";
createResponder({
    customId: "/ouvidoria/:ouvidoriaResponsavelNumber/select/cancel",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction, { ouvidoriaResponsavelNumber }) {
        const docRef = db.collection("ouvidoria").doc(ouvidoriaResponsavelNumber);
        const doc = await docRef.get();
        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Este atendimento está corrompido, tente novamente!`
            });
            return;
        }
        const data = doc.data();
        if (!data) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Os dados do documento estão vazios`
            });
            return;
        }
        const oldOuvidoriaResponsavel = data.ouvidoriaResponsavel;
        switch (oldOuvidoriaResponsavel) {
            case "Diretoria de Pessoal da Polícia Militar":
                ouvidoriaDPNumberMinus();
                break;
            case "Corregedoria da Polícia Militar":
                ouvidoriaCorregNumberMinus();
                break;
            case "Estado Maior da Polícia Militar":
                ouvidoriaEMNumberMinus();
                break;
            default:
                ouvidoriaDPNumberMinus();
                break;
        }
        await interaction.update({
            components: [ouvidoriaSelectCancelContainer(interaction.member, data.ouvidoriaEmoji)]
        });
        await docRef.delete();
    },
});
