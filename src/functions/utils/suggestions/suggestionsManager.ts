import fs from "fs";
import path from "path";

interface Suggestion {
  messageId: string;
  userId: string;
}

interface Constants {
  colors: Record<string, string>;
  roles: Record<string, string>;
  channels: Record<string, string>;
  suggestions: Record<string, Suggestion>;
}

const constantsPath = path.resolve("constants.json");

function getConstants(): Constants {
  const raw = fs.readFileSync(constantsPath, "utf-8");
  return JSON.parse(raw) as Constants;
}

function saveConstants(constants: Constants) {
  fs.writeFileSync(constantsPath, JSON.stringify(constants, null, 2), "utf-8");
}

export function addSuggestion(messageId: string, userId: string): number {
  const constants = getConstants();
  const suggestions = constants.suggestions;

  const keys = Object.keys(suggestions).map(Number);
  const nextNumber = keys.length === 0 ? 0 : Math.max(...keys) + 1;

  suggestions[nextNumber.toString()] = {
    messageId,
    userId
  };

  saveConstants(constants);

  return nextNumber;
}

export function updateSuggestionMessageId(number: number, messageId: string) {
  const constants = getConstants();
  const suggestion = constants.suggestions[number.toString()];

  if (suggestion) {
    constants.suggestions[number.toString()] = {
      ...suggestion,
      messageId
    };
    saveConstants(constants);
  }
}

export function getSuggestion(number: number): Suggestion | null {
  const constants = getConstants();
  const suggestion = constants.suggestions[number.toString()];
  return suggestion ?? null;
}
