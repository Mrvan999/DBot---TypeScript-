import { ApplicationCommandOptionType, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import { icon } from "../../../../../functions/utils/emojis.js";
import { avaliarMilitarContainer } from "../../../../containers/commands/slash/public/avaliar/avaliar.militar.js";
import { avaliarMilitarShowNameContainer } from "../../../../containers/commands/slash/public/avaliar/avaliar.militar.showName.js";

export default {
    options: [
        {
            name: "militar",
            description: "Selecione o militar que deseja avaliar.",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name: "estrelas",
            description: "Selecione a quantidade de estrelas que deseja dar ao militar.",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name: "avaliacao",
            description: "Descreva sua avaliação.",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    async run(interaction: ChatInputCommandInteraction<"cached">) {
        const militar = interaction.options.getString("militar")!;
        const estrelas = interaction.options.getString("estrelas")!;
        const avaliacao = interaction.options.getString("avaliacao")!;

        if (!["1", "2", "3", "4", "5"].includes(estrelas)) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} O valor em estrelas é inválido.`
            })
            return;
        };

        const estrelasFormat = "⭐".repeat(Number(estrelas));

        const avaliacaoChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.avaliacaoChannelId);
        if (!avaliacaoChannel?.isTextBased()) return;

        const avaliacaoShowNameChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.avaliacaoShowNameChannelId);
        if (!avaliacaoShowNameChannel?.isTextBased()) return;

        await avaliacaoChannel.send({
            flags: ["IsComponentsV2"],
            components: [avaliarMilitarContainer(militar, estrelasFormat, avaliacao)]
        });

        await avaliacaoShowNameChannel.send({
            flags: ["IsComponentsV2"],
            components: [avaliarMilitarShowNameContainer(militar, interaction.member, estrelasFormat, avaliacao)]
        });

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Avaliação enviada com sucesso.`
        });
    },

    async autocomplete(interaction: AutocompleteInteraction<"cached">) {
        const focused = interaction.options.getFocused(true);

        if (focused.name === "militar") {
            const todasSugestoes = [
                "Coronel PM Dante Oliveira Neves (dantese4ga)",
                "Coronel PM Tiago Nascimento (rex14marrina)",
                "Coronel PM Felipe Borges (felipelagameplay)",
                "Coronel PM Fernandos Alves (jossoares_verdadeiro)",
                "Coronel PM César Nero (noel_y2k)",
                "Coronel PM Rodrigues Silva Filho (geraldo620)",
                "Tenente-Coronel PM Fillipe Roda (gugufefe0181)",
                "Major PM Kalew Nóbrega Silva (kalew020)",
                "Major PM Raphael Figueiredo Mendes Telhada (yurigabriel6)",
                "Capitão PM Guilherme Santana Gaspar (arthursantana156725)",
                "Capitão PM Kardec Martins (shorthalflife)",
                "Capitão PM João Vitor (jv302006)",
                "Capitão PM Felipe Agnesini (luodvkx)",
                "Capitão PM José Andrade (mrivan666)",
                "1º Tenente PM Rafael Maia (unomaisquatro)",
                "1º Tenente PM Daniel Silva Rosa (daniel2022br)",
                "2º Tenente PM Adeson Frank Benard (adeson0987)",
                "2º Tenente PM Marcos Cesar Costa (dast6lc)",
                "1º Sargento PM Henrique Silva Santos (henriqueluciana2019)",
                "1º Sargento PM Natalie Faria (naliwibr1)",
                "1º Sargento PM Givalter Assis (guizinho552234)",
                "2º Sargento PM David Silveira de Andrade (gueltola)",
                "2º Sargento PM Alejandro Pereira Marques (megaleoo133)",
                "3º Sargento PM Kaique Machado Pompeu (kaiquegabrielmatias)",
                "3º Sargento PM Clara Suzuki (mathx1k)",
                "3º Sargento PM Gabriel Abreu (gustavoabreu355)",
                "3º Sargento PM Felipe Contessoto(felipec251)",
                "3º Sargento PM Santos (danx_123)",
                "3º Sargento PM Victor Monteiro Lopes (mvniciu)"
            ];

            const filtradas = todasSugestoes
                .filter(s => s.toLowerCase().includes(focused.value.toLowerCase()))
                .slice(0, 25);

            return interaction.respond(
                filtradas.map(s => ({ name: s, value: s }))
            );
        }

        if (focused.name === "estrelas") {
            const sugestões = [
                { name: "⭐⭐⭐⭐⭐", value: "5" },
                { name: "⭐⭐⭐⭐", value: "4" },
                { name: "⭐⭐⭐", value: "3" },
                { name: "⭐⭐", value: "2" },
                { name: "⭐", value: "1" }
            ].filter(s => s.name.includes(focused.value));

            return interaction.respond(
                sugestões
            );
        }
    }
};
