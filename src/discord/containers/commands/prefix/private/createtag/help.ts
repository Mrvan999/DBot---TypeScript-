import { brBuilder, createContainer, createTextDisplay } from "@magicyan/discord";

export function createtagCommandHelpContainer() {
    return createContainer({
        components: [
            createTextDisplay(
                brBuilder(
                    `### Comando \`${dbcommands.prefixo.prefixo}${dbcommands.createtag.nome}\``,
                    `${dbcommands.createtag.descricao}`,
                    "",
                    `* Uso: \`${dbcommands.createtag.uso}\``,
                    `* Argumentos: ${Array.isArray(dbcommands.createtag.args)
                        ? dbcommands.createtag.args.map(s => `\`${s}\``).join(", ")
                        : `\`${dbcommands.createtag.args}\``
                    }`,
                    `* Sinônimos: ${Array.isArray(dbcommands.createtag.sinonimo)
                        ? dbcommands.createtag.sinonimo.map(s => `\`${s}\``).join(", ")
                        : `\`${dbcommands.createtag.sinonimo}\``
                    }`
                )
            )
        ]
    });
}
