import { brBuilder, createContainer, createSection, createTextDisplay, Separator } from "@magicyan/discord";
import { time, TimestampStyles } from "discord.js";
import { icon } from "../../../../../functions/utils/emojis.js";
export async function licenseRequestApproveContainer(memberDp, member, motivo, tempo, observacoes) {
    return createContainer({
        components: [
            createSection(brBuilder(`## ${icon.clock_check} Licença Aprovada`, `${icon.clock} ${time(new Date(), TimestampStyles.LongDateShortTime)}`, `${icon.user} ${member.user} (${member.id})`, `${icon.arrow_right} <@&${dbroles.dp_roles.ouvidoriadpRoleId}>`), {
                media: {
                    url: member.displayAvatarURL()
                },
                description: `Foto de perfil de ${member.user.username}`
            }),
            Separator.Large,
            createTextDisplay(brBuilder(`**${icon.clipboard} Motivo**`, motivo)),
            Separator.Hidden,
            createTextDisplay(brBuilder(`**${icon.clock} Tempo**`, tempo)),
            Separator.Hidden,
            createTextDisplay(brBuilder(`**${icon.search} Observações**`, observacoes)),
            Separator.LargeHidden,
            createTextDisplay(brBuilder(`-# Solicitação aprovada por ${memberDp.user} | ${time(new Date(), TimestampStyles.LongDateShortTime)}`))
        ]
    });
}
