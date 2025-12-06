import { createCommand } from "#base";
import { brBuilder } from "@magicyan/discord";
import { ApplicationCommandOptionType, ApplicationCommandType, time, TimestampStyles } from "discord.js";
import { promises as fs } from "fs";
import { icon } from "../../../../functions/utils/emojis.js";
createCommand({
    name: "registrar",
    description: "Comandos de registro",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "bopm",
            description: "Registrar Boletim Policial-Militar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "militares",
                    description: "Mencione os militares participantes. (@user, @user, @user...)",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "origem",
                    description: "Selecione a origem da ocorrência.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                },
                {
                    name: "endereco",
                    description: "Informe o endereço da ocorrência. (Freedom Avanue, 0000 - 000)",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "resultado",
                    description: "Selecione a resultado da ocorrência.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                },
                {
                    name: "artigos",
                    description: "Informe os artigos que se enquadram da ocorrência. (Art. X, Art. X, Art.X...)",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "descricao",
                    description: "Informe o ocorrido de forma clara.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "acusado",
                    description: "Informe o acusado da ocorrência. (Fulano de Tal | 0000)",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "foto",
                    description: "Envie uma foto do ponto fixo da ocorrência.",
                    type: ApplicationCommandOptionType.Attachment,
                    required: true
                },
                {
                    name: "vitima",
                    description: "Informe a vítima da ocorrência. (Fulano de Tal | 0000)",
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: "outro",
                    description: "Informe os transeuntes da ocorrência. (Fulano de Tal | 0000)",
                    type: ApplicationCommandOptionType.String,
                    required: false
                }
            ]
        }
    ],
    async run(interaction) {
        if (interaction.options.getSubcommand() !== "bopm")
            return;
        const militares = interaction.options.getString("militares");
        const origem = interaction.options.getString("origem");
        const endereco = interaction.options.getString("endereco");
        const resultado = interaction.options.getString("resultado");
        const artigos = interaction.options.getString("artigos");
        const descricao = interaction.options.getString("descricao");
        const acusado = interaction.options.getString("acusado");
        const foto = interaction.options.getAttachment("foto");
        const vitima = interaction.options.getString("vitima") ?? "Não Há";
        const outro = interaction.options.getString("outro") ?? "Não Há";
        const constantsData = JSON.parse(await fs.readFile("constants.json", "utf-8"));
        if (!constantsData.bopm || !constantsData.bopm.bopmatual) {
            constantsData.bopm = { bopmatual: "1" };
        }
        let nbopm = parseInt(constantsData.bopm.bopmatual);
        nbopm++;
        constantsData.bopm.bopmatual = String(nbopm);
        await fs.writeFile("constants.json", JSON.stringify(constantsData, null, 4), "utf-8");
        const bopmChannel = await interaction.guild.channels.fetch(constants.channels.bopmChannelId);
        if (!bopmChannel?.isTextBased())
            return;
        let messagemd = await fs.readFile('src/discord/messages/bopm.base.md', 'utf-8');
        messagemd = messagemd
            .replace(/\$\{nbopm\}/g, String(nbopm))
            .replace(/\$\{militares\}/g, militares)
            .replace(/\$\{data\}/g, time(new Date(), TimestampStyles.LongDateShortTime))
            .replace(/\$\{origem\}/g, origem)
            .replace(/\$\{endereco\}/g, endereco)
            .replace(/\$\{resultado\}/g, resultado)
            .replace(/\$\{artigos\}/g, artigos)
            .replace(/\$\{acusado\}/g, acusado)
            .replace(/\$\{vitima\}/g, vitima)
            .replace(/\$\{outro\}/g, outro)
            .replace(/\$\{interaction\.user\}/g, `<@${interaction.user.id}>`);
        const mensagemComDescricao = messagemd.replace(/\$\{descricao\}/g, descricao);
        let mainMessageContent = mensagemComDescricao;
        let descricaoParaTopico = null;
        if (mensagemComDescricao.length > 2000) {
            mainMessageContent = messagemd.replace(/\$\{descricao\}/g, "Adicionada ao tópico anexado a este.");
            descricaoParaTopico = descricao;
        }
        const mainMessage = await bopmChannel.send({
            content: mainMessageContent,
            files: [foto]
        });
        if (descricaoParaTopico) {
            const messageThread = await mainMessage.startThread({
                name: `BO nº ${nbopm}`,
                autoArchiveDuration: 1440,
                reason: `BO nº ${nbopm} tem sua descrição mais que o esperado.`
            });
            await messageThread.send({
                content: brBuilder(`**Descrição Completa:**`, `${descricaoParaTopico}`)
            });
        }
        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Boletim registrado com sucesso.`
        });
    },
    async autocomplete(interaction) {
        const focused = interaction.options.getFocused(true);
        if (focused.name === "origem") {
            const sugestões = [
                "Sala de Operação",
                "Deparou-se com a Ocorrência",
                "Centro de Operações",
                "Solicitação ao Policial",
                "Resultado de Abordagem"
            ].filter(s => s.toLowerCase().includes(focused.value.toLowerCase()));
            return interaction.respond(sugestões.map(s => ({ name: s, value: s })));
        }
        else if (focused.name === "resultado") {
            const sugestões = [
                "Apresentação na Delegacia",
                "Internação no Hospital",
                "Óbito Evidente",
                "Óbito Constatado",
                "Liberado no Local"
            ].filter(s => s.toLowerCase().includes(focused.value.toLowerCase()));
            return interaction.respond(sugestões.map(s => ({ name: s, value: s })));
        }
    }
});
