import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { promises as fs } from "fs";
import { icon } from "../../../../functions/utils/emojis.js";
createCommand({
    name: "talão",
    description: "Comandos de registro",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "apreensão",
            description: "Registrar  Talão de Apreensão",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "bopm",
                    description: "Informe o BOPM anexado. (Coloque apenas o número)",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "objeto",
                    description: "Informe o objeto apreeendido.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "quantidade",
                    description: "Informe a quantidade apreendida. (3x)",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "marca",
                    description: "Selecione a o marca do objeto apreendido.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "modelo",
                    description: "Selecione a o modelo do objeto apreendido.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "destino",
                    description: "Selecione o destino do objeto apreendido.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                },
                {
                    name: "receptor",
                    description: "Informe o receptor do objeto apreendido.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "foto",
                    description: "Envie uma foto do objeto apreendido.",
                    type: ApplicationCommandOptionType.Attachment,
                    required: true
                }
            ]
        }
    ],
    async run(interaction) {
        if (interaction.options.getSubcommand() !== "apreensão")
            return;
        const nbopm = interaction.options.getString("bopm");
        const objeto = interaction.options.getString("objeto");
        const quantidade = interaction.options.getString("quantidade");
        const marca = interaction.options.getString("marca");
        const modelo = interaction.options.getString("modelo");
        const destino = interaction.options.getString("destino");
        const receptor = interaction.options.getString("receptor");
        const foto = interaction.options.getAttachment("foto");
        const talapreesChannel = await interaction.guild.channels.fetch(constants.channels.talapreesChannelId);
        if (!talapreesChannel?.isTextBased())
            return;
        let messagemd = await fs.readFile('src/discord/messages/talaprees.base.md', 'utf-8');
        messagemd = messagemd
            .replace(/\$\{nbopm\}/g, String(nbopm))
            .replace(/\$\{objeto\}/g, objeto)
            .replace(/\$\{quantidade\}/g, quantidade)
            .replace(/\$\{marca\}/g, marca)
            .replace(/\$\{modelo\}/g, modelo)
            .replace(/\$\{destino\}/g, destino)
            .replace(/\$\{receptor\}/g, receptor)
            .replace(/\$\{interaction\.user\}/g, `<@${interaction.user.id}>`);
        await talapreesChannel.send({
            content: messagemd,
            files: [foto]
        });
        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Talão de apreensão registrado com sucesso.`
        });
    },
    async autocomplete(interaction) {
        const focused = interaction.options.getFocused(true);
        if (focused.name === "destino") {
            const sugestões = [
                "Pátio de Apreensões",
                "Delegacia de Polícia Civil"
            ].filter(s => s.toLowerCase().includes(focused.value.toLowerCase()));
            return interaction.respond(sugestões.map(s => ({ name: s, value: s })));
        }
    }
});
