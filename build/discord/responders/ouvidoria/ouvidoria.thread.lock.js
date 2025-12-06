import { createResponder, ResponderType } from "#base";
import { db } from "../../../database/firestore.js";
import { icon } from "../../../functions/utils/emojis.js";
import { ouvidoriaThreadLockContainer } from "../../containers/commands/slash/private/ouvidoria/ouvidoria.thead.lock.js";
createResponder({
    customId: "/ouvidoria/:ouvidoriaResponsavelNumber/thread/lock",
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
            components: [ouvidoriaThreadLockContainer(solicitante, interaction.user, data.ouvidoriaEmoji, ouvidoriaResponsavelNumber)]
        });
        if (!interaction.channel?.isThread())
            return;
        const thread = interaction.channel;
        await thread.members.fetch();
        for (const [memberId] of thread.members.cache) {
            const guildMember = await interaction.guild?.members.fetch(memberId);
            if (!guildMember)
                continue;
            if (!guildMember.roles.cache.has(data.ouvidoriaRoleId)) {
                try {
                    await thread.members.remove(memberId);
                }
                catch (error) {
                    await thread.send({
                        content: `${icon.action_x} Erro ao remover ${guildMember.user.username}.`
                    });
                    console.error(`Erro ao remover ${guildMember.user.username}:`, error);
                }
            }
        }
    },
});
