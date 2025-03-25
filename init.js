const mongoose = require("mongoose");
const Chat = require("./models/chats.js");

main()
    .then(() =>
    {
      console.log("Connection Successfull");
    })

    .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const arr = [
    {
        from: "Nehagyg",
        to: "Aratttv",
        msg: "wetuvuvuyrtyu",
        created_at: new Date()
    },
    {
        from: "uvuvNeha",
        to: "Araugvuhvuv",
        msg: "wegvguvurtyu",
        created_at: new Date()
    },
    {
        from: "Ngvgvgveha",
        to: "Argvuvuav",
        msg: "wvuvuvuvertyu",
        created_at: new Date()
    },
    {
        from: "Neyyyyha",
        to: "Aravyyyyyy",
        msg: "weyyyyyrtyu",
        created_at: new Date()
    },
    {
        from: "yyyyyNeha",
        to: "Arayyyyyv",
        msg: "weryyyytyu",
        created_at: new Date()
    },
]

Chat.insertMany(arr);

