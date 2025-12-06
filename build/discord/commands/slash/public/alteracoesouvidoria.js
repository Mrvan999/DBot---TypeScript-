import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { promises as fs } from "fs";
import { icon } from "../../../../functions/utils/emojis.js";
createCommand({
    name: "alteracao",
    description: "Comandos de registro",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "ouvidoria",
            description: "Registra uma alteração feita pela Ouvidoria da Diretoria de Pessoal",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "responsavel",
                    description: "Informe sua função, graduação/posto e nome. (Diretor de Pessoal, **Major PM César Nero**)",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "ticket",
                    description: "Informe a numeração do ticket. (Apenas o número)",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "alteracao",
                    description: "Informe a alteração realizada.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    async run(interaction) {
        if (interaction.options.getSubcommand() !== "ouvidoria")
            return;
        const responsavel = interaction.options.getString("responsavel");
        const ticket = interaction.options.getString("ticket");
        const alteracao = interaction.options.getString("alteracao");
        const constantsData = JSON.parse(await fs.readFile("constants.json", "utf-8"));
        if (!constantsData.ouvidoriaDp || !constantsData.ouvidoriaDp.alteracaoatual) {
            constantsData.ouvidoriaDp = { alteracaoatual: "1" };
        }
        let alteracaoNumero = parseInt(constantsData.ouvidoriaDp.alteracaoatual);
        alteracaoNumero++;
        constantsData.bopm.bopmatual = String(alteracaoNumero);
        await fs.writeFile("constants.json", JSON.stringify(constantsData, null, 4), "utf-8");
        const alteracoesouvidoriaChannel = await interaction.guild.channels.fetch(constants.channels.alteracoesouvidoriaChannelId);
        if (!alteracoesouvidoriaChannel?.isTextBased())
            return;
        let messagemd = await fs.readFile('src/discord/messages/alteracoesouvidoria.base.md', 'utf-8');
        messagemd = messagemd
            .replace(/\$\{numero\}/g, String(alteracaoNumero))
            .replace(/\$\{numeroticket\}/g, ticket)
            .replace(/\$\{alteracao\}/g, alteracao)
            .replace(/\$\{responsavel\}/g, responsavel)
            .replace(/\$\{interaction\.user\}/g, `<@${interaction.user.id}>`);
        await alteracoesouvidoriaChannel.send({
            content: messagemd
        });
        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Alteração registrada com sucesso.`
        });
    }
});
