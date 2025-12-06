import { createResponder, ResponderType } from "#base";
import { db } from "../../../database/firestore.js";
import { icon } from "../../../functions/utils/emojis.js";
import { ouvidoriaSelectChangeContainer } from "../../containers/commands/slash/private/ouvidoria/ouvidoria.select.change.js";
createResponder({
    customId: "/ouvidoria/:ouvidoriaResponsavelNumber/select/change",
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
        await interaction.update({
            components: [ouvidoriaSelectChangeContainer(interaction.member, data.ouvidoriaEmoji, ouvidoriaResponsavelNumber)]
        });
    },
});
