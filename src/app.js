require("dotenv").config({});

const mongoStore = require("connect-mongo");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
require("./AuthGoogleS");

const cadastroProletario = require("./models/cadastroProletario");
const cadastroEmpresa = require("./models/cadastroEmpresa");

const routes = require("./routes/routes");
const loginRegistro = require("./routes/loginRegistro");

////////Mensagens
const server = require("http").createServer(app)
const io = require("socket.io")(server)

let messages = [];

io.on("connection", socket =>{
    console.log(`socket conectado: ${socket.id}`)

    socket.on("sendMessage", data =>{
        messages.push(data)
        socket.broadcast.emit("receivedMessage", data)
    })
    
    socket.emit("previousMessage", messages)

});

////Conectar ao mongo
let DB_USER = process.env.name;
let DB_PASSWORD = process.env.password;


let DB_CONNECTLINK = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.rcorqm3.mongodb.net/MyProjectOFC?retryWrites=true&w=majority`;

///Servidor mongo e server-local
mongoose.connect(DB_CONNECTLINK)
.then(() => {
    console.log('Mongo funcionando, só agradece :P')
})
.catch((err) => {
    console.log(err + " Deu erro meu irmão pqp")
});

//Session
app.use(session({
    secret: "random secret key",
    cookie: {
        maxAge: 60000 * 26 * 24,
    },
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: DB_CONNECTLINK
    }),
    resave: true,
}));

////passport
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

///Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

////public
app.use(express.static(path.join(__dirname, 'public')));

///EJS
app.set("view engine", "ejs");
app.set ('views', path.join (__dirname, 'views'))

///Rotas
app.use("/auth", loginRegistro)
app.use("/users", routes)

app.get("/", async (req, res) => {

    if(!req.user){
        res.render("login/login", {user: req.user})
    }else{
        await cadastroEmpresa.findOne({ email: req.user.email } || undefined)
        .then( async (empresa)=>{
            await cadastroProletario.findOne({email: req.user.email} || undefined)
            .then((proletario)=>{
                res.render("index", {user:req.user , empresa:empresa , proletario:proletario})
            })

        })
    }

});


app.get("/login", (req, res) => {
    res.render("login/login", {user:req.user})
});

app.get("/chatAll", (req,res)=>{
    res.render("chatAll", {user: req.user})
})

server.listen(8080, () => { console.log("[SERVER] Servidor rodando.") });
