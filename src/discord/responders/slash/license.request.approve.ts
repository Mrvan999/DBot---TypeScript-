import { createResponder, ResponderType } from "#base";
import { db } from "../../../database/firestore.js";
import { getAusenteRoleId, getOuvidoriaDPRoleId } from "../../../functions/utils/dbrolesget.js";
import { icon } from "../../../functions/utils/emojis.js";
import { licenseRequestApproveContainer } from "../../containers/commands/slash/public/license.request.approve.js";

createResponder({
    customId: "license/approve/:memberId",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction, { memberId }) {
        if (!interaction.member.roles.cache.has(await getOuvidoriaDPRoleId())) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Você não possui permissão para realizar a aprovação.`
            })
            return
        }

        const solicitante = await interaction.guild.members.fetch(memberId);

        const docRef = db.collection("licenses").doc(memberId);
        const doc = await docRef.get();

        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Nenhum documento encontrado para memberId: ${memberId}`
            })
            return;
        }

        const data = doc.data();

        if (!data) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Os dados do documento estão vazios`
            })
            return;
        }

        await interaction.member.roles.add(await getAusenteRoleId());

        await docRef.update({
            status: "Licença em andamento"
        })

        await interaction.update({
            components: [licenseRequestApproveContainer(interaction.member, solicitante, data.motivo, data.tempo, data.observacoes)]
        })

        try {
            await solicitante.send({
                content: `${icon.action_check} Sua solicitação foi aprovada pela Diretoria de Pessoal.`
            })
        } catch (error) {
            console.error(`Erro ao enviar uma mensangem na DM de ${solicitante.user.username}:`, error);
            throw error;
        }
    },
});