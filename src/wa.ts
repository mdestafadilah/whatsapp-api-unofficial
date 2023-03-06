import { Client, LocalAuth } from "whatsapp-web.js";
import { generate } from "qrcode-terminal";

// client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        ignoreDefaultArgs: ['--disable-extensions'],
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    }
});

// Generate
client.on('qr', (qr) => {
    generate(qr, {small: true});
});

//teste if script is working. User send !ping e script return pong
client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();

//Closing correcily using CTRL+C 
process.on('SIGINT', async () => {
    console.log('(SIGINT) Shutting down...');
    await client.destroy();
    console.log('client destroyed');
    process.exit(0);
});

export async function init() {
    // TODO
}