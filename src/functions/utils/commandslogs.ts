import { ChatInputCommandInteraction, Message } from "discord.js";
import { commandMessageContainer } from "../../discord/containers/events/bot.event.commands.log.js";
import { commandInteractionContainer } from "../../discord/containers/events/bot.event.commands.log.slash.js";

export async function logcommand(command: Message) {
    const channellog = await command.guild?.channels.fetch(constants.channels.logsChannelId);
    if (!channellog?.isTextBased()) return;

    await channellog.send({
        flags: ["IsComponentsV2"],
        components: [commandMessageContainer(command)],
        allowedMentions: { parse: [] }
    });
}

export async function logslashcommand(interaction: ChatInputCommandInteraction) {
    const channellog = await interaction.guild?.channels.fetch(constants.channels.logsChannelId);
    if (!channellog?.isTextBased()) return;

    await channellog.send({
        flags: ["IsComponentsV2"],
        components: [commandInteractionContainer(interaction)],
        allowedMentions: { parse: [] }
    });
}
