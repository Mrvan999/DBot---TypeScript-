import { ApplicationCommandOptionType, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import { db } from "../../../../../database/firestore.js";
import { icon } from "../../../../../functions/utils/emojis.js";
import { registroConsultarContainer } from "../../../../containers/commands/slash/private/registro/registro.consultar.js";

export default {
    options: [
        {
            name: "rg",
            description: "Informe o Registro Geral do Militar.",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name: "nome",
            description: "Informe o Nome do Militar.",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "patente",
            description: "Informe a Patente do Militar.",
            type: ApplicationCommandOptionType.String,
            required: false,
            autocomplete: true
        },
        {
            name: "opm",
            description: "Informe a OPM do Militar.",
            type: ApplicationCommandOptionType.String,
            required: false,
            autocomplete: true
        },
        {
            name: "status",
            description: "Informe o Status do Militar.",
            type: ApplicationCommandOptionType.String,
            required: false,
            autocomplete: true
        },
        {
            name: "bopm",
            description: "Informe a quantia de BOPMs que o militar possui.",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "talao",
            description: "Informe a quantia de apreensões que o militar possui.",
            type: ApplicationCommandOptionType.String,
            required: false
        },
    ],

    async run(interaction: ChatInputCommandInteraction<"cached">) {
        const rg = interaction.options.getString("rg")!;
        const nome = interaction.options.getString("nome") ?? "Não Selecionado";
        const patente = interaction.options.getString("patente") ?? "Não Selecionado";
        const opm = interaction.options.getString("opm") ?? "Não Selecionado";
        const status = interaction.options.getString("status") ?? "Não Selecionado";
        const bopm = interaction.options.getString("bopm") ?? "Não Selecionado";
        const talao = interaction.options.getString("talao") ?? "Não Selecionado";

        const docRef = db.collection("militares").doc(rg);
        let doc = await docRef.get();

        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Não há registros para este registro geral.`
            })
            return;
        };

        if (nome !== "Não Selecionado") {
            await docRef.update({
                nome: nome
            });
        };

        if (patente !== "Não Selecionado") {
            await docRef.update({
                patente: patente
            });
        };

        if (opm !== "Não Selecionado") {
            await docRef.update({
                opm: opm
            })
        };

        if (status !== "Não Selecionado") {
            await docRef.update({
                status: status
            })
        };

        if (bopm !== "Não Selecionado") {
            await docRef.update({
                bopm: bopm
            })
        };

        if (talao !== "Não Selecionado") {
            await docRef.update({
                talao: talao
            })
        };

        if (nome === "Não Selecionado" && patente === "Não Selecionado" && opm === "Não Selecionado" && status === "Não Selecionado" && bopm === "Não Selecionado" && talao === "Não Selecionado") {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_remove} Nada foi selecionado, o militar não foi atualizado.`
            });
            return;
        }

        doc = await docRef.get();

        const data = doc.data();

        if (!data) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Os dados do documento estão vazios.`
            })
            return;
        }

        const militar = await interaction.guild.members.fetch(data.memberId);

        await interaction.reply({
            flags: ["Ephemeral", "IsComponentsV2"],
            components: [registroConsultarContainer(militar, data.nome, data.patente, data.rg, data.opm, data.status, data.bopm, data.talao)]
        })
    },

    async autocomplete(interaction: AutocompleteInteraction<"cached">) {
        const focused = interaction.options.getFocused(true);

        if (focused.name === "patente") {
            const todasSugestoes = [
                "Coronel PM",
                "Tenente-Coronel PM",
                "Major PM",
                "Capitão PM",
                "1º Tenente PM",
                "2º Tenente PM",
                "Aspirante a Oficial PM",
                "Aluno Oficial PM 4º Ano",
                "Aluno Oficial PM 3º Ano",
                "Aluno Oficial PM 2º Ano",
                "Aluno Oficial PM 1º Ano",
                "Subtenente PM",
                "1º Sargento PM",
                "2º Sargento PM",
                "3º Sargento PM",
                "Aluno Sargento PM",
                "Cabo PM",
                "Soldado 1º Classe PM",
                "Soldado 2º Classe PM"
            ];

            const filtradas = todasSugestoes
                .filter(s => s.toLowerCase().includes(focused.value.toLowerCase()))
                .slice(0, 25);

            return interaction.respond(
                filtradas.map(s => ({ name: s, value: s }))
            );
        } else if (focused.name === "opm") {
            const todasSugestoes = [
                "Gabinete do Comando Geral",
                "Estado-Maior da Polícia Militar",
                "Corregedoria da Polícia Militar",
                "Centro de Inteligência da Polícia Militar",
                "Diretoria de Educação e Cultura",
                "Diretoria de Pessoal",
                "Diretoria de Logística",
                "Diretoria de Saúde",
                "Academia de Polícia Militar do Barro Branco",
                "Escola Superior de Sargentos",
                "Escola Superior de Soldados",
                "22º BPM/M",
                "22º BPM/M - 1ª CIA",
                "4º BPChq",
                "4º BPChq - 4ª CIA",
                "4º BPChq - 6ª CIA"
            ];

            const filtradas = todasSugestoes
                .filter(s => s.toLowerCase().includes(focused.value.toLowerCase()))
                .slice(0, 25);

            return interaction.respond(
                filtradas.map(s => ({ name: s, value: s }))
            );
        } else if (focused.name === "status") {
            const todasSugestoes = [
                "Desligado",
                "Detido",
                "Reserva Remunerada",
                "Reserva Não Remunerada",
                "Licença",
                "Normalidade"
            ];

            const filtradas = todasSugestoes
                .filter(s => s.toLowerCase().includes(focused.value.toLowerCase()))
                .slice(0, 25);

            return interaction.respond(
                filtradas.map(s => ({ name: s, value: s }))
            );
        } else if (focused.name === "rg") {
            try {
                const querySnapshot = await db.collection("militares").get();

                const sugestões = querySnapshot.docs
                    .map(doc => {
                        const data = doc.data();
                        return {
                            name: `${data.nome} (${doc.id}) - ${data.patente}`,
                            value: doc.id
                        };
                    })
                    .filter(sug => sug.name.toLowerCase().includes(focused.value.toLowerCase()))
                    .slice(0, 25);

                await interaction.respond(sugestões);
            } catch (err) {
                console.error("Erro no autocomplete:", err);
                await interaction.respond([]);
            }
        }
    }
};
