import { brBuilder, createContainer, createSection, createTextDisplay, Separator } from "@magicyan/discord";
import { icon } from "../../../functions/utils/emojis.js";

export function createSuggestionContainer(message: any, suggestionNumber: string) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.clipboard_remove}  Sugestão Nº${suggestionNumber} - Revisão`,
                    `-# Sugestão de ${message.author}`
                ),
                {
                    media: {
                        url: message.author.displayAvatarURL()
                    },
                    description: `Foto de perfil de ${message.author.username}`
                }
            ),
            Separator.Large,
            createTextDisplay(
                message.content
            )
        ]
    });
}