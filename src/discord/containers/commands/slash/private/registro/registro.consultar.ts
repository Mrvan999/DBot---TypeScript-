import { brBuilder, createContainer, createSection } from "@magicyan/discord";
import { GuildMember } from "discord.js";
import { icon } from "../../../../../../functions/utils/emojis.js";

export function registroConsultarContainer(member: GuildMember, nome: string, patente: string, rg: string, opm: string, status: string, bopmcount: string, apreensoescount: string) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.user} ${nome}`,
                    `-# Patente: ${patente}`,
                    `-# Status: ${status}`,
                    `-# RG: ${rg}`,
                    `-# OPM: ${opm}`,
                    `-# BOPMs: ${bopmcount}`,
                    `-# Apreensões: ${apreensoescount}`
                ),
                {
                    media: {
                        url: member.displayAvatarURL()
                    },
                    description: `Perfil de ${member.user.username}`
                }
            )
        ]
    })
}

