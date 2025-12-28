import { brBuilder, createContainer, createTextDisplay } from "@magicyan/discord";

export function tagCommandHelpContainer() {
    return createContainer({
        components: [
            createTextDisplay(
                brBuilder(
                    `### Comando \`${dbcommands.prefixo.prefixo}${dbcommands.tag.nome}\``,
                    `${dbcommands.tag.descricao}`,
                    "",
                    `* Uso: \`${dbcommands.tag.uso}\``,
                    `* Argumentos: ${Array.isArray(dbcommands.tag.args)
                        ? dbcommands.tag.args.map(s => `\`${s}\``).join(", ")
                        : `\`${dbcommands.tag.args}\``
                    }`,
                    `* Sinônimos: ${Array.isArray(dbcommands.tag.sinonimo)
                        ? dbcommands.tag.sinonimo.map(s => `\`${s}\``).join(", ")
                        : `\`${dbcommands.tag.sinonimo}\``
                    }`
                )
            )
        ]
    });
}
