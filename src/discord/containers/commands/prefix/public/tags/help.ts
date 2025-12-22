import { brBuilder, createContainer, createTextDisplay } from "@magicyan/discord";

export function tagsCommandHelpContainer() {
    return createContainer({
        components: [
            createTextDisplay(
                brBuilder(
                    `### Comando \`${dbcommands.prefixo.prefixo}${dbcommands.tags.nome}\``,
                    `${dbcommands.tags.descricao}`,
                    "",
                    `* Uso: \`${dbcommands.tags.uso}\``,
                    `* Argumentos: ${Array.isArray(dbcommands.tags.args)
                        ? dbcommands.tags.args.map(s => `\`${s}\``).join(", ")
                        : `\`${dbcommands.tags.args}\``
                    }`,
                    `* Sinônimos: ${Array.isArray(dbcommands.tags.sinonimo)
                        ? dbcommands.tags.sinonimo.map(s => `\`${s}\``).join(", ")
                        : `\`${dbcommands.tags.sinonimo}\``
                    }`
                )
            )
        ]
    });
}
