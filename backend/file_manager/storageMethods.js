import SftpClient from "ssh2-sftp-client";
import dotenv from "dotenv";

dotenv.config();


export async function saveToSFTP(fileData, fileName, destination) {
    const sftp = new SftpClient();

    try {
        await sftp.connect({
            host: process.env.SFTP_HOST,
            port: process.env.SFTP_PORT,
            username: process.env.SFTP_USER,
            password: process.env.SFTP_PASS
        });

        // Basis-Pfad aus der .env
        const basePath = process.env.SFTP_BASE_PATH || "/"; // Falls nicht gesetzt, nutze root "/"

        // Nutzer gibt nur den Unterordner an
        const remotePath = `${basePath}/${destination}`.replace(/\/$/, ""); // Basis-Pfad + Unterordner
        const fullRemotePath = `${remotePath}/${fileName}`; // Finale Datei-Location

        console.log(`📂 Checking if folder exists: ${remotePath}`);

        // 🔹 Verzeichnis erstellen, falls es nicht existiert
        try {
            await sftp.mkdir(remotePath, true);
            console.log(`📁 Folder created or already exists: ${remotePath}`);
        } catch (err) {
            console.warn(`⚠️ Could not create folder (might already exist): ${remotePath}`);
        }

        console.log(`🚀 Uploading file ${fileName} to ${fullRemotePath}...`);

        // Datei direkt als Stream auf SFTP hochladen
        await sftp.put(Buffer.from(fileData), fullRemotePath);

        console.log(`✅ File uploaded successfully to ${fullRemotePath}`);
        await sftp.end();

    } catch (err) {
        console.error("❌ storageMethods: SFTP Error:", err);
        throw err;
    } finally {
        await sftp.end();
    }
}