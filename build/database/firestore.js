import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
// Caminho para a chave
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath = path.resolve(__dirname, "./firestore.key.json");
// Carrega a chave
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}
// Exporta Firestore
export const db = admin.firestore();
export { admin };
