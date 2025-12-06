import { promises as fs } from "fs";
export async function suggestionsNumber() {
    const constantsData = JSON.parse(await fs.readFile("constants.json", "utf-8"));
    if (!constantsData.suggestions || !constantsData.suggestions.suggestionsnumber) {
        constantsData.suggestions.suggestionsnumber = "0";
    }
    let suggestionsnumber = parseInt(constantsData.suggestions.suggestionsnumber);
    suggestionsnumber++;
    constantsData.suggestions.suggestionsnumber = String(suggestionsnumber);
    await fs.writeFile("constants.json", JSON.stringify(constantsData, null, 4), "utf-8");
    return String(suggestionsnumber);
}
