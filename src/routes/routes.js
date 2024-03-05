const express = require("express")
const routes = express.Router()
const cadastroEmpresa = require("../models/cadastroEmpresa");
const cadastroProletario = require("../models/cadastroProletario");

const google = require("../models/AuthGoogle");



function isLoggedIn(req, res, next){
    req.user ? next() : res.redirect("/")
}

routes.get("/cadastroProletario", isLoggedIn , (req,res)=>{
    res.render("cadastro/proletario" , {user: req.user})
})

routes.post(`/cadastroProletario`, async (req,res)=>{

    newPessoa = {
        nome: req.body.nome,
        estado: req.body.estado,
        cidade: req.body.cidade,
        telefone: req.body.telefone,
        email: req.body.email,
        profissao: req.body.profissao,
        servicos: req.body.servicos
    }

    const User = new cadastroProletario({
        nome: newPessoa.nome,
        estado: newPessoa.estado,
        cidade: newPessoa.cidade,
        telefone: newPessoa.telefone,
        email: newPessoa.email,
        profissao: newPessoa.profissao,
        servicos: newPessoa.servicos,
    })

    cadastroProletario.findOne({email : newPessoa.email})
    .then(async(user)=>{
    if(!user){
        try {
          await User.save().then(() => {
            console.log("Usuário criado com sucesso, é noisssss :)")
            res.redirect("/users/trabalhar")
          })
        } catch (error) {
          console.log(error + " Deu erro meu guerreiro :(")
          }

    }else{
        console.log("usuario ja existe")
        res.render("cadastro/proletario")
        
    }
    
})

})

routes.get("/cadastroEmpresa", isLoggedIn , (req,res)=>{
        res.render("cadastro/empresa" , {user: req.user})
})


routes.post("/cadastroEmpresa", async (req,res)=>{

    if(req.body.nome.length < 6)
    {return console.log("o nome tem que ser maior"),  res.render("cadastro/empresa")}

    newEmpresa = {
        nome: req.body.nome,
        email: req.body.email,
        estado: req.body.estado,
        cidade: req.body.cidade,
        rua: req.body.rua,
        numero: req.body.numero,
        telefone: req.body.telefone,
        servicos: req.body.servicos
    }

    const User = new cadastroEmpresa({
        nome: newEmpresa.nome,
        email: newEmpresa.email,
        estado: newEmpresa.estado,
        cidade: newEmpresa.cidade,
        telefone: newEmpresa.telefone,
        rua: newEmpresa.rua,
        numero: newEmpresa.numero,
        servicos: newEmpresa.servicos,
    })

    cadastroEmpresa.findOne({email : newEmpresa.email})
    .then(async(user)=>{
    if(!user){
        try {
          await User.save().then(() => {
            console.log("Usuário criado com sucesso, é noisssss :)")
            res.redirect("/users/contratar")
          })
        } catch (error) {
          console.log(error + " Deu erro meu guerreiro :(")
          }

    }else{
        console.log("usuario ja existe")
        res.render("cadastro/empresa")

    }

    })
    

})

routes.get(`/contratar`, isLoggedIn, async (req,res)=>{
    
    await cadastroProletario.find()
    .then((proletario)=>{
        
        res.render("trabalharContratar/contratar", {user: req.user , proletario:proletario})
        
    })
    
})

routes.get(`/contratar/:id`, isLoggedIn, async (req,res)=>{

    function removerCaracteres( id = req.params.id){
        return id.replace(/[^a-zA-Z0-9]/g, "")
    }

    await cadastroProletario.findById({ _id : removerCaracteres()})
    .then((proletario)=>{

        res.render("trabalharContratar/viewProletario", {user: req.user , proletario:proletario })

    })
})


routes.get("/trabalhar", isLoggedIn, async (req,res)=>{

    await cadastroEmpresa.find()
    .then((empresa)=>{

        res.render("trabalharContratar/trabalhar", {user: req.user , empresa:empresa})

    })

})

routes.get(`/trabalhar/:id`, isLoggedIn, async (req,res)=>{
    
    function removerCaracteres2( id = req.params.id){
        return id.replace(/[^a-zA-Z0-9]/g, "")
    }

    await cadastroEmpresa.findById({ _id : removerCaracteres2() } || undefined)
    .then( (empresa)=>{

        res.render("trabalharContratar/viewEmpresa", {user: req.user , empresa:empresa})

    })
})

routes.get("/sobre", (req,res)=>{
    res.render("sobre/sobre" , {user: req.user} )
})

routes.get("/perfil", async (req,res)=>{

    if(req.user){
        await cadastroEmpresa.findOne({ email: req.user.email } || undefined)
        .then( async (empresa)=>{
            await cadastroProletario.findOne({email: req.user.email} || undefined)
            .then((proletario)=>{
                res.render("perfil/perfil", {user:req.user , empresa:empresa , proletario:proletario})
            })

        })
    }
})


module.exports = routes;
