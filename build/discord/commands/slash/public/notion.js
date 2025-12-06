// import { createCommand } from "#base";
// import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
export {};
// createCommand({
//   name: "notion",
//   description: "Comandos de solicitação Notion",
//   type: ApplicationCommandType.ChatInput,
//   options: [
//     {
//       name: "puxar",
//       description: "Puxar dados do Notion",
//       type: ApplicationCommandOptionType.Subcommand,
//       options: [
//         {
//           name: "setor",
//           description: "Selecione o setor",
//           type: ApplicationCommandOptionType.String,
//           required: true,
//           autocomplete: true
//         },
//         {
//           name: "usuario",
//           description: "Usuário alvo (opcional)",
//           type: ApplicationCommandOptionType.User,
//           required: false
//         }
//       ]
//     },
//     {
//       name: "atualizar",
//       description: "Atualizar dados no Notion",
//       type: ApplicationCommandOptionType.Subcommand,
//       options: [
//         {
//           name: "page_id",
//           description: "ID da página/registro no Notion",
//           type: ApplicationCommandOptionType.String,
//           required: true,
//         },
//         {
//           name: "campo",
//           description: "Campo a ser alterado",
//           type: ApplicationCommandOptionType.String,
//           required: true,
//         },
//         {
//           name: "valor",
//           description: "Novo valor",
//           type: ApplicationCommandOptionType.String,
//           required: true,
//         }
//       ]
//     }
//   ],
//   async run(interaction) {
//       }
//   });
