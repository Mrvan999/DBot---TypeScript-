import { brBuilder, createContainer, createSection, Separator } from "@magicyan/discord";
import { ComponentType, UserSelectMenuBuilder } from "discord.js";
export function ouvidoriaThreadMemberAdd(member, ouvidoriaEmoji, ouvidoriaResponsavelNumber) {
    return createContainer({
        components: [
            createSection(brBuilder(`## ${ouvidoriaEmoji} Atendimento ao Militar`, `-# Usuário Solicitante: ${member.user}`, `-# ID do Usuário: ${member.user.id}`), {
                media: {
                    url: member.user.displayAvatarURL()
                },
                description: `Perfil de ${member.user.username}`
            }),
            Separator.Large,
            new UserSelectMenuBuilder({
                customId: `/ouvidoria/${ouvidoriaResponsavelNumber}/memberadd/select`,
                max_values: 1,
                type: ComponentType.UserSelect,
                placeholder: "Selecione O Membro Que Desejas Adicionar Ao Atendimento"
            })
        ]
    });
}
