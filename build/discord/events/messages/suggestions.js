import { createEvent } from "#base";
import { db } from "../../../database/firestore.js";
import { icon } from "../../../functions/utils/emojis.js";
import { suggestionCreateFirestore } from "../../../functions/utils/suggestions/suggestions.create.js";
import { createSuggestionContainer } from "../../containers/events/suggetions.create.js";
createEvent({
    name: "suggestions",
    event: "messageCreate",
    async run(message) {
        if (message.author.id === message.client.user?.id || message.channelId !== constants.channels.suggestionsChannelId)
            return;
        const suggestionNumber = await suggestionCreateFirestore(message.member?.id, message.content, "temp");
        await message.delete();
        const mymessage = await message.channel.send({
            flags: ["IsComponentsV2"],
            allowedMentions: { parse: [] },
            components: [createSuggestionContainer(message, suggestionNumber)]
        });
        const docRef = db.collection("suggestions").doc(suggestionNumber);
        const doc = await docRef.get();
        if (!doc.exists) {
            return;
        }
        const data = doc.data();
        if (!data) {
            return;
        }
        await docRef.update({
            "sugestaoId": mymessage.id
        });
        await mymessage.react(icon.action_check.toString());
        await mymessage.react(icon.action_x.toString());
        await mymessage.startThread({
            name: `Sugestão Nº${suggestionNumber} - Discussão`,
            autoArchiveDuration: 1440,
            reason: "Tópico para discussão de sugestão.",
        });
    }
});
