import { createResponder, ResponderType } from "#base";
import { brBuilder } from "@magicyan/discord";
import { db } from "../../../database/firestore.js";
import { createDiscordName } from "../../../functions/utils/createDiscordName.js";
import { icon } from "../../../functions/utils/emojis.js";
import { registroFinishReproveContainer } from "../../containers/responders/modals/registro.finishReprove.js";

createResponder({
    customId: "registro/modal/finish/reprove/:memberId",
    types: [ResponderType.Button],
    cache: "cached",
    async run(interaction, { memberId }) {
        const guild = interaction.guild;
        if (!guild) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Não foi possível identificar o servidor.`
            })
            return
        }

        const docRef = db.collection("militares").doc(memberId);
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

        const target = await guild.members.fetch(memberId).catch(() => null);
        if (!target) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Não foi possível encontrar o membro alvo.`
            })
            return
        }

        const newNickname = await createDiscordName(target.id, guild)

        await target.send({
            content: brBuilder(
                "Olá, seu registro estatístico foi reprovado pela Diretoria de Pessoal.",
                `Callsing: ${newNickname.slice(0, 2)}`,
                `Personagem: ${data.nome} (${data.rg})`,
                `Apelido Servidor: ${newNickname}`,
                "-# Você pode tentar novamente, um de nossos integrantes entrará em contato."
            )
        })

        await docRef.delete()

        await interaction.update({
            components: [registroFinishReproveContainer(interaction.member, target, data.nome, data.rg, data.patente, data.opm)]
        });
    },
});
