import { createResponder, ResponderType } from "#base";
import { TimestampStyles, time } from "discord.js";
import { db } from "../../../database/firestore.js";
import { icon } from "../../../functions/utils/emojis.js";
import { cautelaCloseContainer } from "../../containers/commands/slash/public/cautela.close.js";

createResponder({
    customId: "cautela/close/:memberId",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction, { memberId }) {
        const docRef = db.collection("cautelas").doc(memberId);
        const doc = await docRef.get();

        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Você não possui uma cautela em aberto.`
            })
            return;
        }

        const data = doc.data();

        if (!data) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Sua cautela foi corrompida, entre em contato com a DTIC.`
            })
            return;
        }

        if (!interaction.member.roles.cache.has(dbroles.dp_roles.diretoriadepessoalRoleId) || !data.militares.includes(interaction.member.id) || interaction.member.id !== data.memberId) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Você não possui permissão para fechar esta cautela.`
            })
            return;
        }

        await interaction.update({
            components: [cautelaCloseContainer(interaction.member, data, time(new Date(), TimestampStyles.LongDateShortTime))]
        })

        await docRef.delete()
    },
});