import { brBuilder, createContainer, createSection, createTextDisplay, Separator } from "@magicyan/discord";
import { ChatInputCommandInteraction, time, TimestampStyles } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";

export function commandSlashLogContainer(interaction: ChatInputCommandInteraction) {
    const options = interaction.options.data;

    const optionsFormatted =
        options.length > 0
            ? options
                .flatMap(opt => {
                    if (opt.options && opt.options.length > 0) {
                        return opt.options.map(subOpt => {
                            const value =
                                subOpt.value !== undefined
                                    ? String(subOpt.value)
                                    : "*sem valor*";

                            return `- **${subOpt.name}**: ${value}`;
                        });
                    }
                    
                    const value =
                        opt.value !== undefined
                            ? String(opt.value)
                            : "*sem valor*";

                    return `- **${opt.name}**: ${value}`;
                })
                .join("\n")
            : "*Sem parâmetros*";

    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `${icon.other_terminal} Comando Executado`,
                    `-# ${icon.clock} ${time(new Date(), TimestampStyles.LongDateShortTime)}`,
                    `-# ${icon.apps_discord} ${interaction.channel}`,
                    `-# ${icon.user} ${interaction.user}`
                ),
                {
                    media: {
                        url: interaction.user.displayAvatarURL()
                    },
                    description: `Foto de perfil de ${interaction.user.username}`
                }
            ),
            Separator.Large,
            createTextDisplay(
                brBuilder(
                    `**/${interaction.commandName}**`,
                    optionsFormatted
                )
            )
        ]
    });
}
