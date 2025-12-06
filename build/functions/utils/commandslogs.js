import { commandPrefixLogContainer } from "../../discord/containers/events/command.prefix.log.js";
import { commandSlashLogContainer } from "../../discord/containers/events/command.slash.log.js";
export async function commandPrefixLog(command) {
    const channellog = await command.guild?.channels.fetch(constants.channels.logsChannelId);
    if (!channellog?.isTextBased())
        return;
    await channellog.send({
        flags: ["IsComponentsV2"],
        components: [commandPrefixLogContainer(command)],
        allowedMentions: { parse: [] }
    });
}
export async function commandSlashLog(interaction) {
    const channellog = await interaction.guild?.channels.fetch(constants.channels.logsChannelId);
    if (!channellog?.isTextBased())
        return;
    await channellog.send({
        flags: ["IsComponentsV2"],
        components: [commandSlashLogContainer(interaction)],
        allowedMentions: { parse: [] }
    });
}
