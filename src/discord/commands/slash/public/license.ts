import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { db } from "../../../../database/firestore.js";
import { createLicenseRequest } from "../../../../functions/utils/createLicenseRequest.js";
import { icon } from "../../../../functions/utils/emojis.js";
import { licenseRemoveContainer } from "../../../containers/commands/slash/public/license.remove.js";
import { licenseRequestContainer } from "../../../containers/commands/slash/public/license.request.js";

createCommand({
    name: "gerenciar",
    description: "Comandos de solicitação",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "licenca",
            description: "Gerenciar licença",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "acao",
                    description: "Selecione a ação",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                },
                {
                    name: "motivo",
                    description: "Motivo da retirada da licença",
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: "tempo",
                    description: "Tempo da licença",
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: "observacoes",
                    description: "Observações adicionais",
                    type: ApplicationCommandOptionType.String,
                    required: false
                }
            ]
        }
    ],

    async run(interaction) {
        if (interaction.options.getSubcommand() !== "licenca") return;

        const acao = interaction.options.getString("acao");
        const motivo = interaction.options.getString("motivo") ?? "Não há";
        const tempo = interaction.options.getString("tempo") ?? "Não há";
        const observacoes = interaction.options.getString("observacoes") ?? "Não há";

        const solicitacoesdpChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.solicitacoesdpChannelId);
        if (!solicitacoesdpChannel?.isTextBased()) return;

        function parseTempoToDays(input: string | null): number | null {
            if (!input) return null;

            const texto = input.toLowerCase().trim();

            const diasMatch = texto.match(/(\d+)\s*dias?/);
            if (diasMatch) return parseInt(diasMatch[1]);

            const semanasMatch = texto.match(/(\d+)\s*semanas?/);
            if (semanasMatch) return parseInt(semanasMatch[1]) * 7;

            const mesesMatch = texto.match(/(\d+)\s*m[eê]s(es)?/);
            if (mesesMatch) return parseInt(mesesMatch[1]) * 30;

            return null;
        }

        if (acao === "Solicitar licença" && motivo === "Não há") {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Você precisa informar um **motivo** para solicitar a licença.`
            });
            return;
        }

        if (acao === "Solicitar licença" && tempo === "Não há") {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: "Você precisa informar o **tempo** ao solicitar a licença."
            });
            return;
        }

        let dias = null;

        if (acao === "Solicitar licença") {
            dias = parseTempoToDays(tempo);

            if (dias === null) {
                await interaction.reply({
                    flags: ["Ephemeral"],
                    content: `${icon.action_x} Não consegui entender o **tempo informado**.\nExemplos válidos:\n- 7 dias\n- 2 semanas\n- 1 mês`
                });
                return;
            }

            if (dias < 7) {
                await interaction.reply({
                    flags: ["Ephemeral"],
                    content: `${icon.action_x} O tempo mínimo para solicitar licença é de **7 dias**.`
                });
                return;
            }

            if (dias > 45) {
                await interaction.reply({
                    flags: ["Ephemeral"],
                    content: `${icon.action_x} Para solicitar licenças acima de **45 dias**, por favor abra um ticket no canal <#1442612832481841203> na sessão da **Diretoria de Pessoal**.`
                });
                return;
            }
        }

        if (acao === "Solicitar licença") {
            const docRef = db.collection("licenses").doc(interaction.member.id);
            const doc = await docRef.get();

            if (doc.exists) {
                await interaction.reply({
                    flags: ["Ephemeral"],
                    content: `${icon.action_x} Você já possui uma licença em aberto.`
                })
                return;
            }

            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_check} Sua solicitação foi enviada a Diretoria de Pessoal.`
            });

            await solicitacoesdpChannel.send({
                flags: ["IsComponentsV2"],
                components: [await licenseRequestContainer(interaction.member, motivo, tempo, observacoes)]
            });

            await createLicenseRequest(interaction.member.id, motivo, tempo, observacoes)
        } 
        
        else if (acao === "Retirar licença") {
            const docRef = db.collection("licenses").doc(interaction.member.id);
            const doc = await docRef.get();

            if (!doc.exists) {
                await interaction.reply({
                    flags: ["Ephemeral"],
                    content: `${icon.action_x} Você não possui uma licença em aberto.`
                })
                return;
            }

            const data = doc.data();

            if (!data) {
                await interaction.reply({
                    flags: ["Ephemeral"],
                    content: `${icon.action_x} Os dados do documento estão vazios, contate a equipe de desenvolvimento.`
                })
                return;
            }

            if (data.status === "Aguardando Aprovação") {
                await interaction.reply({
                    flags: ["Ephemeral"],
                    content: `${icon.action_x} Não é possível retirar uma licença em processo de aprovação.`
                })
                return;
            }

            await docRef.delete();

            await interaction.member.roles.remove(dbroles.others_roles.ausenteRoleId);

            await solicitacoesdpChannel.send({
                flags: ["IsComponentsV2"],
                components: [await licenseRemoveContainer(interaction.member)]
            });

            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_check} Sua licença foi encerrada com sucesso.`
            });
        }
    },

    async autocomplete(interaction) {
        const focused = interaction.options.getFocused(true);

        if (focused.name === "acao") {
            const sugestões = [
                "Solicitar licença",
                "Retirar licença",
            ].filter(s => s.toLowerCase().includes(focused.value.toLowerCase()));

            return interaction.respond(
                sugestões.map(s => ({ name: s, value: s }))
            );
        }
    }
});
