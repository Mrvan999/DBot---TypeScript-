import { ChannelsSchema } from "../functions/utils/dbchannelsget.ts";
import { CommandsSchema } from "../functions/utils/dbcommandsget.ts";
import type { RolesSchema } from "../functions/utils/dbrolesget.ts";

declare global {
  var dbroles: RolesSchema;
  var dbchannels: ChannelsSchema;
  var dbcommands: CommandsSchema;
}

export {};
