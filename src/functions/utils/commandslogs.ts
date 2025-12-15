import { ChatInputCommandInteraction, Message } from "discord.js";
import { commandPrefixLogContainer } from "../../discord/containers/logs/commands/prefix.js";
import { commandSlashLogContainer } from "../../discord/containers/logs/commands/slash.js";

export async function commandPrefixLog(command: Message) {
    const channellog = await command.guild?.channels.fetch(dbchannels.channels_ids.logsChannelId);
    if (!channellog?.isTextBased()) return;

    await channellog.send({
        flags: ["IsComponentsV2"],
        components: [commandPrefixLogContainer(command)],
        allowedMentions: { parse: [] }
    });
}

export async function commandSlashLog(interaction: ChatInputCommandInteraction) {
    const channellog = await interaction.guild?.channels.fetch(dbchannels.channels_ids.logsChannelId);
    if (!channellog?.isTextBased()) return;

    await channellog.send({
        flags: ["IsComponentsV2"],
        components: [commandSlashLogContainer(interaction)],
        allowedMentions: { parse: [] }
    });
}
