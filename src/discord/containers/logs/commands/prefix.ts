import { brBuilder, createContainer, createSection, createSeparator, createTextDisplay } from "@magicyan/discord";
import { Message, TimestampStyles, time } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";

export function commandPrefixLogContainer(command: Message) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `${icon.other_terminal} Comando Executado`,
                    `-# ${icon.clock} ${time(new Date(), TimestampStyles.LongDateShortTime)}`,
                    `-# ${icon.apps_discord} ${command.channel}`,
                    `-# ${icon.user} ${command.author}`
                ),
                {
                    media: {
                        url: command.author.displayAvatarURL()
                    },
                    description: `Foto de perfil de ${command.author.username}`
                }
            ),
            createSeparator(true, true),
            createTextDisplay(
                brBuilder(`${command.content}`)
            )
        ]
    });
}
