import { brBuilder, createContainer, createSection, createTextDisplay, Separator } from "@magicyan/discord";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, time, TimestampStyles } from "discord.js";
import { icon } from "../../../../../functions/utils/emojis.js";
export async function licenseRequestContainer(member, motivo, tempo, observacoes) {
    return createContainer({
        components: [
            createSection(brBuilder(`## ${icon.clock_add}  Solicitação de Licença`, `${icon.clock} ${time(new Date(), TimestampStyles.LongDateShortTime)}`, `${icon.user} ${member.user} (${member.id})`, `${icon.arrow_right} <@&${dbroles.dp_roles.ouvidoriadpRoleId}>`), {
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
            Separator.Large,
            new ActionRowBuilder({
                components: [
                    new ButtonBuilder({
                        customId: `license/approve/${member.id}`,
                        emoji: icon.action_check,
                        label: "Aprovar Licença",
                        style: ButtonStyle.Success,
                    }),
                    new ButtonBuilder({
                        customId: `license/reprove/${member.id}`,
                        emoji: icon.action_x,
                        label: "Reprovar Licença",
                        style: ButtonStyle.Danger,
                    })
                ]
            })
        ]
    });
}
