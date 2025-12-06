import { createResponder, ResponderType } from "#base";
import { db } from "../../../database/firestore.js";
import { icon } from "../../../functions/utils/emojis.js";
import { licenseApprovedContainer } from "../../containers/commands/slash/public/license.approved.js";
import { licenseRequestApproveContainer } from "../../containers/commands/slash/public/license.request.approve.js";
createResponder({
    customId: "license/approve/:memberId",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction, { memberId }) {
        if (!interaction.member.roles.cache.has(dbroles.dp_roles.ouvidoriadpRoleId)) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Você não possui permissão para realizar a aprovação.`
            });
            return;
        }
        const solicitante = await interaction.guild.members.fetch(memberId);
        const docRef = db.collection("licenses").doc(memberId);
        const doc = await docRef.get();
        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Nenhum documento encontrado para memberId: ${memberId}`
            });
            return;
        }
        const data = doc.data();
        if (!data) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Os dados do documento estão vazios`
            });
            return;
        }
        await interaction.member.roles.add(dbroles.others_roles.ausenteRoleId);
        await docRef.update({
            status: "Licença em andamento"
        });
        await interaction.update({
            components: [await licenseRequestApproveContainer(interaction.member, solicitante, data.motivo, data.tempo, data.observacoes)]
        });
        try {
            await solicitante.send({
                flags: ["IsComponentsV2"],
                components: [await licenseApprovedContainer(interaction.member, solicitante, data.motivo, data.tempo, data.observacoes)]
            });
        }
        catch (error) {
            console.error(`Erro ao enviar uma mensangem na DM de ${solicitante.user.username}:`, error);
            throw error;
        }
    },
});
