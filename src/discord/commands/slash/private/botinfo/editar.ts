import { ApplicationCommandOptionType, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import { db } from "../../../../../database/firestore.js";
import { icon } from "../../../../../functions/utils/emojis.js";
import { botinfoSendContainer } from "../../../../containers/commands/slash/private/botinfo/botinfo.js";

export default {
    options: [
        {
            name: "lidertecnico",
            description: "Informe o Lider Técnico. (Coronel PM César Nero)",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "desenvolvedorprincipal",
            description: "Informe o Desenvolvedor Principal. (Major PM Raphael Figueiredo)",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "auxiliares",
            description: "Informe a Equipe de Auxiliares. (Coronel PM César Nero, Major PM Raphael Figueiredo...",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "status",
            description: "Selecione o Status do Bot.",
            type: ApplicationCommandOptionType.String,
            required: false,
            autocomplete: true
        },
        {
            name: "versao",
            description: "Informe a Versão do Sistema.",
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],

    async run(interaction: ChatInputCommandInteraction<"cached">) {
        const liderTecnico = interaction.options.getString("lidertecnico") ?? "Não Selecionado";
        const desenvolvedorPrincipal = interaction.options.getString("desenvolvedorprincipal") ?? "Não Selecionado";
        const auxiliares = interaction.options.getString("auxiliares") ?? "Não Selecionado";
        const status = interaction.options.getString("status") ?? "Não Selecionado";
        const versao = interaction.options.getString("versao") ?? "Não Selecionado";

        const atualizacoesbotChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.atualizacoesbotChannelId);
        if (!atualizacoesbotChannel?.isTextBased()) return;

        const docRef = db.collection("atualizacoesbot").doc("infos");
        let doc = await docRef.get();

        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} As informações não existem no banco de dados.`
            })
            return;
        };

        if (liderTecnico !== "Não Selecionado") {
            await docRef.update({
                liderTecnico: liderTecnico
            });
        };

        if (desenvolvedorPrincipal !== "Não Selecionado") {
            await docRef.update({
                desenvolvedorPrincipal: desenvolvedorPrincipal
            });
        };

        if (auxiliares !== "Não Selecionado") {
            await docRef.update({
                auxiliares: auxiliares
            })
        };

        if (status !== "Não Selecionado") {
            await docRef.update({
                status: status
            })
        };

        if (versao !== "Não Selecionado") {
            await docRef.update({
                versao: versao
            })
        };

        if (liderTecnico === "Não Selecionado" && desenvolvedorPrincipal === "Não Selecionado" && auxiliares === "Não Selecionado" && status === "Não Selecionado" && versao === "Não Selecionado") {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_remove} Nada foi selecionado, as informações não foram atualizadas.`
            });
            return;
        }

        doc = await docRef.get();

        const data = doc.data();

        if (!data) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Os dados do documento estão vazios.`
            })
            return;
        }

        const clientMember = await interaction.guild.members.fetch(data.clientId);
        let statusEmoji = "";

        switch (data.status) {
            case "Ligado":
                statusEmoji = icon.action_check.toString()
                break;
            case "Manutenção":
                statusEmoji = icon.action_remove.toString()
                break;
            case "Desligado":
                statusEmoji = icon.action_x.toString()
                break;
            case "Descontinuado":
                statusEmoji = icon.action_warning.toString()
                break;
            default:
                statusEmoji = icon.action_question.toString()
                break;
        }

        const message = await atualizacoesbotChannel.messages.fetch(data.messageId);

        await message.edit({
            flags: ["IsComponentsV2"],
            components: [botinfoSendContainer(data.versao, clientMember, statusEmoji, data.status, data.liderTecnico, data.desenvolvedorPrincipal, data.auxiliares)]
        });

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Atualização e edição realizadas com sucesso.`
        })
    },
    
    async autocomplete(interaction: AutocompleteInteraction<"cached">) {
        const focused = interaction.options.getFocused(true);

        if (focused.name === "status") {
            const todasSugestoes = [
                "Ligado",
                "Manutenção",
                "Desligado",
                "Descontinuado"
            ];

            const filtradas = todasSugestoes
                .filter(s => s.toLowerCase().includes(focused.value.toLowerCase()))
                .slice(0, 25);

            return interaction.respond(
                filtradas.map(s => ({ name: s, value: s }))
            );
        }
    }
};
