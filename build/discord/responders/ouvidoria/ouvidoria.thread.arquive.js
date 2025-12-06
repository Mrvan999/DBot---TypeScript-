import { createResponder, ResponderType } from "#base";
import { db } from "../../../database/firestore.js";
import { icon } from "../../../functions/utils/emojis.js";
import { ouvidoriaThreadArquivedContainer } from "../../containers/commands/slash/private/ouvidoria/ouvidoria.thread.arquived.js";
createResponder({
    customId: "/ouvidoria/:ouvidoriaResponsavelNumber/thread/arquive",
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
            flags: ["IsComponentsV2"],
            components: [ouvidoriaThreadArquivedContainer(solicitante, interaction.user, data.ouvidoriaEmoji)]
        });
        await docRef.delete();
        if (interaction.channel?.isThread()) {
            await interaction.channel.setName(`📁 - ${interaction.channel.name}`);
            await interaction.channel.setLocked(true);
            await interaction.channel.setArchived(true);
        }
    },
});
