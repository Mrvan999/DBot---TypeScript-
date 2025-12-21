import { brBuilder, createContainer, createTextDisplay, Separator } from "@magicyan/discord";
import { GuildMember } from "discord.js";
import { icon } from "../../../../../../functions/utils/emojis.js";

export function botinfoSendContainer(versao: string, clientMember: GuildMember, statusEmoji: string, status: string, liderTecnico: string, desenvolvedorPrincipal: string, auxiliares: string) {
    return createContainer({
        components: [
            createTextDisplay(
                brBuilder(
                    `# ${icon.dtic} Diretoria de Tecnologia da Informação e Comunicação`,
                    "-# Sistema Integrado da Polícia Militar"
                )
            ),
            Separator.Large,
            createTextDisplay(
                brBuilder(
                    `## ${icon.ctg1} ${icon.clipboard} Ficha Técnica`,
                    `> **Versão:** ${versao}`,
                    `> **Usuário:** ${clientMember.user}`,
                    `> **Status:** ${statusEmoji} ${status}`
                )
            ),
            Separator.Default,
            createTextDisplay(
                brBuilder(
                    `## ${icon.ctg1} ${icon.user_users} Equipe`,
                    `> **Lider Técnico:** ${liderTecnico}`,
                    `> **Desenvolvedor Principal:** ${desenvolvedorPrincipal}`,
                    `> **Auxiliares:** ${auxiliares}`
                )
            ),
            Separator.Default,
            createTextDisplay(
                brBuilder(
                    `## ${icon.ctg1} ${icon.other_bot} Funcionalidades`,
                    ">>> ### Comandos de Uso Livre",
                    "**/abrir cautela**",
                    "* Comando utilizado para abrir uma cautela em https://discord.com/channels/952718760182161478/1144669252729720992.",
                    "",
                    "**/registrar bopm**",
                    "* Comando utilizado para realizar o registro de um boletim de ocorrência interno em https://discord.com/channels/952718760182161478/952964364233748540.",
                    "",
                    "**/meuregistro consultar**",
                    "* Comando utilizado para verificar suas informações registradas no Banco de Dados da Diretoria de Pessoal da Polícia Militar.",
                    "",
                    "**/registrar apreensão**",
                    "* Comando utilizado para realizar o registro de um talão de apreensão em https://discord.com/channels/952718760182161478/1144683816544370688.",
                    "",
                    "**/gerenciar licença**",
                    "* Comando utilizado para solicitar uma licença para a Diretoria de Pessoal ou encerrar uma licença já ativa.",
                    "",
                    "**/solicitar fardamento**",
                    "* Comando utilizado para solicitar um fardamento customizado para a Diretoria de Logística.",
                    "",
                    "**/avaliar militar**",
                    "* Comando utilizado para enviar uma avaliação sobre um militar visível somente para o Estado-Maior.",
                    "",
                    "**/avaliar opm**",
                    "* Comando utilizado para enviar uma avaliação sobre uma OPM visível somente para o Estado-Maior."
                )
            ),
        ]
    });
}
