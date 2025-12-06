import { ComponentType, LabelBuilder, ModalBuilder, TextInputStyle } from "discord.js";
export async function registroSendModal() {
    return new ModalBuilder({
        custom_id: "registro/modal/pag1",
        title: "Registro Estatístico - PMESP",
        components: [
            new LabelBuilder({
                label: "Nome do Personagem",
                description: "Digite o nome do seu personagem. (César Nero, Dante Oliveira Neves...)",
                component: {
                    type: ComponentType.TextInput,
                    style: TextInputStyle.Short,
                    custom_id: "nome",
                    required: true
                }
            }),
            new LabelBuilder({
                label: "Registro Geral do Personagem",
                description: "Digite o ID do seu personagem. (1243, 5464, 4323...)",
                component: {
                    type: ComponentType.TextInput,
                    style: TextInputStyle.Short,
                    custom_id: "rg",
                    required: true
                }
            }),
            new LabelBuilder({
                label: "Patente do Personagem",
                description: "Selecione sua graduação/posto do seu personagem.",
                component: {
                    type: ComponentType.StringSelect,
                    custom_id: "patente",
                    required: true,
                    options: [
                        { label: "Coronel PM", value: "CEL PM" },
                        { label: "Tenente-Coronel PM", value: "TC PM" },
                        { label: "Major PM", value: "MAJ PM" },
                        { label: "Capitão PM", value: "CAP PM" },
                        { label: "1º Tenente PM", value: "1º TEN PM" },
                        { label: "2º Tenente PM", value: "2º TEN PM" },
                        { label: "Aspirante a Oficial PM", value: "ASP PM" },
                        { label: "Subtenente PM", value: "SUBTEN PM" },
                        { label: "1º Sargento PM", value: "1º SGT PM" },
                        { label: "2º Sargento PM", value: "2º SGT PM" },
                        { label: "3º Sargento PM", value: "3º SGT PM" },
                        { label: "Cabo PM", value: "CB PM" },
                        { label: "Soldado PM", value: "SD PM" },
                    ]
                }
            }),
            new LabelBuilder({
                label: "OPM do Personagem",
                description: "Selecione a OPM do seu personagem.",
                component: {
                    type: ComponentType.StringSelect,
                    custom_id: "opm",
                    required: true,
                    options: [
                        { label: "Gabinente do Comando Geral", value: "Gabinente do Comando Geral", },
                        { label: "Estado-Maior da Polícia Militar", value: "Estado-Maior da Polícia Militar", },
                        { label: "Corregedoria da Polícia Militar", value: "Corregedoria da Polícia Militar", },
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
    });
}
