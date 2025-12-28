import { brBuilder, createContainer, createTextDisplay } from "@magicyan/discord";

export function createtagCommandHelpContainer() {
    return createContainer({
        components: [
            createTextDisplay(
                brBuilder(
                    `### Comando \`${dbcommands.prefixo.prefixo}${dbcommands.deletetag.nome}\``,
                    `${dbcommands.deletetag.descricao}`,
                    "",
                    `* Uso: \`${dbcommands.deletetag.uso}\``,
                    `* Argumentos: ${Array.isArray(dbcommands.deletetag.args)
                        ? dbcommands.deletetag.args.map(s => `\`${s}\``).join(", ")
                        : `\`${dbcommands.deletetag.args}\``
                    }`,
                    `* Sinônimos: ${Array.isArray(dbcommands.deletetag.sinonimo)
                        ? dbcommands.deletetag.sinonimo.map(s => `\`${s}\``).join(", ")
                        : `\`${dbcommands.deletetag.sinonimo}\``
                    }`
                )
            )
        ]
    });
}
