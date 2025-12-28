import { ApplicationCommandOptionType, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import { db } from "../../../../../database/firestore.js";
import { icon } from "../../../../../functions/utils/emojis.js";
import { registroConsultarContainer } from "../../../../containers/commands/slash/private/registro/registro.consultar.js";

export default {
    options: [
        {
            name: "rg",
            description: "Informe o seu Registro Geral.",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        }
    ],

    async run(interaction: ChatInputCommandInteraction<"cached">) {
        const rg = interaction.options.getString("rg")!;

        const docRef = db.collection("militares").doc(rg);
        const doc = await docRef.get();

        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Não há registros para este registro geral.`
            })
            return;
        }

        const data = doc.data();

        if (!data) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Os dados do documento estão vazios.`
            })
            return;
        }

        if (interaction.member.id !== data.memberId) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Você não pode consultar registros de outros militares.`
            })
        }

        const militar = await interaction.guild.members.fetch(data.memberId);

        await interaction.reply({
            flags: ["Ephemeral", "IsComponentsV2"],
            components: [registroConsultarContainer(militar, data.nome, data.patente, data.rg, data.opm, data.status, data.bopm, data.talao)]
        })
    },

    async autocomplete(interaction: AutocompleteInteraction<"cached">) {
        const focused = interaction.options.getFocused(true);

        if (focused.name === "rg") {
            try {
                const querySnapshot = await db.collection("militares").where("memberId", "==", interaction.user.id).get();

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
        };
    }
};
