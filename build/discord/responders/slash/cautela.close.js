import { createResponder, ResponderType } from "#base";
import { TimestampStyles, time } from "discord.js";
import { db } from "../../../database/firestore.js";
import { icon } from "../../../functions/utils/emojis.js";
import { cautelaCloseContainer } from "../../containers/commands/slash/public/cautela.close.js";
createResponder({
    customId: "cautela/close/:prefixo",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction, { prefixo }) {
        const docRef = db.collection("cautelas").doc(interaction.member.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Você não possui uma cautela em aberto.`
            });
            return;
        }
        const data = doc.data();
        if (!data) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Sua cautela foi corrompida, entre em contato com a DTIC.`
            });
            return;
        }
        if (data.prefixo !== prefixo && !interaction.member.roles.cache.has(dbroles.dp_roles.ouvidoriadpRoleId)) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} A cautela em questão não foi aberta por você.`
            });
            return;
        }
        await interaction.update({
            components: [cautelaCloseContainer(interaction.member, data, time(new Date(), TimestampStyles.LongDateShortTime))]
        });
        await docRef.delete();
    },
});
