//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//iniciar/criar o objeto de banco de Dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objto de banco de dados para nossas operacoes


//db.serialize(() => {
    //criar uma tabela com comandos sql
   // db.run(`
     //   CREATE TABLE IF NOT EXISTS places (
       //     id INTEGER PRIMARY KEY AUTOINCREMENT,
         //   image TEXT,
           // name TEXT,
        //    address TEXT,
        //    address2 TEXT,
         //   state TEXT,
        //    city TEXT,
          //  items TEXT
      //  );
    //`)

    //inserir dados na tabela
    //const query =`
        //INSERT INTO places (
      //      image, name, address, address2, state, city, items
        //) VALUES (?, ?, ?, ?, ?, ?, ? );
    //`
    //const values = [
      //  "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80",        "Papersider",
      //  "Guilherme Gemballa, Jardim América",
      //  "Número 5383",
      //  "Santa Catarina",
      //  "Rio do sul",
      //  "Papeis e Papelão"
    //]

    //function afterInsertData(err) {
     //   if(err) {
       //     return console.log(err)
       // }

    //    console.log("Cadastrado com Sucesso")
    //    console.log(this)
    //}

    //db.run(query, values, afterInsertData)

    //consultar os dados da tabela
    //db.all(`SELECT * FROM places`, function(err, rows) {
     //  if(err) {
       //    return console.log(err)
    //   }

      // console.log("Aqui estão seus Registros")
      // console.log(rows)
  //  })

    //Deletar um dado da tabela
    //db.run(`DELETE FROM places WHERE id = ?`, [6], function(err) {
    //    if(err) {
    //        return console.log(err)
    //    }

    //    console.log("Registro deletado com sucesso")
    //})

//})

//