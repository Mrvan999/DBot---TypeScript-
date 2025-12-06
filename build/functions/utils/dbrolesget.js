import { db } from "../../database/firestore.js";
export async function loadRolesFromDB() {
    const snapshot = await db.collection("roles").get();
    const result = {};
    snapshot.forEach((doc) => {
        result[doc.id] = doc.data();
    });
    return result;
}
export const dbroles = await loadRolesFromDB();
globalThis.dbroles = dbroles;
