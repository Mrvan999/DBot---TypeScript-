import { brBuilder, createContainer, createSection, createTextDisplay, Separator } from "@magicyan/discord";
import { time, TimestampStyles } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";
export function registroFinishContainer(dpmember, member, nome, rg, patente, opm) {
    return createContainer({
        components: [
            createSection(brBuilder(`## ${icon.dp} Registro Estatístico`, `${icon.clock} ${time(new Date(), TimestampStyles.LongDateShortTime)}`, `${icon.user} ${member.user} (${member.id})`, `${icon.arrow_right} Aprovado por: ${dpmember}`), {
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
            createTextDisplay(brBuilder(`**${icon.other_bank} OPM**`, opm))
        ]
    });
}
