const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://CooderDost_Rajan:uA37ID6S3leFXcZR@cluster0.vetrvjo.mongodb.net/");  // mongodb://127.0.0.1:27017/test
  console.log("db connected");           
}

// schema

const userSchema = new mongoose.Schema({
  username: String,
  email:String,
  password: String,

});

//step is compiling our schema into a Model.
const User = mongoose.model('User', userSchema);  // User act as a class, and 'User' act as collection of table in mongoDB


const server = express();

// middlewares
server.use(cors());
server.use(bodyParser.json());

// server.get('/demo', (req,res)=>{
//     console.log(req.body);
//     res.send('hello');
//     // res.json(req.body);
// })

// CRUD - Create
server.post("/demo", async(req, res) => {
    // yha (req.body) ko sirf bheja tha ... ise db me save v karna padega
    let user = new User();
    user.username = req.body.username; // req.body.username  --> ye .username aaya hai frontend(react) se
    user.password = req.body.password;
    user.email = req.body.email;

    // saving to database
    const doc = await user.save();
    console.log(doc);       // terminal pe print ho rha 
    res.json(doc);

//   console.log(req.body);
  // res.send('hello');
//   res.json(req.body);
});

server.get('/demo',async (req,res)=>{
    const docs = await User.find({});
    res.json(docs);
})

server.listen(8080, () => {
  console.log("server started");
});
