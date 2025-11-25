import { ActionRowBuilder, ButtonBuilder, ButtonStyle, GuildMember } from "discord.js";
import { icon } from "../../../../../functions/utils/emojis.js";

export function uniformFinalButtons(member: GuildMember) {
    return new ActionRowBuilder({
        components: [
            new ButtonBuilder({
                customId: `uniform/final/${member.id}`,
                emoji: icon.action_check,
                label: "Finalizar Personalização",
                style: ButtonStyle.Success,
            })
        ]
    })
}
