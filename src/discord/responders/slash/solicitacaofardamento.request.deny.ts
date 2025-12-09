import { createResponder, ResponderType } from "#base";
import { brBuilder } from "@magicyan/discord";
import { time, TimestampStyles } from "discord.js";
import { promises as fs } from "fs";
import { db } from "../../../database/firestore.js";
import { icon } from "../../../functions/utils/emojis.js";

createResponder({
    customId: "uniform/deny/:memberId",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction, { memberId }) {
        if (!interaction.member.roles.cache.has(dbroles.dl_roles.diretoriadelogisticaRoleId)) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Você não possui permissão para negar personalizações.`
            })
            return
        }

        const solicitante = await interaction.guild.members.fetch(memberId);

        const docRef = db.collection("uniforms").doc(memberId);
        const doc = await docRef.get();

        if (!doc.exists) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Nenhum documento encontrado para memberId: ${memberId}`
            })
            return;
        }

        const data = doc.data();

        if (!data) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Os dados do documento estão vazios`
            })
            return;
        }

        await docRef.delete()

        let messagemd = await fs.readFile('src/discord/messages/solicitacaofardamento.base.md', 'utf-8');

        messagemd = messagemd
            .replace(/\$\{mencaoDL\}/g, `<@&${dbroles.dl_roles.diretoriadelogisticaRoleId}>`)
            .replace(/\$\{nomeCompletoSolicitante\}/g, data.nome)
            .replace(/\$\{patente\}/g, data.patente)
            .replace(/\$\{re\}/g, data.re)
            .replace(/\$\{fardamento\}/g, data.fardamento)
            .replace(/\$\{cursoformacao\}/g, data.cursoformacao)
            .replace(/\$\{opm\}/g, data.opm)
            .replace(/\$\{cursoespecializado\}/g, data.cursoespecializado)
            .replace(/\$\{medalhas\}/g, data.medalhas)
            .replace(/\$\{laurea\}/g, data.laurea)
            .replace(/\$\{adicionais\}/g, data.adicionais)
            .replace(/\$\{observacoes\}/g, data.observacoes)
            .replace(/\$\{interaction\.user\}/g, `<@${solicitante.user.id}>`)
            .replace(/\$\{statusAtual\}/g, `Personalização Negada: ${time(new Date(), TimestampStyles.LongDateShortTime)} | <@${interaction.user.id}>`);

        await interaction.update({
            content: messagemd,
            components: []
        })

        try {
            await solicitante.send({
                content: brBuilder(
                    `Olá, ${solicitante.user.username}. Seu fardamento foi negado pela Diretoria de Logística, entre em contato para mais informações.`,
                    `Data da reprovação: ${time(new Date(), TimestampStyles.LongDateShortTime)}`,
                    `Responsável: <@${interaction.user.id}>`
                )
            })
        } catch (error) {
            console.error(`Erro ao enviar uma mensangem na DM de ${solicitante.user.username}:`, error);
            throw error;
        }
    },
});