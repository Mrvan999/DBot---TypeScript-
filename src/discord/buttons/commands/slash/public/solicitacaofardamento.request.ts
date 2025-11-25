import { ActionRowBuilder, ButtonBuilder, ButtonStyle, GuildMember } from "discord.js";
import { icon } from "../../../../../functions/utils/emojis.js";

export function uniformRequestButtons(member: GuildMember) {
    return new ActionRowBuilder({
        components: [
            new ButtonBuilder({
                customId: `uniform/accept/${member.id}`,
                emoji: icon.action_check,
                label: "Aceitar Personalização",
                style: ButtonStyle.Success,
            }),
            new ButtonBuilder({
                customId: `uniform/deny/${member.id}`,
                emoji: icon.action_x,
                label: "Negar Personalização",
                style: ButtonStyle.Danger,
            })
        ]
    })
}
