import { db } from "../../database/firestore.js";

export async function getAusenteRoleId(): Promise<string> {
  const docRef = db.collection("roles").doc("others_roles");
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new Error("Documento 'others_roles' não encontrado.");
  }

  const data = doc.data();

  if (!data?.ausenteRoleId) {
    throw new Error("Campo 'ausenteRoleId' não encontrado no documento.");
  }

  return data.ausenteRoleId as string;
}

export async function getOuvidoriaDPRoleId(): Promise<string> {
  const docRef = db.collection("roles").doc("dp_roles");
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new Error("Documento 'dp_roles' não encontrado.");
  }

  const data = doc.data();

  if (!data?.ouvidoriadpRoleId) {
    throw new Error("Campo 'ausenteRoleId' não encontrado no documento.");
  }

  return data.ouvidoriadpRoleId as string;
}