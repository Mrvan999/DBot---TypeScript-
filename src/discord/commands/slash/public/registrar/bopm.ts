import { brBuilder } from "@magicyan/discord";
import { ApplicationCommandOptionType, AutocompleteInteraction, ChatInputCommandInteraction, time, TimestampStyles } from "discord.js";
import { promises as fs } from "fs";
import { db } from "../../../../../database/firestore.js";
import { icon } from "../../../../../functions/utils/emojis.js";

export default {
    options: [
        {
            name: "militares",
            description: "Mencione os militares participantes.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "origem",
            description: "Selecione a origem da ocorrência.",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name: "endereco",
            description: "Informe o endereço da ocorrência.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "resultado",
            description: "Selecione o resultado da ocorrência.",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name: "artigos",
            description: "Informe os artigos do ocorrido.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "descricao",
            description: "Descreva o ocorrido.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "acusado",
            description: "Informe o acusado.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "foto",
            description: "Envie uma foto do ponto fixo.",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        },
        {
            name: "vitima",
            description: "Informe a vítima.",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "outro",
            description: "Informe transeuntes.",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],

    async run(interaction: ChatInputCommandInteraction<"cached">) {
        const militares = interaction.options.getString("militares")!;
        const origem = interaction.options.getString("origem")!;
        const endereco = interaction.options.getString("endereco")!;
        const resultado = interaction.options.getString("resultado")!;
        const artigos = interaction.options.getString("artigos")!;
        const descricao = interaction.options.getString("descricao")!;
        const acusado = interaction.options.getString("acusado")!;
        const foto = interaction.options.getAttachment("foto")!;
        const vitima = interaction.options.getString("vitima") ?? "Não Há";
        const outro = interaction.options.getString("outro") ?? "Não Há";

        const docRef = db.collection("contagens").doc("bopm");
        const doc = await docRef.get();

        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Houve um erro ao acessar o documento "bopm", entre em contato com a DTIC.`
            })
            return;
        }

        const data = doc.data();

        if (!data) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} O documento "bopm" está vazio, entre em contato com a DTIC.`
            })
            return;
        }

        const nbopm = Number(data.bopmatual) + 1;

        await docRef.update({
            "bopmatual": String(nbopm)
        })

        const bopmChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.bopmChannelId);
        if (!bopmChannel?.isTextBased()) return;

        let messagemd = await fs.readFile("src/discord/messages/bopm.base.md", "utf-8");

        messagemd = messagemd
            .replace(/\$\{nbopm\}/g, String(nbopm))
            .replace(/\$\{militares\}/g, militares)
            .replace(/\$\{data\}/g, time(new Date(), TimestampStyles.LongDateShortTime))
            .replace(/\$\{origem\}/g, origem)
            .replace(/\$\{endereco\}/g, endereco)
            .replace(/\$\{resultado\}/g, resultado)
            .replace(/\$\{artigos\}/g, artigos)
            .replace(/\$\{acusado\}/g, acusado)
            .replace(/\$\{vitima\}/g, vitima)
            .replace(/\$\{outro\}/g, outro)
            .replace(/\$\{interaction\.user\}/g, `<@${interaction.user.id}>`);

        const mensagemComDescricao = messagemd.replace(/\$\{descricao\}/g, descricao);

        let mainMessageContent = mensagemComDescricao;
        let descricaoParaTopico: string | null = null;

        if (mensagemComDescricao.length > 2000) {
            mainMessageContent = messagemd.replace(/\$\{descricao\}/g, "Adicionada ao tópico anexado.");
            descricaoParaTopico = descricao;
        }

        const mainMessage = await bopmChannel.send({
            content: mainMessageContent,
            files: [foto]
        });

        if (descricaoParaTopico) {
            const messageThread = await mainMessage.startThread({
                name: `BO nº ${nbopm}`,
                autoArchiveDuration: 1440,
                reason: `Descrição extensa.`
            });

            await messageThread.send({
                content: brBuilder(
                    `**Descrição Completa:**`,
                    `${descricaoParaTopico}`
                )
            });
        }

        await interaction.reply({
            ephemeral: true,
            content: `${icon.action_check} Boletim registrado com sucesso.`
        });
    },

    async autocomplete(interaction: AutocompleteInteraction<"cached">) {
        const focused = interaction.options.getFocused(true);

        if (focused.name === "origem") {
            const sugestões = [
                "Sala de Operação",
                "Deparou-se com a Ocorrência",
                "Centro de Operações",
                "Solicitação ao Policial",
                "Resultado de Abordagem"
            ].filter(s => s.toLowerCase().includes(focused.value.toLowerCase()));

            return interaction.respond(
                sugestões.map(s => ({ name: s, value: s }))
            );
        }

        if (focused.name === "resultado") {
            const sugestões = [
                "Apresentação na Delegacia",
                "Internação no Hospital",
                "Óbito Evidente",
                "Óbito Constatado",
                "Liberado no Local"
            ].filter(s => s.toLowerCase().includes(focused.value.toLowerCase()));

            return interaction.respond(
                sugestões.map(s => ({ name: s, value: s }))
            );
        }
    }
};
