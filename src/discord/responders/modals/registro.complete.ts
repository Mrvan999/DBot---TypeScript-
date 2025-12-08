import { createResponder, ResponderType } from "#base";
import { createRegistroDocument } from "../../../functions/utils/createRegistroDocument.js";
import { icon } from "../../../functions/utils/emojis.js";
import { registroToDPContainer } from "../../containers/responders/modals/registro.todp.js";

createResponder({
    customId: "registro/modal/pag1",
    types: [ResponderType.ModalComponent], cache: "cached",
    async run(interaction) {
        const solicitacoesdpChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.solicitacoesdpChannelId);
        if (!solicitacoesdpChannel?.isTextBased()) return;

        const fields = interaction.fields;

        const name = fields.getTextInputValue("nome");
        const rg = fields.getTextInputValue("rg");
        const [patente] = fields.getStringSelectValues("patente");
        const [opm] = fields.getStringSelectValues("opm");

        
        await solicitacoesdpChannel.send({
            flags: ["IsComponentsV2"],
            components: [await registroToDPContainer(interaction.member, interaction.guild, name, rg, patente, opm)]
        })
        
        await createRegistroDocument(interaction.member.id, name, rg, patente, opm)

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Registro estatístico enviado a Diretoria de Pessoal.`
        })
    },
});