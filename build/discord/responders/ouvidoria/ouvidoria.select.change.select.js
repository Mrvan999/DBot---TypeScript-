import { createResponder, ResponderType } from "#base";
import { db } from "../../../database/firestore.js";
import { icon } from "../../../functions/utils/emojis.js";
import { ouvidoriaCreateFirestore } from "../../../functions/utils/ouvidoria/ouvidoria.create.js";
import { ouvidoriaCorregNumberMinus, ouvidoriaDPNumberMinus, ouvidoriaEMNumberMinus } from "../../../functions/utils/ouvidoria/ouvidoria.numberCreate.js";
import { ouvidoriaSelectContainer } from "../../containers/commands/slash/private/ouvidoria/ouvidoria.select.js";
createResponder({
    customId: "/ouvidoria/:ouvidoriaResponsavelNumber/select/change/select",
    types: [ResponderType.StringSelect], cache: "cached",
    async run(interaction, { ouvidoriaResponsavelNumber }) {
        const selected = interaction.values?.[0];
        let docRef = db.collection("ouvidoria").doc(ouvidoriaResponsavelNumber);
        let doc = await docRef.get();
        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Este atendimento está corrompido, tente novamente!`
            });
            return;
        }
        let data = doc.data();
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
        switch (selected) {
            case "ouvidoriadp":
                await docRef.delete();
                ouvidoriaResponsavelNumber = await ouvidoriaCreateFirestore(interaction.member.id, "Diretoria de Pessoal da Polícia Militar", icon.dp.toString(), dbroles.dp_roles.ouvidoriadpRoleId);
                break;
            case "ouvidoriacorreg":
                await docRef.delete();
                ouvidoriaResponsavelNumber = await ouvidoriaCreateFirestore(interaction.member.id, "Corregedoria da Polícia Militar", icon.correg.toString(), dbroles.correg_roles.corregedoriaRoleId);
                break;
            case "ouvidoriaempm":
                await docRef.delete();
                ouvidoriaResponsavelNumber = await ouvidoriaCreateFirestore(interaction.member.id, "Estado Maior da Polícia Militar", icon.correg.toString(), dbroles.empm_roles.estadomaiorRoleId);
                break;
            default:
                await docRef.delete();
                ouvidoriaResponsavelNumber = await ouvidoriaCreateFirestore(interaction.member.id, "Ouvidoria Desconhecida", icon.clipboard_remove.toString(), dbroles.postos_roles.oficiaisSuperioresRoleId);
                break;
        }
        docRef = db.collection("ouvidoria").doc(ouvidoriaResponsavelNumber);
        doc = await docRef.get();
        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Este atendimento está corrompido, tente novamente!`
            });
            return;
        }
        data = doc.data();
        if (!data) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Os dados do documento estão vazios`
            });
            return;
        }
        await interaction.update({
            components: [ouvidoriaSelectContainer(interaction.member, data.ouvidoriaResponsavel, data.ouvidoriaEmoji, ouvidoriaResponsavelNumber)]
        });
    },
});
