import { db } from "../../database/firestore.js";

export interface ChannelsSchema {
  channels_ids: {
    logsChannelId: string;
    solicitacoesdpChannelId: string;
    bopmChannelId: string;
    talapreesChannelId: string;
    alteracoesouvidoriaChannelId: string;
    solicitacaofardamentoChannelId: string;
    registroestatisticoChannelId: string;
    suggestionsChannelId: string;
    ouvidoriaChannelId: string;
    cautelaChannelId: string;
  };
}

export async function loadChannelsFromDB(): Promise<ChannelsSchema> {
  const snapshot = await db.collection("channels").get();

  const result: any = {};

  snapshot.forEach((doc) => {
    result[doc.id] = doc.data();
  });

  return result as ChannelsSchema;
}

export const dbchannels: ChannelsSchema = await loadChannelsFromDB();

globalThis.dbchannels = dbchannels;