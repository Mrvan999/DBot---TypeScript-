import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType, time, TimestampStyles } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";
import { cautelaCreateContainer } from "../../../containers/commands/slash/public/cautela.create.js";
import { createCautelaDocument } from "../../../../functions/utils/createCautelaDocument.js";


const prefixoInfo: Record<string, { modelo: string; opm: string; call: string }> = {
    "CPAM10-001": {
        modelo: "Trailblazer 2023",
        opm: "CPAM-10",
        call: "1412175946873835520"
    },
    "M-22000": {
        modelo: "Trailblazer 2023",
        opm: "22º BPM/M",
        call: "1392311391649661029"
    },
    "M-22003": {
        modelo: "Trailblazer 2023",
        opm: "22º BPM/M",
        call: "1412176114947854426"
    },
    "M-22005 CFP": {
        modelo: "Trailblazer 2023",
        opm: "22º BPM/M",
        call: "1136060081511874671"
    },
    "M-22100": {
        modelo: "Trailblazer 2023",
        opm: "22º BPM/M - 1ª Cia",
        call: "1238274422776008714"
    },
    "M-22102": {
        modelo: "Spin 2023",
        opm: "22º BPM/M - 1ª Cia",
        call: "1238274422776008714"
    },
    "M-22103": {
        modelo: "Spin 2023",
        opm: "22º BPM/M - 1ª Cia",
        call: "1136061487945887754"
    },
    "M-22104": {
        modelo: "Spin 2023",
        opm: "22º BPM/M - 1ª Cia",
        call: "1136061538046836766"
    },
    "M-22105": {
        modelo: "Spin 2023",
        opm: "22º BPM/M - 1ª Cia",
        call: "1369463199606247495"
    },
    "M-22106": {
        modelo: "Spin 2023",
        opm: "22º BPM/M - 1ª Cia",
        call: "1136387344275099719"
    },
    "M-22107": {
        modelo: "Trailblazer 2023",
        opm: "22º BPM/M - 1ª Cia",
        call: "1299827039922294848"
    },
    "M-22108": {
        modelo: "Corola Cross 2023",
        opm: "22º BPM/M - 1ª Cia",
        call: "1226616811471110174"
    },
    "M-22109": {
        modelo: "Spin 2023",
        opm: "22º BPM/M - 1ª Cia",
        call: "1379549071244787723"
    },
    "M-22190 Base": {
        modelo: "Sprinter 2024",
        opm: "22º BPM/M - 1ª Cia",
        call: "1379549071244787723"
    },
    "15-87 POE": {
        modelo: "Spin 2023",
        opm: "22º BPM/M",
        call: "1153070830981500970"
    },
    "M-22014 FT": {
        modelo: "Trailblazer 2023",
        opm: "22º BPM/M - Cia FT",
        call: "1136387312016699522"
    },
    "M-22010 FT CMD": {
        modelo: "Trailblazer 2023",
        opm: "22º BPM/M - Cia FT",
        call: "1136063728018796574"
    },
    "M-22015 FT CMD": {
        modelo: "Trailblazer 2023",
        opm: "22º BPM/M - Cia FT",
        call: "1266559186108678145"
    },
    "M-22019 FT": {
        modelo: "Trailblazer 2023",
        opm: "22º BPM/M - Cia FT",
        call: "1270535843844460718"
    },
    "RPM": {
        modelo: "Honda XRE 300",
        opm: "22º BPM/M - 1ª Cia",
        call: "1328091910279266495"
    },
    "ROCAM": {
        modelo: "Triumph Tiger 800 XCx",
        opm: "22º BPM/M - Cia FT",
        call: "1328091933410857175"
    }
};


createCommand({
    name: "abrir",
    description: "Comandos de cautela",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "cautela",
            description: "Registrar cautela de viatura",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "militares",
                    description: "Informe os militares que irão utilizar a viatura.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "prefixo",
                    description: "Informe o prefixo da viatura.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                },
                {
                    name: "motivo",
                    description: "Informe o motivo da cautela.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                }
            ]
        }
    ],

    async run(interaction) {
        if (interaction.options.getSubcommand() !== "cautela") return;

        const militares = interaction.options.getString("militares")!;
        const prefixo = interaction.options.getString("prefixo")!;
        const motivo = interaction.options.getString("motivo")!;

        const dataHoraDiscord = time(new Date(), TimestampStyles.FullDateShortTime);

        const info = prefixoInfo[prefixo] || {
            modelo: "Não informado",
            opm: "Não informado",
            call: "Não informado"
        };

        const cautelaChannel = await interaction.guild.channels.fetch(dbchannels.channels_ids.cautelaChannelId);
        if (!cautelaChannel?.isTextBased()) return;

        await cautelaChannel.send({
            flags: ["IsComponentsV2"],
            components: [cautelaCreateContainer(interaction.member, militares, info.opm, info.modelo, prefixo, info.call, motivo, dataHoraDiscord)]
        })

        await createCautelaDocument(interaction.member.id, militares, info.opm, info.modelo, prefixo, info.call, motivo, dataHoraDiscord)

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Cautela da viatura ${prefixo} registrada com sucesso!.`
        });
    },

    async autocomplete(interaction) {
        const focused = interaction.options.getFocused(true);

        if (focused.name === "prefixo") {
            const sugestões = Object.keys(prefixoInfo)
                .filter(s => s.toLowerCase().includes(focused.value.toLowerCase()));

            return interaction.respond(
                sugestões.map(s => ({ name: s, value: s }))
            );
        } else if (focused.name === "motivo") {
            const sugestões = [
                "Patrulhamento",
                "Supervisão regional",
                "Supervisão de área",
                "Supervisão de subárea",
                "Serviço administrativo",
                "Transporte de pessoal"
            ].filter(s => s.toLowerCase().includes(focused.value.toLowerCase()));

            return interaction.respond(
                sugestões.map(s => ({ name: s, value: s }))
            );
        } 
    }
});
