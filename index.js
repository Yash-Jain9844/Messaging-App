const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

main()
    .then(() =>
    {
      console.log("Connection Successfull");
    })

    .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// let chat1 = new Chat({
//     from: "Neha",
//     to: "Arav",
//     msg: "wertyu",
//     created_at: new Date()
// })

// chat1.save()
// .then((res)=>
//     {
//       console.log(res);
//     })

//     .catch((err) => console.log(err));

app.get("/chats",async (req,res)=>
{
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
});

app.listen(8080,()=>
{
    console.log("Listening");
});

app.get("/",(req,res)=>
    {
        res.send("Hello there");
    });

app.get("/chats/new",(req,res)=>
{

    res.render("new.ejs");
})
  
app.post("/chats",(req,res)=>
{
    let {from,to,msg} = req.body;
    let newchat = new Chat({
        from: from,
        to : to,
        msg : msg,
        created_at : new Date()
    });
    newchat.save();
    res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req,res)=>
{
        let {id} = req.params;
        let chat = await Chat.findById(id);
        console.log(chat);
        res.render("edit.ejs",{chat});
});
app.put("/chats/:id",async (req,res)=>
{
    let {id} = req.params;
    let {msg: newmsg} = req.body;
    let upchat = await Chat.findByIdAndUpdate(id,{msg : newmsg},{runValidators: true});
    res.redirect("/chats");
}
 );
 app.delete("/chats/:id", async (req,res)=>
{
    let {id} = req.params;
    let deleredchat = await Chat.findByIdAndDelete(id);
    console.log(deleredchat);
    res.redirect("/chats");
})

