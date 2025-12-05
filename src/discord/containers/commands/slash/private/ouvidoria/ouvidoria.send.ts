import { brBuilder, createContainer, createMediaGallery, createTextDisplay, Separator } from "@magicyan/discord";
import { ComponentType, StringSelectMenuBuilder } from "discord.js";
import { icon } from "../../../../../../functions/utils/emojis.js";

const filenames = ["BannerPMESP_Painel_Ouvidoria"];

export function ouvidoriaSendContainer() {

    return createContainer({
        components: [
            createMediaGallery(
                filenames.map(name => ({
                    media: {
                        url: `attachment://${name}.png`
                    }
                }))
            ),
            Separator.Large,
            createTextDisplay(
                brBuilder(
                    "# :telephone: | Ouvidoria Interna PMESP",
                    "Bem-vindo à Ouvidoria Interna da Polícia Militar! Este é o canal onde militares da corporação podem fazer denúncias, reclamações, sugestões e elogios sobre a atuação policial, setores da corporação e membros da PMESP.",
                    "",
                    "### - **:mag_right: Ouvidoria - Corregedoria**",
                    "> A *Ouvidoria da CORREG PM* é atendida por militares da *Corregedoria da Polícia Militar*, recebendo e analisando denúncias para apuração sobre condutas e procedimentos que não estejam de acordo com os regulamentos da corporação. Deve ser utilizada para abertura de processos e recorrência a processos e sanções anteriores.",
                    "",
                    "### - **:bookmark_tabs:  Ouvidoria da Diretoria de Pessoal**",
                    "> Canal destinado a receber manifestações sobre gestão de efetivo, como movimentações, promoções, afastamentos, ingresso, frequência, atendimento ao policial e questões funcionais. As demandas são analisadas e encaminhadas às seções competentes da Diretoria de Pessoal, com sigilo e responsabilidade.",
                    "",
                    "### - **:guard: Ouvidoria do Estado Maior**",
                    "> Canal exclusivo para o trâmite de assuntos afetos ao Estado-Maior, incluindo assessoramento ao Comando, análise de cenários, propostas de normatização e coordenação de grandes operações. As solicitações são triadas e despachadas às respectivas seções para as devidas providências técnicas."
                )
            ),
            Separator.Large,
            createTextDisplay(
                brBuilder(
                    "### 🔐 Sigilo e Confidencialidade",
                    "Todos os tickets são tratados com o máximo de sigilo, e as informações só serão acessadas pelos responsáveis, garantindo a segurança e a integridade das informações prestadas."
                )
            ),
            Separator.Large,
            new StringSelectMenuBuilder({
                customId: "/ouvidoria/select",
                max_values: 1,
                type: ComponentType.StringSelect,
                options: [
                    { label: "Ouvidoria - Diretoria de Pessoal", value: "ouvidoriadp", emoji: icon.DP },
                    { label: "Ouvidoria - Corregedoria", value: "ouvidoriacorreg", emoji: icon.correg },
                    { label: "Ouvidoria - Estado Maior", value: "ouvidoriaempm", emoji: icon.empm },
                ],
                placeholder: "Selecione Qual Atendimento Desejas Receber"
            })
        ]
    });
}