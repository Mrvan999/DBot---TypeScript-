import { brBuilder, createContainer, createTextDisplay, Separator } from "@magicyan/discord";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { icon } from "../../../../../functions/utils/emojis.js";
export function cautelaCreateContainer(member, militares, opm, modelo, prefixo, call, motivo, timestamp) {
    return createContainer({
        components: [
            createTextDisplay(brBuilder(`## ${icon.pmesp} Cautelamento de Viatura`, `${icon.user} ${member.user} (${member.id})`)),
            Separator.Large,
            createTextDisplay(brBuilder(`**Militares:** ${militares}`, `**OPM:** ${opm}`, `**Modelo da viatura:** ${modelo}`, `**Prefixo:** [${prefixo}](https://discord.com/channels/1407933677312151602/${call})`, `**Motivo:** ${motivo}`, `**Data/Hora:** ${timestamp}`)),
            Separator.LargeHidden,
            new ActionRowBuilder({
                components: [
                    new ButtonBuilder({
                        customId: `cautela/close/${prefixo}`,
                        emoji: icon.action_remove,
                        label: "Fechar Cautelamento",
                        style: ButtonStyle.Danger,
                    })
                ]
            })
        ]
    });
}
