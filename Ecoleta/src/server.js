const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")

// configurar pasta public
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos  da minha aplicação
//pagina inicial
//req: Requisição
//res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "UM titulo"})
})

server.get("/create-point", (req, res) => {
    //req.query: query strings da nossa url
    //console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req,res) => {
    //req.body: O corpo do nosso formulario
    //console.log(req.body)

    //inserir dados no banco de dados
     //inserir dados na tabela
    const query =`
        INSERT INTO places (
            image, name, address, address2, state, city, items
        ) VALUES (?, ?, ?, ?, ?, ?, ? );
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no Cadastro!")
        }

        console.log("Cadastrado com Sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)

    //consultar os dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows) {
       if(err) {
           return console.log(err)
       }

       console.log("Aqui estão seus Registros")
       console.log(rows)
       
       return res.send("ok")
    })

   
})

server.get("/search-results", (req, res) => {

    const search = req.query.search 

    if(search == "") {
        //pesquisa vazia
         //mostrar a pagina html 
         return res.render("search-results.html", {total: 0})
    }

   //pegar  os dados do banco de dados 
    db.all(`SELECT * FROM places WHERE city LIKE'%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
    }
        const total = rows.length

        //mostrar a pagina html 
        return res.render("search-results.html", {places: rows, total: total})
    })
    
    })


//ligar o servidor
server.listen(3000)