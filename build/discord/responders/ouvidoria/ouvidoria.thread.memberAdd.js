import { createResponder, ResponderType } from "#base";
import { db } from "../../../database/firestore.js";
import { icon } from "../../../functions/utils/emojis.js";
import { ouvidoriaThreadMemberAdd } from "../../containers/commands/slash/private/ouvidoria/ouvidoria.thread.memberAdd.js";
createResponder({
    customId: "/ouvidoria/:ouvidoriaResponsavelNumber/thread/memberadd",
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
        const solicitante = await interaction.guild.members.fetch(data.memberId);
        if (!solicitante)
            return;
        if (!interaction.member.roles.cache.has(data.ouvidoriaRoleId)) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Você não possui permissão para utilizar essa função.`
            });
            return;
        }
        await interaction.update({
            components: [ouvidoriaThreadMemberAdd(solicitante, data.ouvidoriaEmoji, ouvidoriaResponsavelNumber)]
        });
    },
});
