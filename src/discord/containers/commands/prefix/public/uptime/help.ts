import { brBuilder, createContainer, createTextDisplay } from "@magicyan/discord";

export function uptimeCommandHelpContainer() {
    return createContainer({
        components: [
            createTextDisplay(
                brBuilder(
                    `### Comando \`${dbcommands.prefixo.prefixo}${dbcommands.uptime.nome}\``,
                    `${dbcommands.uptime.descricao}`,
                    "",
                    `* Uso: \`${dbcommands.uptime.uso}\``,
                    `* Argumentos: ${Array.isArray(dbcommands.uptime.args)
                        ? dbcommands.uptime.args.map(s => `\`${s}\``).join(", ")
                        : `\`${dbcommands.uptime.args}\``
                    }`,
                    `* Sinônimos: ${Array.isArray(dbcommands.uptime.sinonimo)
                        ? dbcommands.uptime.sinonimo.map(s => `\`${s}\``).join(", ")
                        : `\`${dbcommands.uptime.sinonimo}\``
                    }`
                )
            )
        ]
    });
}
