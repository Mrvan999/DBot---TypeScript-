import { brBuilder, createContainer, createSection, createTextDisplay, Separator } from "@magicyan/discord";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, GuildMember, time, TimestampStyles } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";

export function registroToDPContainer(member: GuildMember, nome: string, rg: string, opm: string) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.dp} Registro Estatístico`,
                    `${icon.clock} ${time(new Date(), TimestampStyles.LongDateShortTime)}`,
                    `${icon.user} ${member.user} (${member.id})`,
                    `${icon.arrow_right} <@&${dbroles.dp_roles.ouvidoriadpRoleId}>`
                ),
                {
                    media: {
                        url: member.displayAvatarURL()
                    },
                    description: `Foto de perfil de ${member.user.username}`
                }
            ),
            Separator.Large,
            createTextDisplay(
                brBuilder(
                    `**${icon.user} Nome**`,
                    nome,
                )
            ),
            Separator.Hidden,
            createTextDisplay(
                brBuilder(
                    `**${icon.clipboard} Registro Geral**`,
                    rg,
                )
            ),
            Separator.Hidden,
            createTextDisplay(
                brBuilder(
                    `**${icon.other_bank} OPM**`,
                    opm,
                )
            ),
            Separator.LargeHidden,
            new ActionRowBuilder({
                components: [
                    new ButtonBuilder({
                        customId: `registro/modal/finish/approve`,
                        emoji: icon.action_check,
                        label: "Aprovar Registro Estatístico",
                        style: ButtonStyle.Success,
                    })
                ]
            }),
            new ActionRowBuilder({
                components: [
                    new ButtonBuilder({
                        customId: `registro/modal/finish/reprove`,
                        emoji: icon.action_x,
                        label: "Reprovar Registro Estatístico",
                        style: ButtonStyle.Danger,
                    })
                ]
            })
        ]
    });
}
