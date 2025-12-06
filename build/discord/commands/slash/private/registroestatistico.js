import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";
import { registroSendContainer } from "../../../containers/commands/slash/private/registro.send.js";
createCommand({
    name: "registro",
    description: "Comandos de envio",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "enviar",
            description: "Envia container com botão para registro estatístico - Admin",
            type: ApplicationCommandOptionType.Subcommand
        }
    ],
    async run(interaction) {
        if (interaction.options.getSubcommand() !== "enviar")
            return;
        const registroestatisticoChannel = await interaction.guild.channels.fetch(constants.channels.registroestatisticoChannelId);
        if (!registroestatisticoChannel?.isTextBased())
            return;
        const filenames = ["BannerPMESP_Registro_Estatistico"];
        const files = filenames.map(name => new AttachmentBuilder(`./src/assets/images/${name}.png`, { name: `${name}.png` }));
        await registroestatisticoChannel.send({
            flags: ["IsComponentsV2"],
            components: [registroSendContainer()],
            files: files,
            allowedMentions: { parse: [] }
        });
        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Container enviado com sucesso.`
        });
    }
});
