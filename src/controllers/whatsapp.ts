import { Client, LocalAuth } from "whatsapp-web.js";
import { generate } from "qrcode-terminal";

// client
const client = new Client({
    authStrategy: new LocalAuth()
});

// Generate
client.on('qr', (qr) => {
    generate(qr, {small: true});
});

client.initialize();


// API Function
const Api = async (req: any,res: any) => {
    let noHp = req.query.noHp;
    const pesan = req.query.pesan;

    try {
        const user = await client.isRegisteredUser(noHp);
        if (user) {
            client.sendMessage(noHp,pesan);
            res.json({ status: "Terkirim", pesan})
        } else {
            res.json({ status: "Gagal Terkirim", pesan: "Nomor Tidak Terdaftar"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", pesan: "error server"});
    }
}


// Export
export default {Api};
