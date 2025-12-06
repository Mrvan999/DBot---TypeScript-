import { brBuilder, createContainer, createSection, createSeparator, createTextDisplay } from "@magicyan/discord";
import { TimestampStyles, time } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";
export function commandSlashLogContainer(interaction) {
    const options = interaction.options.data;
    const optionsFormatted = options.length > 0
        ? options.map(opt => `- ${opt.name}: ${opt.value}`).join("\n")
        : "*Sem parâmetros*";
    return createContainer({
        components: [
            createSection(brBuilder(`${icon.other_terminal}  Comando Executado`, `${icon.clock} ${time(new Date(), TimestampStyles.LongDateShortTime)}`, `${icon.apps_discord} ${interaction.channel}`, `${icon.user} ${interaction.user}`), {
                media: {
                    url: interaction.user.displayAvatarURL()
                },
                description: `Foto de perfil de ${interaction.user.username}`
            }),
            createSeparator(true, true),
            createTextDisplay(brBuilder(`/${interaction.commandName}`, optionsFormatted))
        ]
    });
}
