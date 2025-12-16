import { brBuilder, createContainer, createTextDisplay, Separator } from "@magicyan/discord";
import { GuildMember } from "discord.js";
import { icon } from "../../../../../../functions/utils/emojis.js";

export function avaliarOPMShowNameContainer(opm: string, member: GuildMember, estrelas: string, avaliacao: string) {
    return createContainer({
        components: [
            createTextDisplay(
                brBuilder(
                    `## ${icon.pmesp} Avaliação de OPM`,
                    `${icon.other_bank} ${opm}`,
                    `-# ${member.user}`,
                    `-# ${estrelas}`
                )
            ),
            Separator.Large,
            createTextDisplay(
                brBuilder(
                    avaliacao
                )
            )
        ]
    });
}
