import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js";
import { db } from "../../../../../database/firestore.js";
import { icon } from "../../../../../functions/utils/emojis.js";
import { approveSuggestionContainer } from "../../../../containers/events/suggetions.approve.js";

export default {
    options: [
        {
            name: "identificador",
            description: "Número da sugestão",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "motivo",
            description: "Motivo da aprovação",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],

    async run(interaction: ChatInputCommandInteraction<"cached">) {
        const identificador = interaction.options.getString("identificador");
        const motivo = interaction.options.getString("motivo") ?? "Não há";

        await interaction.deferReply({
            flags: ["Ephemeral"]
        })

        const suggestionsChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.suggestionsChannelId);
        if (!suggestionsChannel?.isTextBased()) return;

        const docRef = db.collection("suggestions").doc(identificador!);
        const doc = await docRef.get();

        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Esta sugestão está corrompido, tente novamente!`
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

        const suggestionMessage = await suggestionsChannel.messages.fetch(data.sugestaoId)

        if (!suggestionMessage) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Mensangem da sugestão não encontrada`
            })
            return;
        };

        const responsavelSuggestion = await interaction.guild.members.fetch(data.memberId)
        const reactionManager = suggestionMessage.reactions;

        const upReaction = reactionManager?.resolve(icon.action_check.id);
        const downReaction = reactionManager?.resolve(icon.action_x.id);

        const upcount = (upReaction?.count ?? 1) - 1;
        const downcount = (downReaction?.count ?? 1) - 1;

        await interaction.editReply({
            content: `${icon.action_check} Sugestão aprovada.`
        })

        await suggestionMessage.edit({
            flags: ["IsComponentsV2"],
            components: [approveSuggestionContainer(data.sugestao, responsavelSuggestion, interaction.member, motivo, String(upcount), String(downcount), identificador!)]
        })

        await suggestionMessage.reactions.removeAll();

        await suggestionMessage.thread!.setLocked(true);
        await suggestionMessage.thread!.setArchived(true);
    }
};
