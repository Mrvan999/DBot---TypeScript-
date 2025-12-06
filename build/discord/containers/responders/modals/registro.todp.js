import { brBuilder, createContainer, createSection, createTextDisplay, Separator } from "@magicyan/discord";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, time, TimestampStyles } from "discord.js";
import { createDiscordName } from "../../../../functions/utils/createDiscordName.js";
import { icon } from "../../../../functions/utils/emojis.js";
export async function registroToDPContainer(member, guild, nome, rg, patente, opm) {
    return createContainer({
        components: [
            createSection(brBuilder(`## ${icon.dp} Registro Estatístico`, `${icon.clock} ${time(new Date(), TimestampStyles.LongDateShortTime)}`, `${icon.user} ${member.user} (${member.id})`, `${icon.arrow_right} <@&${dbroles.dp_roles.ouvidoriadpRoleId}>`), {
                media: {
                    url: member.displayAvatarURL()
                },
                description: `Foto de perfil de ${member.user.username}`
            }),
            Separator.Large,
            createTextDisplay(brBuilder(`**${icon.user} Nome**`, nome)),
            Separator.Hidden,
            createTextDisplay(brBuilder(`**${icon.clipboard} Registro Geral**`, rg)),
            Separator.Hidden,
            createTextDisplay(brBuilder(`**${icon.clipboard} Graduação/Posto**`, patente)),
            Separator.Hidden,
            createTextDisplay(brBuilder(`**${icon.other_bank} OPM**`, opm)),
            Separator.Hidden,
            createTextDisplay(brBuilder(`**${icon.user} Apelido Servidor**`, await createDiscordName(member.id, guild))),
            Separator.LargeHidden,
            new ActionRowBuilder({
                components: [
                    new ButtonBuilder({
                        customId: `registro/modal/finish/approve/${member.id}`,
                        emoji: icon.action_check,
                        label: "Aprovar Registro",
                        style: ButtonStyle.Success,
                    })
                ]
            }),
            new ActionRowBuilder({
                components: [
                    new ButtonBuilder({
                        customId: `registro/modal/finish/reprove/${member.id}`,
                        emoji: icon.action_x,
                        label: "Reprovar Registro",
                        style: ButtonStyle.Danger,
                    })
                ]
            })
        ]
    });
}
