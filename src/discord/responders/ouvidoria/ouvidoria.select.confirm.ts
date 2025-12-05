import { createResponder, ResponderType } from "#base";
import { ChannelType } from "discord.js";
import { db } from "../../../database/firestore.js";
import { icon } from "../../../functions/utils/emojis.js";
import { ouvidoriaSelectThreadInitContainer } from "../../containers/commands/slash/private/ouvidoria/ouvidoria.select.threadInit.js";
import { ouvidoriaThreadInitContainer } from "../../containers/commands/slash/private/ouvidoria/ouvidoria.thread.init.js";

createResponder({
    customId: "/ouvidoria/:ouvidoriaResponsavelNumber/select/confirm",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction, { ouvidoriaResponsavelNumber }) {
        if (interaction.channelId != constants.channels.ouvidoriaChannelId) {
            interaction.reply({
                flags: ["Ephemeral"],
                content: "Como Você Usou Isso Em Outro Canal, Cara?"
            })
            return;
        }

        const docRef = db.collection("ouvidoria").doc(ouvidoriaResponsavelNumber);
        const doc = await docRef.get();

        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Este atendimento está corrompido, tente novamente!`
            })
            return;
        }

        const data = doc.data();

        if (!data) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Os dados do documento estão vazios`
            })
            return;
        }

        if (interaction.channel && interaction.channel.type === ChannelType.GuildText) {
            const ticketthread = await interaction.channel.threads.create({
                name: `${interaction.user.username} | ${ouvidoriaResponsavelNumber[0]}-${ouvidoriaResponsavelNumber.slice(1)}`,
                autoArchiveDuration: 60,
                invitable: false,
                type: ChannelType.PrivateThread,
                reason: `Atendimento Ao Militar | ${interaction.user.username} | ${data.ouvidoriaResponsavel}`,
            });

            await interaction.update({
                components: [ouvidoriaSelectThreadInitContainer(interaction.member, data.ouvidoriaEmoji, interaction.guild, ticketthread)]
            })

            await ticketthread.send({
                flags: ["IsComponentsV2"],
                components: [ouvidoriaThreadInitContainer(interaction.member, data.ouvidoriaEmoji, data.ouvidoriaRoleId!, ouvidoriaResponsavelNumber)]
            });
        }
    },
});