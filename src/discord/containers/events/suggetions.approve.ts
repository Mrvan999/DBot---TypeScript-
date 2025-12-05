import { brBuilder, createContainer, createSection, createTextDisplay, Separator } from "@magicyan/discord";
import { GuildMember } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function approveSuggestionContainer(messageContent: string, responsavelSuggestion: GuildMember, responsavelApprove: GuildMember, motivo: string, upcount: string, downcount: string, suggestionNumber: string) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.clipboard_check}  Sugestão Nº${suggestionNumber} - Aprovada`,
                    `-# Sugestão de ${responsavelSuggestion.user}`,
                    `-# Aprovada por ${responsavelApprove.user}`,
                    `-# Motivo: ${motivo}`,
                    `-# ${upcount} - ${icon.action_check}`,
                    `-# ${downcount} - ${icon.action_x}`,
                ),
                {
                    media: {
                        url: responsavelSuggestion.displayAvatarURL()
                    },
                    description: `Foto de perfil de ${responsavelSuggestion.user.username}`
                }
            ),
            Separator.Large,
            createTextDisplay(
                messageContent
            )
        ]
    });
}