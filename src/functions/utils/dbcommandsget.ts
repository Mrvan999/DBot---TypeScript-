import { db } from "../../database/firestore.js";

export interface CommandsSchema {
  prefixo: {
    prefixo: string;
  };
  tag: {
    nome: string;
    descricao: string;
    uso: string;
    sinonimo: string | Array<string>;
    args: Array<string>;
  };
  tags: {
    nome: string;
    descricao: string;
    uso: string;
    sinonimo: string | Array<string>;
    args: Array<string>;
  };
  createtag: {
    nome: string;
    descricao: string;
    uso: string;
    sinonimo: string | Array<string>;
    args: Array<string>;
  };
  deletetag: {
    nome: string;
    descricao: string;
    uso: string;
    sinonimo: string | Array<string>;
    args: Array<string>;
  };
  uptime: {
    nome: string;
    descricao: string;
    uso: string;
    sinonimo: string | Array<string>;
    args: Array<string>;
  };
  botinfo: {
    nome: string;
    descricao: string;
    uso: string;
    sinonimo: string | Array<string>;
    args: Array<string>;
  };
}

export async function loadCommandsFromDB(): Promise<CommandsSchema> {
  const snapshot = await db.collection("commands").get();

  const result: any = {};

  snapshot.forEach((doc) => {
    result[doc.id] = doc.data();
  });

  return result as CommandsSchema;
}

export const dbcommands: CommandsSchema = await loadCommandsFromDB();

globalThis.dbcommands = dbcommands;