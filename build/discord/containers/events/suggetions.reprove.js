import { brBuilder, createContainer, createSection, createTextDisplay, Separator } from "@magicyan/discord";
import { icon } from "../../../functions/utils/emojis.js";
export function reproveSuggestionContainer(messageContent, responsavelSuggestion, responsavelApprove, motivo, upcount, downcount, suggestionNumber) {
    return createContainer({
        components: [
            createSection(brBuilder(`## ${icon.clipboard_x}  Sugestão Nº${suggestionNumber} - Reprovada`, `-# Sugestão de ${responsavelSuggestion.user}`, `-# Reprovada por ${responsavelApprove.user}`, `-# Motivo: ${motivo}`, `-# ${upcount} - ${icon.action_check}`, `-# ${downcount} - ${icon.action_x}`), {
                media: {
                    url: responsavelSuggestion.displayAvatarURL()
                },
                description: `Foto de perfil de ${responsavelSuggestion.user.username}`
            }),
            Separator.Large,
            createTextDisplay(messageContent)
        ]
    });
}
