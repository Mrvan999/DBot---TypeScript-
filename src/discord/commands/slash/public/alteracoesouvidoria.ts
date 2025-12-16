import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { promises as fs } from "fs";
import { db } from "../../../../database/firestore.js";
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
        if (interaction.options.getSubcommand() !== "ouvidoria") return;

        const responsavel = interaction.options.getString("responsavel")!;
        const ticket = interaction.options.getString("ticket")!;
        const alteracao = interaction.options.getString("alteracao")!;

        const docRef = db.collection("contagens").doc("diretoriadepessoal");
        const doc = await docRef.get();

        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Houve um erro ao acessar o documento "diretoriadepessoal", entre em contato com a DTIC.`
            })
            return;
        }

        const data = doc.data();

        if (!data) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} O documento "diretoriadepessoal" está vazio, entre em contato com a DTIC.`
            })
            return;
        }

        const alteracaoatual = Number(data.alteracaoatual) + 1;

        await docRef.update({
            "alteracaoatual": String(alteracaoatual)
        })

        const alteracoesouvidoriaChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.alteracoesouvidoriaChannelId);
        if (!alteracoesouvidoriaChannel?.isTextBased()) return;

        let messagemd = await fs.readFile('src/discord/messages/alteracoesouvidoria.base.md', 'utf-8');

        messagemd = messagemd
            .replace(/\$\{numero\}/g, String(alteracaoatual))
            .replace(/\$\{emoji\}/g, icon.dp.toString())
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
