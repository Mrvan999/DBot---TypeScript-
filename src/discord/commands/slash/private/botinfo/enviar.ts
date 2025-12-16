import { ChatInputCommandInteraction } from "discord.js";
import { db } from "../../../../../database/firestore.js";
import { icon } from "../../../../../functions/utils/emojis.js";
import { botinfoSendContainer } from "../../../../containers/commands/slash/private/botinfo/botinfo.js";

export default {
    async run(interaction: ChatInputCommandInteraction<"cached">) {
        const atualizacoesbotChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.atualizacoesbotChannelId);
        if (!atualizacoesbotChannel?.isTextBased()) return;

        const docRef = db.collection("atualizacoesbot").doc("infos");
        const doc = await docRef.get();

        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} As informações não existem no banco de dados.`
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

        const clientMember = await interaction.guild.members.fetch(data.clientId);
        let statusEmoji = "";

        switch(data.status) {
            case "Ligado":
                statusEmoji = icon.action_check.toString()
                break;
            case "Manutenção":
                statusEmoji = icon.action_remove.toString()
                break;
            case "Desligado":
                statusEmoji = icon.action_x.toString()
                break;
            case "Descontinuado":
                statusEmoji = icon.action_warning.toString()
                break;
            default:
                statusEmoji = icon.action_question.toString()
                break;
        }

        const message = await atualizacoesbotChannel.send({
            flags: ["IsComponentsV2"],
            components: [botinfoSendContainer(data.versao, clientMember, statusEmoji, data.status, data.liderTecnico, data.desenvolvedorPrincipal, data.auxiliares)]
        });

        await docRef.update({
            messageId: message.id
        });

        await interaction.reply({
            ephemeral: true,
            content: `${icon.action_check} Painel de Informações enviado com sucesso.`
        });
    }
};
