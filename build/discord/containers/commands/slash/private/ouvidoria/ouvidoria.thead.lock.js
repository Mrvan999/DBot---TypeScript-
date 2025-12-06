import { brBuilder, createContainer, createSection, Separator } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";
import { icon } from "../../../../../../functions/utils/emojis.js";
export function ouvidoriaThreadLockContainer(solicitante, interactionUser, ouvidoriaEmoji, ouvidoriaResponsavelNumber) {
    return createContainer({
        components: [
            createSection(brBuilder(`## ${ouvidoriaEmoji} Atendimento ao Militar`, `-# Usuário Solicitante: ${solicitante.user}`, `-# ID do Usuário: ${solicitante.user.id}`, `-# Atendimento Finalizado: ${interactionUser}`), {
                media: {
                    url: solicitante.user.displayAvatarURL()
                },
                description: `Perfil de ${solicitante.user.username}`
            }),
            Separator.Large,
            createSection(brBuilder(`### ${icon.clipboard_x}  Arquivar Atendimento`, "-# Arquivar este atendimento!"), new ButtonBuilder({
                customId: `/ouvidoria/${ouvidoriaResponsavelNumber}/thread/arquive`,
                emoji: icon.clipboard_x,
                label: "Arquivar",
                style: ButtonStyle.Danger,
            }))
        ]
    });
}
