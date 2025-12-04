import { Guild } from "discord.js";
import { db } from "../../database/firestore.js";

export async function createDiscordName(memberId: string, guild: Guild): Promise<string> {
    const docRef = db.collection("militares").doc(memberId);
    const doc = await docRef.get();

    if (!doc.exists) {
        console.log(`Nenhum documento encontrado para memberId: ${memberId}`);
        return "";
    }

    const data = doc.data();

    if (!data) {
        console.log("Os dados do documento estão vazios");
        return "";
    }

    const members = await guild.members.fetch();

    const regex = /^(\d{1,3})\s\|/;

    let highestXX = 0;

    for (const [, member] of members) {
        const nick = member.nickname;
        if (!nick) continue;

        const match = nick.match(regex);
        if (!match) continue;

        const number = parseInt(match[1]);

        if (number === 190 || number === 193) continue;

        if (!isNaN(number) && number > highestXX) {
            highestXX = number;
        }
    }

    const newXX = highestXX + 1;

    const target = await guild.members.fetch(memberId).catch(() => null);
    if (!target) {
        console.log("Não foi possível encontrar o membro alvo.");
        return "";
    }

    const actualNickname = target.nickname ?? target.user.displayName;

    let robloxNickname =
        actualNickname.split("| ")[1]?.trim() ?? actualNickname.trim();

    let newNickname = `${newXX.toString().padStart(2, "0")} | ${data.patente} ${data.nome.trim().split(/\s+/)[1] ?? data.nome.trim()} (${robloxNickname})`;

    if (newNickname.length > 32) {
        const excesso = newNickname.length - 32;
        robloxNickname = robloxNickname.substring(0, robloxNickname.length - excesso);
        newNickname = `${newXX.toString().padStart(2, "0")} | ${data.patente} ${data.nome.trim().split(/\s+/)[1] ?? data.nome.trim()} (${robloxNickname})`;
    }

    return newNickname;
}
