import { brBuilder, createContainer, createSection } from "@magicyan/discord";
export function ouvidoriaThreadArquivedContainer(solicitante, interactionUser, ouvidoriaEmoji) {
    return createContainer({
        components: [
            createSection(brBuilder(`## ${ouvidoriaEmoji} Atendimento ao Usuário`, `-# Usuário Solicitante: ${solicitante.user}`, `-# ID do Usuário: ${solicitante.user.id}`, `-# Atendimento Arquivado: ${interactionUser}`), {
                media: {
                    url: solicitante.user.displayAvatarURL()
                },
                description: `Perfil de ${solicitante.user.username}`
            })
        ]
    });
}
