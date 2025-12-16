import { brBuilder, createContainer, createTextDisplay, Separator } from "@magicyan/discord";
import { GuildMember } from "discord.js";
import { icon } from "../../../../../../functions/utils/emojis.js";

export function avaliarMilitarContainer(militarMember: GuildMember, estrelas: string, avaliacao: string) {
    return createContainer({
        components: [
            createTextDisplay(
                brBuilder(
                    `## ${icon.pmesp} Avaliação de Militar`,
                    `${icon.user} ${militarMember.user}`,
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
