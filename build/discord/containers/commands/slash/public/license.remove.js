import { brBuilder, createContainer, createSection, createTextDisplay, Separator } from "@magicyan/discord";
import { time, TimestampStyles } from "discord.js";
import { icon } from "../../../../../functions/utils/emojis.js";
export async function licenseRemoveContainer(member) {
    return createContainer({
        components: [
            createSection(brBuilder(`## ${icon.clock_remove}  Licença Encerrada`, `${icon.clock} ${time(new Date(), TimestampStyles.LongDateShortTime)}`, `${icon.user} ${member.user} (${member.id})`, `${icon.arrow_right} <@&${dbroles.dp_roles.ouvidoriadpRoleId}>`), {
                media: {
                    url: member.displayAvatarURL()
                },
                description: `Foto de perfil de ${member.user.username}`
            }),
            Separator.Large,
            createTextDisplay(brBuilder(`**${icon.clipboard} Status**`, "Licença encerrada pelo próprio militar."))
        ]
    });
}
