import { saveToSFTP } from "../file_manager/storageMethods.js";



export async function sftpUpload(req, res, next) {
    try {
        console.log("🔍 Request Body:", req.body);
        console.log("🔍 Request Files:", req.files);

        if (!req.files || !req.files.file) {
            return res.badInput("No file uploaded");
        }

        const { destination } = req.body;
        if (!destination) {
            return res.badInput("No destination provided");
        }

        // const destination = ""

        const file = req.files.file;

        console.log(`🚀 Uploading file ${file.name} to SFTP (direct upload)...`);

        // Datei direkt auf SFTP hochladen
        await saveToSFTP(file.data, file.name, destination);

        console.log(`✅ File uploaded successfully to SFTP: ${destination}/${file.name}`);

        res.success({ message: "File uploaded successfully to SFTP." });

    } catch (e) {
        console.error("❌ SFTP Upload Error:", e);
        next(e)
    }
}


/*
Test Controller for queue
 */

// export async function sftpUpload(req, res, next) {
//     try {
//         console.log("🔍 Request Body:", req.body);
//         console.log("🔍 Request Files:", req.files);
//
//         if (!req.files || !req.files.file) {
//             return res.badInput("No file uploaded");
//         }
//
//         // const { destination } = req.body;
//         // if (!destination) {
//         //     return res.badInput("No destination provided");
//         // }
//
//         const file = req.files.file;
//
//         console.log(`📥 Adding file ${file.name} to queue for upload...`);
//
//         // Datei als Buffer zur Warteschlange hinzufügen
//         await addToQueue({ fileData: file.data, fileName: file.name, destination: "" });
//
//         res.success({ message: "File added to queue for SFTP upload." });
//
//     } catch (e) {
//         console.error("❌ SFTP Upload Error:", e);
//         next(e);
//     }
// }
