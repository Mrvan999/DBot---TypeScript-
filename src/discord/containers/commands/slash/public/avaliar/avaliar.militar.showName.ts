import { brBuilder, createContainer, createTextDisplay, Separator } from "@magicyan/discord";
import { GuildMember } from "discord.js";
import { icon } from "../../../../../../functions/utils/emojis.js";

export function avaliarMilitarShowNameContainer(militar: string, member: GuildMember, estrelas: string, avaliacao: string) {
    return createContainer({
        components: [
            createTextDisplay(
                brBuilder(
                    `## ${icon.pmesp} Avaliação de Militar`,
                    `${icon.user} ${militar}`,
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
