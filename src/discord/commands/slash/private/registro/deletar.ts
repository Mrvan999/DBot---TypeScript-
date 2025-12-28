import { ApplicationCommandOptionType, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import { db } from "../../../../../database/firestore.js";
import { icon } from "../../../../../functions/utils/emojis.js";

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
            name: "confirmar",
            description: 'Confirme sua inteção: "confirmar"',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    async run(interaction: ChatInputCommandInteraction<"cached">) {
        const rg = interaction.options.getString("rg")!;
        const confirmar = interaction.options.getString("confirmar")!;

        if (confirmar !== "confirmar") {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Você precisa confirmar sua inteção. Digite "confirmar" no campo.`
            });
            return;
        };

        const docRef = db.collection("militares").doc(rg);
        const doc = await docRef.get();

        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Não há registros para este registro geral.`
            })
            return;
        };

        await docRef.delete();

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Registro deletado com sucesso.`
        });
    },
    
    async autocomplete(interaction: AutocompleteInteraction<"cached">) {
        const focused = interaction.options.getFocused(true)
        
        if (focused.name === "rg") {
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
