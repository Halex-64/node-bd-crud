//Mapa de leitura a linha de comentário em cima explica o comando abaixo
//Importa o módulo express para criar o servidor
import express from "express";
//Importa módulo bodyParser para processar corpos de requisições
import bodyParser from "body-parser";
//Importa o módulo msnodesql.v8 para concectar ao banco dados SQL SERVER
import sql from "msnodesqlv8";
//Cria uma Instância do Aplicativo Express
const app = express();
//Configura o aplicativo para usar o bodyParser na análise de Json.
app.use(bodyParser.json());
//Define a porta na qual o servidor vai se conectar
const PORT = 3000;
//Define a string de conexão para o banco de dados
const connectionString = "server=DSN1191061623;Database=carros_db;Trusted_Connection=Yes;Driver={Sql Server Native Client 11.0}";
//Leitura
//Define uma Rota GET para ler todos os registros da tabela "carros"
app.get("/carros", (req, res) => {
    //Executa a consulta SQL  para selecionar os registros da tabela "carros"
    sql.query(connectionString, "SELECT * FROM carro", (erro, rows) => {
        //se houver um erro, retornar um status 500 e a mensagem de erro
        if (erro) {
            res.status(500).json("Erro Interno de Servidor");
            // retorna o status 200 e os dados selecionados
        } else {
            res.status(200).json(rows);
        }
    });
});

//Escrita
//Define uma rota post para inserir um novo registro na tabela "carro"
app.post("/carros", (req, res) => {
    //Extrai os valores de modelo e marca do corpo da requisição.
    const { modelo, marca } = req.body;
    //Executa a consulta sql para inserir um novo registro na tabela "carro"
    sql.query(
        connectionString,
        `INSERT INTO carro VALUES ('${modelo}', '${marca}')`,
        (erro, rows) => {
            if (erro) {
                //se houver um erro, retornar um status 500 e a mensagem de erro
                res.status(500).json("Erro Interno de Servidor");
            } else {
                // retorna o status 200 e os dados selecionados
                res.status(201).json("Cadastrado com sucesso!");
            }
        }
    );
});
//Definir a rota GET para ler um único registro da tabela "carro" com ID específica.
app.get("/carros/:id", (req, res) => {
    //Extrair um a ID dos parâmetros da URL
    const { id } = req.params;
    //Executar a consulta SQL para selecionar o registro da tabela "carro" com ID específica
    sql.query(connectionString, `SELECT * FROM carro WHERE id = ${id}`, (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno do Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});
//Atualizar Carro
//define uma rota PUT PARA ATUALIZAR UM REGISTRO NA TABELA "CARRO" com base no ID
app.put("/carros/:id",(req,res) => {
    //Extrai id dos parâmetros da URL
    const{id} = req.params;
    //Extrai os valores de modelo e marca do corpo da requisição
    const {modelo, marca} = req.body;
    sql.query(
        connectionString, 
        `UPDATE carro SET modelo = '${modelo}', marca = '${marca}' WHERE id = ${id};`,
        (erro, rows)=>{
            if(erro){
                res.status(500).json("Erro Interno de Servidor");
            }else{
                res.status(201).json("Atualizado com Sucesso");
            }
        }
    );
});

app.delete("/carros/:id", (req,res) => {
    const{id} = req.params;
    sql.query(
        connectionString,
        `DELETE FROM carro WHERE id=${id}`,
        (erro, rows) => {
            if(erro){
                res.status(500).json("Erro Interno de Servidor");
            }else{
                res.status(201).json("Excluído com Sucesso!");
            } 
        }    
    )
});

//Inicia o servidor na porta definida e impore uma mensage no console.
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
