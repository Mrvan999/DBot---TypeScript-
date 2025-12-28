import { createResponder, ResponderType } from "#base";
import { createDiscordName } from "../../../functions/utils/createDiscordName.js";
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

        await createRegistroDocument(interaction.member.id, name, rg, patente, opm, "Normalidade", "0", "0")

        const displayName = await createDiscordName(interaction.member.id, interaction.guild)
        
        await solicitacoesdpChannel.send({
            flags: ["IsComponentsV2"],
            components: [await registroToDPContainer(interaction.member, name, rg, patente, opm, displayName)]
        })

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Registro estatístico enviado a Diretoria de Pessoal. ${displayName}`
        })
    },
});