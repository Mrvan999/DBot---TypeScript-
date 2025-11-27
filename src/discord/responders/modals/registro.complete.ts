import { createResponder, ResponderType } from "#base";
import { icon } from "../../../functions/utils/emojis.js";
import { registroToDPContainer } from "../../containers/responders/modals/registro.todp.js";

createResponder({
    customId: "registro/modal/pag1",
    types: [ResponderType.ModalComponent], cache: "cached",
    async run(interaction) {
        const solicitacoesdpChannel = await interaction.guild.channels.fetch(constants.channels.solicitacoesdpChannelId);
        if (!solicitacoesdpChannel?.isTextBased()) return;

        const fields = interaction.fields;

        const name = fields.getTextInputValue("nome");
        const rg = fields.getTextInputValue("rg");
        const [opm] = fields.getStringSelectValues("opm");

        await solicitacoesdpChannel.send({
            flags: ["IsComponentsV2"],
            components: [registroToDPContainer(interaction.member, name, rg, opm)]
        })

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Registro estatístico enviado a Diretoria de Pessoal.`
        })
    },
});