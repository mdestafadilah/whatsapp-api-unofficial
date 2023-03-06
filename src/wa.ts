import { Client, LocalAuth, LegacySessionAuth } from "whatsapp-web.js";
import { generate } from "qrcode-terminal";
import fs from 'fs';

type createSessionOptions = {
	sessionId: string;
};

export async function createSession(options: createSessionOptions) {
	const { sessionId } = options;

	// client
	const client = new Client({
		authStrategy: new LocalAuth(),
		puppeteer: {
			ignoreDefaultArgs: ["--disable-extensions"],
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		},
	});

	// Generate
	client.on("qr", (qr) => {
		generate(qr, { small: true });
	});

	//teste if script is working. User send !ping e script return pong
	client.on("message", (msg) => {
		if (msg.body == "!ping") {
			msg.reply("pong");
		}
	});

	client.initialize();

	//Closing correcily using CTRL+C
	process.on("SIGINT", async () => {
		console.log("(SIGINT) Shutting down...");
		await client.destroy();
		console.log("client destroyed");
		process.exit(0);
	});
}

const SESSION_FILE_PATH = './session.json';

export async function listSessions() {

    // Load the session data if it has been previously saved
    let sessionData: any;
    if(fs.existsSync(SESSION_FILE_PATH)) {
        sessionData = require(SESSION_FILE_PATH);
    }

    const client = new Client({
        authStrategy: new LegacySessionAuth({
            session: sessionData // saved session object
        })
    });

    // Save session values to the file upon successful auth
    client.on('authenticated', (session) => {
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
            if (err) {
                console.error(err);
            }
        });
    });
    
}

export async function init() {
	// TODO
}
