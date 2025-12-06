import { brBuilder, createContainer, createTextDisplay, Separator } from "@magicyan/discord";
import { icon } from "../../../../../functions/utils/emojis.js";
export function cautelaCloseContainer(member, data, timestamp) {
    return createContainer({
        components: [
            createTextDisplay(brBuilder(`## ${icon.pmesp} Cautelamento de Viatura`, `${icon.user} ${member.user} (${member.id})`)),
            Separator.Large,
            createTextDisplay(brBuilder(`**Militares:** ${data.militares}`, `**OPM:** ${data.opm}`, `**Modelo da viatura:** ${data.modelo}`, `**Prefixo:** [${data.prefixo}](https://discord.com/channels/1407933677312151602/${data.call})`, `**Motivo:** ${data.motivo}`, `**Data/Hora:** ${data.timestamp}`)),
            Separator.Default,
            createTextDisplay(brBuilder(`${icon.ctg1} Devolução`, `> **Data/Hora:** ${timestamp}`, "> **Status:** *Serviço Finalizado*"))
        ]
    });
}
