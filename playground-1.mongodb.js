
use("IFMS");
db.createCollection('curso')

db.curso.insertOne({
    nome: ["informática", "agricultura"], 
    estudantes: [], 
    professores: [],
    linguagens:["Java","JavaScript","Python"]
})
use('banco1023a');


