import { brBuilder, createContainer, createMediaGallery, createTextDisplay, Separator } from "@magicyan/discord";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { icon } from "../../../../../functions/utils/emojis.js";

export function registroSendContainer() {
    return createContainer({
        components: [
            createMediaGallery({
                media: {
                    url: `attachment://BannerPMESP_Registro_Estatistico.png`
                }
            }),
            Separator.Large,
            createTextDisplay(
                brBuilder(
                    "Para realizar seu registro estatístico, clique no botão abaixo. Um formulário será exibido; preencha-o e você será registrado na Diretoria de Pessoal."
                )
            ),
            Separator.LargeHidden,
            new ActionRowBuilder({
                components: [
                    new ButtonBuilder({
                        customId: `registro/modal/send`,
                        emoji: icon.action_check,
                        label: "Realizar Registro Estatístico",
                        style: ButtonStyle.Success,
                    })
                ]
            })
        ]
    });
}
