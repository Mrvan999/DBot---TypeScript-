import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";
import { licenseRequestContainer } from "../../../containers/commands/slash/public/license.request.js";
import { createLicenseRequest } from "../../../../functions/utils/license/createLicenseRequest.js";

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

        const solicitacoesdpChannel = await interaction.guild.channels.fetch(constants.channels.solicitacoesdpChannelId);
        if (!solicitacoesdpChannel?.isTextBased()) return;

        // Validações dinâmicas:
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

        if (acao === "Solicitar licença") {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_check} Sua solicitação foi enviada a Diretoria de Pessoal.`
            });

            await solicitacoesdpChannel.send({
                flags: ["IsComponentsV2"],
                components: [licenseRequestContainer(interaction.member, motivo, tempo, observacoes)]
            });

            await createLicenseRequest(interaction.member.id, motivo, tempo, observacoes)
        }
    },

    // Autocomplete do campo "acao"
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