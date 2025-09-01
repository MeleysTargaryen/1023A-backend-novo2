Banco de Dados III
// 1 - Criando o banco de dados ifms
use("ifms")
// 2 - Criando uma coleção chamada curso
db.createCollection("curso")

db.curso.insertMany([
    {
        nome: "Informática",
        professores:[
            {
                nome:"Tere",
                emails:["guilherme.terenciani@ifms.edu.br","guilhermeterenciani@gmail.com"],
                telefone:"67996238976",
                formacao:"Mestrando"

            },
            {
                nome:"Danilo",
                emails:["danilo.mickuki@ifms.edu.br","danilo.mickuki@gmail.com"],
                telefone:"67996568976",
                formacao:"Mestre"

            }
        ],
        estudantes:[
            {
                cpf:"123123123",
                idade:17,
                telefones:["67996238975","67996238989"],
                email:"thiago@ifms.edu.br"

            },
            {
                cpf:"123123124",
                idade:17,
                telefones:["67996238975","67996238989"],
                email:"estudante2@ifms.edu.br"

            }
        ]
    },
    {
        nome: "Agricultura",
        professores:[
            {
                nome:"Tere",
                emails:["guilherme.terenciani@ifms.edu.br","guilhermeterenciani@gmail.com"],
                telefone:"67996238976",
                formacao:"Mestrando"

            },
            {
                nome:"Danilo",
                emails:["danilo.mickuki@ifms.edu.br","danilo.mickuki@gmail.com"],
                telefone:"67996568976",
                formacao:"Mestre"

            }
        ],
        estudantes:[
            {
                cpf:"123123123",
                idade:17,
                telefones:["67996238975","67996238989"],
                email:"thiago@ifms.edu.br"

            },
            {
                cpf:"123123124",
                idade:17,
                telefones:["67996238975","67996238989"],
                email:"estudante2@ifms.edu.br"

            }
        ]
    }
    
])

//4 - listando todos os cursos cadastrados
use("ifms")
db.curso.find()

//5 - listando apenas os cursos de informática
use("ifms")
db.curso.find({nome:"Informática"})

// Excluindo a coleção curso
