import { ApplicationCommandOptionType, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import { icon } from "../../../../../functions/utils/emojis.js";
import { avaliarOPMContainer } from "../../../../containers/commands/slash/public/avaliar/avaliar.opm.js";
import { avaliarOPMShowNameContainer } from "../../../../containers/commands/slash/public/avaliar/avaliar.opm.showName.js";

export default {
    options: [
        {
            name: "opm",
            description: "Selecione a OPM que deseja avaliar.",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
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
        const opm = interaction.options.getString("opm")!;
        const estrelas = interaction.options.getString("estrelas")!;
        const avaliacao = interaction.options.getString("avaliacao")!;

        if (!["1", "2", "3", "4", "5"].includes(estrelas)) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} O valor em estrelas é inválido.`
            })
            return;
        };

        const estrelasFormat = "⭐".repeat(Number(estrelas));

        const avaliacaoChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.avaliacaoChannelId);
        if (!avaliacaoChannel?.isTextBased()) return;

        const avaliacaoShowNameChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.avaliacaoShowNameChannelId);
        if (!avaliacaoShowNameChannel?.isTextBased()) return;

        await avaliacaoChannel.send({
            flags: ["IsComponentsV2"],
            components: [avaliarOPMContainer(opm, estrelasFormat, avaliacao)]
        });

        await avaliacaoShowNameChannel.send({
            flags: ["IsComponentsV2"],
            components: [avaliarOPMShowNameContainer(opm, interaction.member, estrelasFormat, avaliacao)]
        });

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Avaliação enviada com sucesso.`
        });
    },

    async autocomplete(interaction: AutocompleteInteraction<"cached">) {
        const focused = interaction.options.getFocused(true);

        if (focused.name === "opm") {
            const todasSugestoes = [
                "Gabinete do Comando Geral",
                "Estado-Maior da Polícia Militar",
                "Corregedoria da Polícia Militar",
                "Centro de Inteligência da Polícia Militar",
                "Diretoria de Educação e Cultura",
                "Diretoria de Pessoal",
                "Diretoria de Logística",
                "Diretoria de Saúde",
                "Academia de Polícia Militar do Barro Branco",
                "Escola Superior de Sargentos",
                "Escola Superior de Soldados",
                "22º BPM/M",
                "22º BPM/M - 1ª CIA",
                "4º BPChq",
                "4º BPChq - 4ª CIA",
                "4º BPChq - 6ª CIA"
            ];

            const filtradas = todasSugestoes
                .filter(s => s.toLowerCase().includes(focused.value.toLowerCase()))
                .slice(0, 25);

            return interaction.respond(
                filtradas.map(s => ({ name: s, value: s }))
            );
        }

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
