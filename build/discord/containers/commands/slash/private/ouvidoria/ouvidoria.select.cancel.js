import { brBuilder, createContainer, createSection } from "@magicyan/discord";
export function ouvidoriaSelectCancelContainer(member, ouvidoriaEmoji) {
    return createContainer({
        components: [
            createSection(brBuilder(`## ${ouvidoriaEmoji} Atendimento ao Militar`, `-# Militar Solicitante: ${member.user}`, `-# ID do Usuário: ${member.id}`, `-# Atendimento Cancelado`), {
                media: {
                    url: member.displayAvatarURL()
                },
                description: `Perfil de ${member.user.username}`
            })
        ]
    });
}
