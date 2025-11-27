import { ComponentType, LabelBuilder, ModalBuilder, TextInputStyle } from "discord.js";

export function registroSendModal() {
    return new ModalBuilder({
        customId: "registro/modal/pag1",
        title: "Registro Estatístico - PMESP",
        components: [
            new LabelBuilder({
                label: "Nome do Personagem",
                description: "Digite o nome do seu personagem. (César Nero, Dante Oliveira Neves...)",
                component: {
                    type: ComponentType.TextInput,
                    style: TextInputStyle.Short,
                    custom_id: "registro/modal/pag1/nome",
                    required: true
                }
            }),
            new LabelBuilder({
                label: "Registro Geral do Personagem",
                description: "Digite o ID do seu personagem. (1243, 5464, 4323...)",
                component: {
                    type: ComponentType.TextInput,
                    style: TextInputStyle.Short,
                    custom_id: "registro/modal/pag1/rg",
                    required: true
                }
            }),
            new LabelBuilder({
                label: "OPM do Personagem",
                description: "Selecione a OPM do seu personagem.",
                component: {
                    type: ComponentType.StringSelect,
                    custom_id: "registro/modal/pag1/opm",
                    required: true,
                    options: [
                        { label: "Gabinente do Comando Geral", value: "Gabinente do Comando Geral", },
                        { label: "Estado-Maior da Polícia Militar", value: "Estado-Maior da Polícia Militar", },
                        { label: "Diretoria de Educação e Cultura", value: "Diretoria de Educação e Cultura", },
                        { label: "Diretoria de Pessoal", value: "Diretoria de Pessoal", },
                        { label: "Diretoria de Logística", value: "Diretoria de Logística", },
                        { label: "Diretoria de Saúde", value: "Diretoria de Saúde", },
                        { label: "Academia de Polícia Militar do Barro Branco", value: "Academia de Polícia Militar do Barro Branco", },
                        { label: "Escola Superior de Sargentos", value: "Escola Superior de Sargentos", },
                        { label: "Escola Superior de Soldados", value: "Escola Superior de Soldados", },
                        { label: "4º BPChq", value: "4º BPChq", },
                        { label: "4º BPChq - COE", value: "4º BPChq - COE", },
                        { label: "4º BPChq - GATE", value: "4º BPChq - GATE", },
                        { label: "22º BPM/M", value: "22º BPM/M", },
                        { label: "22º BPM/M - FT", value: "22º BPM/M - FT", },
                        { label: "22º BPM/M - 1ª CIA", value: "22º BPM/M - 1ª CIA" },
                    ]
                }
            })
        ]
    })
}
