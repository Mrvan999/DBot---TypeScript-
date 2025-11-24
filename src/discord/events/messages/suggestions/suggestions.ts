import { createEvent } from "#base";
import { addSuggestion, updateSuggestionMessageId } from "../../../../functions/utils/suggestions/suggestionsManager.js";
import { createSuggestionContainer } from "../../../containers/events/suggetions.create.js";

createEvent({
    name: "suggestions",
    event: "messageCreate",
    async run(message) {
        if (message.author.id === message.client.user?.id || message.channelId !== constants.channels.suggestionsChannelId) return;

        const suggestionNumber = addSuggestion("temp", message.author.id);

        const container = createSuggestionContainer(message, suggestionNumber);

        await message.delete();

        const mymessage = await message.channel.send({
            flags: ["IsComponentsV2"],
            allowedMentions: { parse: [] },
            components: [container]
        });

        await mymessage.react(`<:action_check:1442162013550805123>`);
        await mymessage.react(`<:action_x:1442162024174981371>`);
        await mymessage.startThread({
            name: `Sugestão Nº${suggestionNumber} - Discussão`,
            autoArchiveDuration: 1440,
            reason: "Tópico para discussão de sugestão.",
        });

        const messageLink = `https://discord.com/channels/${message.guildId}/${message.channelId}/${mymessage.id}`;
        updateSuggestionMessageId(suggestionNumber, messageLink);
    }
});
