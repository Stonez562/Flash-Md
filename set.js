const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY09PZWtiMW1UejBUcy94N0tra04vcWdEbDFhek9CY0FJU2p4UFRNbEJHND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidWRCTDFOMVN6bFRGNkNqVk0xMy9rUklBRS9YcUpiNnROUGxwVHFtWm5GMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5SzRPTHl6VTBseng3NGtjUWJjZmRBYXp3eWs5NVZySDhrbjRRQndMUUZ3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnQWxIVnZlUDViSkR3b1Z5dldQUjZuSERIbjZyUGE1LzdpL0dhRXMzbDBZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdLMzU3RjVmL3ByRGtqMjlYTmQ0eFNkVjZ6eTZWd1FuVXpTbTBJMVFkVU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1XNFpzalY5NStPVm9hOUJRUjJHSTRWK2t2UmNoTk5OemJiaFNnRjc4QVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0RWL0ZCZnZkT1NQV09COFdabm50aEdEenM1Tm5KQW1UQVlxK0E1dGxFWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicVd3YUsreWpCK09XWnFJTCt4ejM2K1Z1U2hLVGRNcW9pZWl5TVZic1dnST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii92azd1L0hjekxvSTBBQWlmcDU3NkMvRFNsSk1scGFIOVI5Q0pXRlVGbHFpUWlkVmlzeklIaE10aEpnNmRiTElVeDI1MmRSWndtOHFPZHdlNDFzekNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE3LCJhZHZTZWNyZXRLZXkiOiJMTTdnZmw1MHVQQUp5bnN2b2ZvekU3L3I3TExOcm9LaW96S1NLRmZxdEdVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzUzNDE2NDM5M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTExQkI5QzBBQ0IxMjAxMTg3QyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIwODYwNzM0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJyWnBpNUpoWFNULTlXQk9TekwzcXNBIiwicGhvbmVJZCI6IjE2NmJlNTY2LWJlYjgtNDdkMi1hMTYwLTZmZGU3NTdkZWVjYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEcmpYdzI4UTRualY1SWtUbVlnazM5S05GcDA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibkQremhQbklhSVpUdWUrRzFzYlBvUW9RQmcwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJSOTZMRTdHIiwibWUiOnsiaWQiOiIyMzM1MzQxNjQzOTM6MjhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi76O/fHxfU2F2YWdlX3x876O/In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKenR4K1lIRUs2QXliUUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJBbHRSaGxYdTRVQW9pTjhkMHVNdm43M3M4R1hsM1B1cFdwWUh3R3RaanlnPSIsImFjY291bnRTaWduYXR1cmUiOiJRQU45Rmkwb20rV2w0dDZLNVRwTjgwdTBwYURqK0FXQmxnaHFHNW85VUhhNm51UzRGSGZraUtITVhOUENoT2RSU2I4SlFEUFNibnRvZGt5SVZiYlhBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiOE0yQmlPeG9OWGltc3dVU3k1OUMvbGt4YldRWHhqMFQ0aVBIcjNtVHorSHNKdnV3NjhLejZQNnpFaFFkWW5uZGlDc3hDNnRtWDR2UEpPb0FuYlNyQlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1MzQxNjQzOTM6MjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUUpiVVlaVjd1RkFLSWpmSGRMakw1Kzk3UEJsNWR6N3FWcVdCOEJyV1k4byJ9fV0sInBsYXRmb3JtIjoic21iaSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDg2MDczMX0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "savage",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "233534164393", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'savage',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
