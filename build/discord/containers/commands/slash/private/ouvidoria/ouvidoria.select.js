import { brBuilder, createContainer, createSection, Separator } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";
import { icon } from "../../../../../../functions/utils/emojis.js";
export function ouvidoriaSelectContainer(member, ouvidoriaResponsavel, ouvidoriaEmoji, ouvidoriaResponsavelNumber) {
    return createContainer({
        components: [
            createSection(brBuilder(`## ${icon.user} Atendimento ao Militar`, `-# Militar Solicitante: ${member.user}`, `-# ID do Usuário: ${member.id}`), {
                media: {
                    url: member.displayAvatarURL()
                },
                description: `Perfil de ${member.user.username}`
            }),
            Separator.Large,
            createSection(brBuilder(`### ${ouvidoriaEmoji} Ouvidoria Responsável`, `-# ${ouvidoriaResponsavel}`), new ButtonBuilder({
                customId: `/ouvidoria/${ouvidoriaResponsavelNumber}/select/change`,
                emoji: icon.action_remove,
                label: "Alterar Ouvidoria",
                style: ButtonStyle.Secondary
            })),
            Separator.Hidden,
            createSection(brBuilder(`### ${icon.clipboard_x} Cancelar Atendimento`, `-# Cancele este atendimento, caso ache necessário.`), new ButtonBuilder({
                customId: `/ouvidoria/${ouvidoriaResponsavelNumber}/select/cancel`,
                emoji: icon.action_x,
                label: "Cancelar Atendimento",
                style: ButtonStyle.Danger
            })),
            Separator.Hidden,
            createSection(brBuilder(`### ${icon.clipboard_check} Confirmar Atendimento`, `-# Confirme este atendimento.`), new ButtonBuilder({
                customId: `/ouvidoria/${ouvidoriaResponsavelNumber}/select/confirm`,
                emoji: icon.action_check,
                label: "Confirmar Atendimento",
                style: ButtonStyle.Success
            })),
        ]
    });
}
