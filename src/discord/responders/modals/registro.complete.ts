import { createResponder, ResponderType } from "#base";
import { icon } from "../../../functions/utils/emojis.js";

createResponder({
    customId: "registro/modal/pag1",
    types: [ResponderType.Modal], cache: "cached",
    async run(interaction) {
        const fields = interaction.fields;

        const name = fields.getTextInputValue("registro/modal/pag1/nome");
        const rg = fields.getTextInputValue("registro/modal/pag1/rg");
        const opm = fields.getTextInputValue("registro/modal/pag1/opm");

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Registro estatístico enviado a Diretoria de Pessoal.`
        })

        console.log(`${name}, ${rg}, ${opm}`)
    },
});