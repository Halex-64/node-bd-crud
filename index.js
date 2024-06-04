import express from "express";
import bodyParser from "body-parser";
import sql from "msnodesqlv8";

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const connectionString = "server=DSN1191137658;Database=carros;Trusted_Connection=Yes;Driver={Sql Server Native Client 11.0}";

//Leitura
app.get("/carros", (req,res) => {
    sql.query(connectionString, "SELECT * FROM carros", (erro, rows) => {
        if(erro){
            res.status(500).json("Erro Interno de Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});

//Escrita
app.post("/carros", (req,res) => {
    const { modelo, marca } = req.body;
    sql.query(
        connectionString,
        `INSERT INTO carro VALUES ('${ modelo }', '${ marca }')`,
        (erro, rows) => {
            if(erro) {
                res.status(500).json("Erro Interno de Servidor");
            } else {
                res.status(201).json("Cadastrado com sucesso!");
            }
        }
    );
});

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));