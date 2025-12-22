import { brBuilder, createContainer, createTextDisplay } from "@magicyan/discord";

export function helpCommandContainer(commandsList: string) {
    return createContainer({
        components: [
            createTextDisplay(
                brBuilder(
                    "### Lista de comandos em texto",
                    commandsList,
                    "",
                    `Use \`${dbcommands.prefixo.prefixo}<comando> help\` para ver mais informações sobre um comando em específico.`,
                    "",
                    "Você pode ver todos os **Slash Commands** (Comandos em Barra).", 
                    "Apenas digite \`/\` na caixa de texto ou acesse <#1447738004272713900>"
                )
            )
        ]
    });
}
