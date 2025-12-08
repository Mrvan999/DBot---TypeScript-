import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { promises as fs } from "fs";
import { db } from "../../../../database/firestore.js";
import { createUniformRequest } from "../../../../functions/utils/createUniformRequest.js";
import { icon } from "../../../../functions/utils/emojis.js";
import { uniformRequestButtons } from "../../../buttons/commands/slash/public/solicitacaofardamento.request.js";

createCommand({
    name: "solicitar",
    description: "Comandos de solicitação",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "fardamento",
            description: "Solicita a personalização de um fardamento para a Diretoria de Logística",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "nomesolicitante",
                    description: "Informe seu nome completo. (Raphael Figueiredo Mendes Telhada)",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "patente",
                    description: "Selecione seu posto/graduação.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                },
                {
                    name: "re",
                    description: "Informe seu registro estático. (16, 37, 48...)",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "fardamento",
                    description: "Selecione o fardamento a qual deseja personalizar.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                },
                {
                    name: "cursoformacao",
                    description: "Selecione o seu curso de formação.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                },
                {
                    name: "opm",
                    description: "Selecione a sua OPM.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                },
                {
                    name: "cursoespecializado",
                    description: "Informe seus curso de especialização. (CDC, CPTAEP, CFT | Máximo: 3)",
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: "medalhas",
                    description: "Informe suas medalhas. (Mérito DP, Mérito CPC, Mérito DL | Máximo: 3)",
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: "laurea",
                    description: "Informe o grau de sua laurea. (1º Grau, 3º Grau, 5º Grau...)",
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: "adicionais",
                    description: "Informe itens adicionais para serem adicionados a sua farda.",
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: "observacoes",
                    description: "Informe observacoes importantes para seu fardamento.",
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
            ]
        }
    ],

    async run(interaction) {
        if (interaction.options.getSubcommand() !== "fardamento") return;

        const nomesolicitante = interaction.options.getString("nomesolicitante")!;
        const patente = interaction.options.getString("patente")!;
        const re = interaction.options.getString("re")!;
        const fardamento = interaction.options.getString("fardamento")!;
        const cursoformacao = interaction.options.getString("cursoformacao")!;
        const opm = interaction.options.getString("opm")!;
        const cursoespecializado = interaction.options.getString("cursoespecializado") ?? "Não Há";
        const medalhas = interaction.options.getString("medalhas") ?? "Não Há";
        const laurea = interaction.options.getString("laurea") ?? "Não Há";
        const adicionais = interaction.options.getString("adicionais") ?? "Não Há";
        const observacoes = interaction.options.getString("observacoes") ?? "Não Há";

        const solicitacaofardamentoChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.solicitacaofardamentoChannelId);
        if (!solicitacaofardamentoChannel?.isTextBased()) return;

        const docRef = db.collection("uniforms").doc(interaction.user.id);
        const doc = await docRef.get();

        if (doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Você não pode possuir mais de uma solicitação simultanêa, caso ache que isto é um erro, contate a equipe da DTIC.`
            })
            return;
        }

        let messagemd = await fs.readFile('src/discord/messages/solicitacaofardamento.base.md', 'utf-8');

        messagemd = messagemd
            .replace(/\$\{mencaoDL\}/g, `<@&${dbroles.dl_roles.diretoriadelogisticaRoleId}>`)
            .replace(/\$\{nomeCompletoSolicitante\}/g, nomesolicitante)
            .replace(/\$\{patente\}/g, patente)
            .replace(/\$\{re\}/g, re)
            .replace(/\$\{fardamento\}/g, fardamento)
            .replace(/\$\{cursoformacao\}/g, cursoformacao)
            .replace(/\$\{opm\}/g, opm)
            .replace(/\$\{cursoespecializado\}/g, cursoespecializado)
            .replace(/\$\{medalhas\}/g, medalhas)
            .replace(/\$\{laurea\}/g, laurea)
            .replace(/\$\{adicionais\}/g, adicionais)
            .replace(/\$\{observacoes\}/g, observacoes)
            .replace(/\$\{interaction\.user\}/g, `<@${interaction.user.id}>`)
            .replace(/\$\{statusAtual\}/g, "Aguardando integrante da Diretoria de Logística");

        const messagesolicitacao = await solicitacaofardamentoChannel.send({
            content: messagemd,
            components: [uniformRequestButtons(interaction.member).toJSON()]
        });

        await createUniformRequest(interaction.member.id, messagesolicitacao.id, nomesolicitante, patente, re, fardamento, cursoformacao, opm, cursoespecializado, medalhas, laurea, adicionais, observacoes)

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Sua solicitação foi enviada a Diretoria de Logística.`
        });
    },

    async autocomplete(interaction) {
        const focused = interaction.options.getFocused(true);

        if (focused.name === "patente") {
            const sugestões = [
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
                "Soldado 2º Classe PM",
            ].filter(s => s.toLowerCase().includes(focused.value.toLowerCase()));

            return interaction.respond(
                sugestões.map(s => ({ name: s, value: s }))
            );
        } else if (focused.name === "fardamento") {
            const sugestões = [
                "B-1 | Gandola",
                "B-1 | Camisa Leve",
                "B-1 | Camisa Cinza-Bandeirante Operacional",
                "B-1 | Jaqueta Operacional",
                "B-1 | Japona",
                "B-1 | Camisa Polo Cinza-Claro",
                "B-1 | Camisa Cinza-Bandeirante Administrativa",
                "B-1 | Camisa de Serviço Cinza-Bandeirante",
                "E-1 | Polícia de Trânsito",
                "E-2 | Polícia de Trânsito e Rodoviário",
                "E-9 | Polícia Ambiental",
                "P-1 | Camisa de Passeio Cinza-Claro",
                "S-1 | Uniforme Social",
                "R-1 | Uniforme Social (Rigor)"
            ].filter(s => s.toLowerCase().includes(focused.value.toLowerCase()));

            return interaction.respond(
                sugestões.map(s => ({ name: s, value: s }))
            );
        } else if (focused.name === "opm") {
            const sugestões = [
                "Gabinente do Comando Geral",
                "Estado-Maior da Polícia Militar",
                "Diretoria de Educação e Cultura",
                "Diretoria de Pessoal",
                "Diretoria de Logística",
                "Diretoria de Saúde",
                "Academia de Polícia Militar do Barro Branco",
                "Escola Superior de Sargentos",
                "Escola Superior de Soldados",
                "4º BPChq",
                "4º BPChq - COE",
                "4º BPChq - GATE",
                "22º BPM/M",
                "22º BPM/M - FT",
                "22º BPM/M - 1ª CIA"
            ].filter(s => s.toLowerCase().includes(focused.value.toLowerCase()));

            return interaction.respond(
                sugestões.map(s => ({ name: s, value: s }))
            );
        } else if (focused.name === "cursoformacao") {
            const sugestões = [
                "Curso Superior de Polícia",
                "Curso de Aperfeiçoamento de Oficiais",
                "Curso de Formação de Oficiais",
                "Curso Superior De Tecnólogo De Administração Policial Militar",
                "Curso de Aperfeiçoamento de Sargentos",
                "Curso de Formação de Sargentos",
                "Curso de Formação de Soldados"
            ].filter(s => s.toLowerCase().includes(focused.value.toLowerCase()));

            return interaction.respond(
                sugestões.map(s => ({ name: s, value: s }))
            );
        }
    }
});
