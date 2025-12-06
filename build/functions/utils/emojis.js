import { formatEmoji } from "discord.js";
import fs from "node:fs/promises";
;
const filepath = process.env.ENV === "dev" ? "emojis.dev.json" : "emojis.json";
const file = await fs.readFile(filepath, "utf-8");
const emojis = JSON.parse(file);
function extractId(input) {
    if (!input)
        return { id: null, type: "null" };
    if (/^\d+$/.test(input)) {
        return { id: input, type: "id" };
    }
    const urlRegex = /\/emojis\/(\d+)\.\w+$/;
    const urlMatch = input.match(urlRegex);
    if (urlMatch) {
        return { id: urlMatch[1], type: "url" };
    }
    const emojiRegex = /\p{Emoji}/u;
    if (emojiRegex.test(input)) {
        return { id: input, type: "emoji" };
    }
    return { id: null, type: "null" };
}
function transform(emojis, animated = false) {
    return Object.entries(emojis).reduce((obj, [name, value]) => {
        const { id, type } = extractId(value);
        const data = { animated, id };
        return {
            ...obj, [name]: {
                ...data,
                toString: () => type === "null" ? "" :
                    type === "emoji" ? id :
                        formatEmoji(id, animated),
                toJSON: () => type === "null" ? undefined :
                    type === "emoji" ? { name: id, animated, id: undefined } :
                        data,
            }
        };
    }, {});
}
;
export const icon = {
    ...transform(emojis.static),
    ...transform(emojis.animated, true)
};
