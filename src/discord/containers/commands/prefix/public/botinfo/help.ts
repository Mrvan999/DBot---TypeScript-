import { brBuilder, createContainer, createTextDisplay } from "@magicyan/discord";

export function botinfoCommandHelpContainer() {
    return createContainer({
        components: [
            createTextDisplay(
                brBuilder(
                    `### Comando \`${dbcommands.prefixo.prefixo}${dbcommands.botinfo.nome}\``,
                    `${dbcommands.botinfo.descricao}`,
                    "",
                    `* Uso: \`${dbcommands.botinfo.uso}\``,
                    `* Argumentos: ${Array.isArray(dbcommands.botinfo.args)
                        ? dbcommands.botinfo.args.map(s => `\`${s}\``).join(", ")
                        : `\`${dbcommands.botinfo.args}\``
                    }`,
                    `* Sinônimos: ${Array.isArray(dbcommands.botinfo.sinonimo)
                        ? dbcommands.botinfo.sinonimo.map(s => `\`${s}\``).join(", ")
                        : `\`${dbcommands.botinfo.sinonimo}\``
                    }`
                )
            )
        ]
    });
}
