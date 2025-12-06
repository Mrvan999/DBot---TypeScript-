import { createResponder, ResponderType } from "#base";
import { icon } from "../../../functions/utils/emojis.js";
import { ouvidoriaCreateFirestore } from "../../../functions/utils/ouvidoria/ouvidoria.create.js";
import { ouvidoriaSelectContainer } from "../../containers/commands/slash/private/ouvidoria/ouvidoria.select.js";
createResponder({
    customId: "/ouvidoria/select",
    types: [ResponderType.StringSelect],
    cache: "cached",
    async run(interaction) {
        const selected = interaction.values?.[0];
        let ouvidoriaResponsavel;
        let ouvidoriaEmoji;
        let ouvidoriaRoleId;
        switch (selected) {
            case "ouvidoriadp":
                ouvidoriaResponsavel = "Diretoria de Pessoal da Polícia Militar";
                ouvidoriaEmoji = icon.dp;
                ouvidoriaRoleId = dbroles.dp_roles.ouvidoriadpRoleId;
                break;
            case "ouvidoriacorreg":
                ouvidoriaResponsavel = "Corregedoria da Polícia Militar";
                ouvidoriaEmoji = icon.correg;
                ouvidoriaRoleId = dbroles.correg_roles.corregedoriaRoleId;
                break;
            case "ouvidoriaempm":
                ouvidoriaResponsavel = "Estado Maior da Polícia Militar";
                ouvidoriaEmoji = icon.empm;
                ouvidoriaRoleId = dbroles.empm_roles.estadomaiorRoleId;
                break;
            default:
                ouvidoriaResponsavel = "Ouvidoria Não Identificada";
                ouvidoriaEmoji = icon.clipboard_remove;
                ouvidoriaRoleId = dbroles.postos_roles.oficiaisSuperioresRoleId;
                break;
        }
        const ouvidoriaResponsavelNumber = await ouvidoriaCreateFirestore(interaction.member.id, ouvidoriaResponsavel, ouvidoriaEmoji, ouvidoriaRoleId);
        await interaction.reply({
            flags: ["Ephemeral", "IsComponentsV2"],
            components: [ouvidoriaSelectContainer(interaction.member, ouvidoriaResponsavel, ouvidoriaEmoji, ouvidoriaResponsavelNumber)]
        });
    },
});
