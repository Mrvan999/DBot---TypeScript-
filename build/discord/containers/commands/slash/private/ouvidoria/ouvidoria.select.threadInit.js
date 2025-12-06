import { brBuilder, createContainer, createSection } from "@magicyan/discord";
export function ouvidoriaSelectThreadInitContainer(member, ouvidoriaEmoji, interactionGuild, thread) {
    return createContainer({
        components: [
            createSection(brBuilder(`## ${ouvidoriaEmoji} Atendimento ao Militar`, `-# Usuário Solicitante: ${member.user}`, `-# ID do Usuário: ${member.id}`, `-# [Atendimento Iniciado](https://discord.com/channels/${interactionGuild.id}/${thread.id})`), {
                media: {
                    url: member.displayAvatarURL()
                },
                description: `Perfil de ${member.user.username}`
            })
        ]
    });
}
