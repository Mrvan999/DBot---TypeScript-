import { ApplicationCommandOptionType, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import { createRegistroDocument } from "../../../../../functions/utils/createRegistroDocument.js";
import { registroConsultarContainer } from "../../../../containers/commands/slash/private/registro/registro.consultar.js";

export default {
    options: [
        {
            name: "militar",
            description: "Informe o Registro Geral do Militar.",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "rg",
            description: "Informe o Registro Geral do Militar.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "nome",
            description: "Informe o Nome do Militar.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "patente",
            description: "Informe a Patente do Militar.",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name: "opm",
            description: "Informe a OPM do Militar.",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name: "status",
            description: "Informe o Status do Militar.",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name: "bopm",
            description: "Informe a quantia de BOPMs que o militar possui.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "talao",
            description: "Informe a quantia de apreensões que o militar possui.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],

    async run(interaction: ChatInputCommandInteraction<"cached">) {
        const militar = await interaction.guild.members.fetch(interaction.options.getUser("militar")!.id);
        const rg = interaction.options.getString("rg")!;
        const nome = interaction.options.getString("nome")!;
        const patente = interaction.options.getString("patente")!;
        const opm = interaction.options.getString("opm")!;
        const status = interaction.options.getString("status")!;
        const bopm = interaction.options.getString("bopm")!;
        const talao = interaction.options.getString("talao")!;

        await createRegistroDocument(militar.id, nome, rg, patente, opm, status, bopm, talao);

        await interaction.reply({
            flags: ["Ephemeral", "IsComponentsV2"],
            components: [registroConsultarContainer(militar, nome, patente, rg, opm, status, bopm, talao)]
        })
    },

    async autocomplete(interaction: AutocompleteInteraction<"cached">) {
        const focused = interaction.options.getFocused(true);

        if (focused.name === "patente") {
            const todasSugestoes = [
                "Coronel PM",
                "Tenente-Coronel PM",
                "Major PM",
                "Capitão PM",
                "1º Tenente PM",
                "2º Tenente PM",
                "Aspirante a Oficial PM",
                "Aluno Oficial PM 4º Ano",
                "Aluno Oficial PM 3º Ano",
                "Aluno Oficial PM 2º Ano",
                "Aluno Oficial PM 1º Ano",
                "Subtenente PM",
                "1º Sargento PM",
                "2º Sargento PM",
                "3º Sargento PM",
                "Aluno Sargento PM",
                "Cabo PM",
                "Soldado 1º Classe PM",
                "Soldado 2º Classe PM"
            ];

            const filtradas = todasSugestoes
                .filter(s => s.toLowerCase().includes(focused.value.toLowerCase()))
                .slice(0, 25);

            return interaction.respond(
                filtradas.map(s => ({ name: s, value: s }))
            );
        } else if (focused.name === "opm") {
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
        } else if (focused.name === "status") {
            const todasSugestoes = [
                "Desligado",
                "Detido",
                "Reserva Remunerada",
                "Reserva Não Remunerada",
                "Licença",
                "Normalidade"
            ];

            const filtradas = todasSugestoes
                .filter(s => s.toLowerCase().includes(focused.value.toLowerCase()))
                .slice(0, 25);

            return interaction.respond(
                filtradas.map(s => ({ name: s, value: s }))
            );
        }
    }
};
