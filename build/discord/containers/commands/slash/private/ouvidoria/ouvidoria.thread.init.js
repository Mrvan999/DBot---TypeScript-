import { brBuilder, createContainer, createSection, Separator } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";
import { icon } from "../../../../../../functions/utils/emojis.js";
export function ouvidoriaThreadInitContainer(member, ouvidoriaEmoji, ouvidoriaRoleId, ouvidoriaResponsavelNumber) {
    return createContainer({
        components: [
            createSection(brBuilder(`## ${ouvidoriaEmoji} Atendimento ao Militar`, `-# Usuário Solicitante: ${member.user}`, `-# ID do Usuário: ${member.id}`, `-# <@&${ouvidoriaRoleId}>`), {
                media: {
                    url: member.displayAvatarURL()
                },
                description: `Perfil de ${member.user.username}`
            }),
            Separator.Large,
            createSection(brBuilder(`### ${icon.action_x} Finalizar Atendimento`, "-# Finalize o atendimento atual!"), new ButtonBuilder({
                customId: `/ouvidoria/${ouvidoriaResponsavelNumber}/thread/lock`,
                emoji: icon.lock,
                label: "Finalizar",
                style: ButtonStyle.Danger,
            })),
            Separator.Hidden,
            createSection(brBuilder(`### ${icon.user_add} Adicionar Membros`, "-# Adicione membros a este atendimento!"), new ButtonBuilder({
                customId: `/ouvidoria/${ouvidoriaResponsavelNumber}/thread/memberadd`,
                emoji: icon.user_add,
                label: "Adicionar",
                style: ButtonStyle.Success,
            }))
        ]
    });
}
