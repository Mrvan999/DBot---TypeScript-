import { setupCreators } from "#base";

export const { createCommand, createEvent, createResponder } = setupCreators();

export const BOT_START_TIME = Date.now();