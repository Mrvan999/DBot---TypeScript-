import { brBuilder, createContainer, createSection, createTextDisplay, Separator } from "@magicyan/discord";
import { icon } from "../../../functions/utils/emojis.js";
export function approveSuggestionContainer(messageContent, responsavelSuggestion, responsavelApprove, motivo, upcount, downcount, suggestionNumber) {
    return createContainer({
        components: [
            createSection(brBuilder(`## ${icon.clipboard_check}  Sugestão Nº${suggestionNumber} - Aprovada`, `-# Sugestão de ${responsavelSuggestion.user}`, `-# Aprovada por ${responsavelApprove.user}`, `-# Motivo: ${motivo}`, `-# ${upcount} - ${icon.action_check}`, `-# ${downcount} - ${icon.action_x}`), {
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
