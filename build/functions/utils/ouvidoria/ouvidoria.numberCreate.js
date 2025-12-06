import { promises as fs } from "fs";
export async function ouvidoriaCorregNumber() {
    const constantsData = JSON.parse(await fs.readFile("constants.json", "utf-8"));
    if (!constantsData.ouvidoriapmesp || !constantsData.ouvidoriapmesp.ouvidoriacorregnumber) {
        constantsData.ouvidoriapmesp.ouvidoriacorregnumber = "0";
    }
    let ouvidoriacorregnumber = parseInt(constantsData.ouvidoriapmesp.ouvidoriacorregnumber);
    ouvidoriacorregnumber++;
    constantsData.ouvidoriapmesp.ouvidoriacorregnumber = String(ouvidoriacorregnumber);
    await fs.writeFile("constants.json", JSON.stringify(constantsData, null, 4), "utf-8");
    return ouvidoriacorregnumber;
}
export async function ouvidoriaCorregNumberMinus() {
    const constantsData = JSON.parse(await fs.readFile("constants.json", "utf-8"));
    if (!constantsData.ouvidoriapmesp || !constantsData.ouvidoriapmesp.ouvidoriacorregnumber) {
        constantsData.ouvidoriapmesp.ouvidoriacorregnumber = "0";
    }
    let ouvidoriacorregnumber = parseInt(constantsData.ouvidoriapmesp.ouvidoriacorregnumber);
    ouvidoriacorregnumber--;
    constantsData.ouvidoriapmesp.ouvidoriacorregnumber = String(ouvidoriacorregnumber);
    await fs.writeFile("constants.json", JSON.stringify(constantsData, null, 4), "utf-8");
}
export async function ouvidoriaDPNumber() {
    const constantsData = JSON.parse(await fs.readFile("constants.json", "utf-8"));
    if (!constantsData.ouvidoriapmesp || !constantsData.ouvidoriapmesp.ouvidoriadpnumber) {
        constantsData.ouvidoriapmesp.ouvidoriadpnumber = "0";
    }
    let ouvidoriadpnumber = parseInt(constantsData.ouvidoriapmesp.ouvidoriadpnumber);
    ouvidoriadpnumber++;
    constantsData.ouvidoriapmesp.ouvidoriadpnumber = String(ouvidoriadpnumber);
    await fs.writeFile("constants.json", JSON.stringify(constantsData, null, 4), "utf-8");
    return ouvidoriadpnumber;
}
export async function ouvidoriaDPNumberMinus() {
    const constantsData = JSON.parse(await fs.readFile("constants.json", "utf-8"));
    if (!constantsData.ouvidoriapmesp || !constantsData.ouvidoriapmesp.ouvidoriadpnumber) {
        constantsData.ouvidoriapmesp.ouvidoriadpnumber = "0";
    }
    let ouvidoriadpnumber = parseInt(constantsData.ouvidoriapmesp.ouvidoriadpnumber);
    ouvidoriadpnumber--;
    constantsData.ouvidoriapmesp.ouvidoriadpnumber = String(ouvidoriadpnumber);
    await fs.writeFile("constants.json", JSON.stringify(constantsData, null, 4), "utf-8");
    return ouvidoriadpnumber;
}
export async function ouvidoriaEMNumber() {
    const constantsData = JSON.parse(await fs.readFile("constants.json", "utf-8"));
    if (!constantsData.ouvidoriapmesp || !constantsData.ouvidoriapmesp.ouvidoriaemnumber) {
        constantsData.ouvidoriapmesp.ouvidoriaemnumber = "0";
    }
    let ouvidoriaemnumber = parseInt(constantsData.ouvidoriapmesp.ouvidoriaemnumber);
    ouvidoriaemnumber++;
    constantsData.ouvidoriapmesp.ouvidoriaemnumber = String(ouvidoriaemnumber);
    await fs.writeFile("constants.json", JSON.stringify(constantsData, null, 4), "utf-8");
    return ouvidoriaemnumber;
}
export async function ouvidoriaEMNumberMinus() {
    const constantsData = JSON.parse(await fs.readFile("constants.json", "utf-8"));
    if (!constantsData.ouvidoriapmesp || !constantsData.ouvidoriapmesp.ouvidoriaemnumber) {
        constantsData.ouvidoriapmesp.ouvidoriaemnumber = "0";
    }
    let ouvidoriaemnumber = parseInt(constantsData.ouvidoriapmesp.ouvidoriaemnumber);
    ouvidoriaemnumber--;
    constantsData.ouvidoriapmesp.ouvidoriaemnumber = String(ouvidoriaemnumber);
    await fs.writeFile("constants.json", JSON.stringify(constantsData, null, 4), "utf-8");
    return ouvidoriaemnumber;
}
