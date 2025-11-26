import { brBuilder, createContainer, createSection, createTextDisplay, Separator } from "@magicyan/discord";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, GuildMember } from "discord.js";
import { icon } from "../../../../../functions/utils/emojis.js";

export function cautelaCreateContainer(member: GuildMember, militares: string, opm: string, modelo: string, prefixo: string, call: string, motivo: string, timestamp: string) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.pmesp} Cautelamento de Viatura`,
                    `${icon.user} ${member.user} (${member.id})`
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
                    `**Militares:** ${militares}`,
                    `**OPM:** ${opm}`,
                    `**Modelo da viatura:** ${modelo}`,
                    `**Prefixo:** [${prefixo}](https://discord.com/channels/1407933677312151602/${call})`,
                    `**Motivo:** ${motivo}`,
                    `**Data/Hora:** ${timestamp}`,
                )
            ),
            Separator.LargeHidden,
            new ActionRowBuilder({
                components: [
                    new ButtonBuilder({
                        customId: `cautela/close/${member.id}`,
                        emoji: icon.action_check,
                        label: "Fechar Cautelamento",
                        style: ButtonStyle.Success,
                    })
                ]
            })
        ]
    });
}
