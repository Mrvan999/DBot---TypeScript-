import { createResponder, ResponderType } from "#base";
import { registroSendModal } from "../../modals/registro.send.js";
createResponder({
    customId: "registro/modal/send",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction) {
        await interaction.showModal(await registroSendModal());
    },
});
