import { ApplicationCommandOptionType, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import { icon } from "../../../../../functions/utils/emojis.js";
import { avaliarMilitarShowNameContainer } from "../../../../containers/commands/slash/public/avaliar/avaliar.militar.showName.js";

export default {
    options: [
        {
            name: "militar",
            description: "Selecione o militar que deseja avaliar.",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "estrelas",
            description: "Selecione a quantidade de estrelas que deseja dar ao militar.",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name: "avaliacao",
            description: "Descreva sua avaliação.",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    async run(interaction: ChatInputCommandInteraction<"cached">) {
        const militarUser = interaction.options.getUser("militar")!;
        const estrelas = interaction.options.getString("estrelas")!;
        const avaliacao = interaction.options.getString("avaliacao")!;

        const militarMember = await interaction.guild.members.fetch(militarUser.id);

        if (!["1", "2", "3", "4", "5"].includes(estrelas)) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} O valor em estrelas é inválido.`
            })
            return;
        };

        const estrelasFormat = "⭐".repeat(Number(estrelas));

        const avaliacaoShowNameChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.avaliacaoShowNameChannelId);
        if (!avaliacaoShowNameChannel?.isTextBased()) return;

        await avaliacaoShowNameChannel.send({
            flags: ["IsComponentsV2"],
            components: [avaliarMilitarShowNameContainer(militarMember, interaction.member, estrelasFormat, avaliacao)]
        });

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Avaliação enviada com sucesso.`
        });
    },

    async autocomplete(interaction: AutocompleteInteraction<"cached">) {
        const focused = interaction.options.getFocused(true);

        if (focused.name === "estrelas") {
            const sugestões = [
                { name: "⭐⭐⭐⭐⭐", value: "5" },
                { name: "⭐⭐⭐⭐", value: "4" },
                { name: "⭐⭐⭐", value: "3" },
                { name: "⭐⭐", value: "2" },
                { name: "⭐", value: "1" }
            ].filter(s => s.name.includes(focused.value));

            return interaction.respond(
                sugestões
            );
        }
    }
};
