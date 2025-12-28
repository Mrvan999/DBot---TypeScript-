import { ApplicationCommandOptionType, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import { promises as fs } from "fs";
import { db } from "../../../../../database/firestore.js";
import { icon } from "../../../../../functions/utils/emojis.js";

export default {
    options: [
        {
            name: "bopm",
            description: "Informe o número do BOPM anexado.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "objeto",
            description: "Objeto apreendido.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "quantidade",
            description: "Quantidade apreendida.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "marca",
            description: "Marca do objeto.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "modelo",
            description: "Modelo do objeto.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "destino",
            description: "Destino do objeto.",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name: "receptor",
            description: "Receptor do objeto.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "foto",
            description: "Foto do objeto.",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        }
    ],

    async run(interaction: ChatInputCommandInteraction<"cached">) {
        const nbopm = interaction.options.getString("bopm")!;
        const objeto = interaction.options.getString("objeto")!;
        const quantidade = interaction.options.getString("quantidade")!;
        const marca = interaction.options.getString("marca")!;
        const modelo = interaction.options.getString("modelo")!;
        const destino = interaction.options.getString("destino")!;
        const receptor = interaction.options.getString("receptor")!;
        const foto = interaction.options.getAttachment("foto")!;

        const talapreesChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.talapreesChannelId);
        if (!talapreesChannel?.isTextBased()) return;

        let messagemd = await fs.readFile("src/discord/messages/talaprees.base.md", "utf-8");

        messagemd = messagemd
            .replace(/\$\{emoji\}/g, icon.pmesp.toString())
            .replace(/\$\{nbopm\}/g, nbopm)
            .replace(/\$\{objeto\}/g, objeto)
            .replace(/\$\{quantidade\}/g, quantidade)
            .replace(/\$\{marca\}/g, marca)
            .replace(/\$\{modelo\}/g, modelo)
            .replace(/\$\{destino\}/g, destino)
            .replace(/\$\{receptor\}/g, receptor)
            .replace(/\$\{interaction\.user\}/g, `<@${interaction.user.id}>`);

        await talapreesChannel.send({
            content: messagemd,
            files: [foto]
        });

        const querySnapshot = await db.collection("militares").where("memberId", "==", interaction.user.id).limit(1).get();

        if (querySnapshot.empty) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Nenhum registro encontrado para este militar.`
            });
            return;
        }

        const doc = querySnapshot.docs[0];
        const data = doc.data();

        await doc.ref.update({
            talao: Number(data.talao ?? 0) + 1
        });

        await interaction.reply({
            ephemeral: true,
            content: `${icon.action_check} Talão de apreensão registrado com sucesso.`
        });
    },

    async autocomplete(interaction: AutocompleteInteraction<"cached">) {
        const focused = interaction.options.getFocused(true);

        if (focused.name === "destino") {
            const sugestões = [
                "Pátio de Apreensões",
                "Delegacia de Polícia Civil"
            ].filter(s => s.toLowerCase().includes(focused.value.toLowerCase()));

            return interaction.respond(
                sugestões.map(s => ({ name: s, value: s }))
            );
        }
    }
};
