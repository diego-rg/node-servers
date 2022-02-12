import http from "http";
import fs from "fs";//Necesario para ler o html

const server = http.createServer((req, res) =>{
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    const file = "./index.html";
    fs.readFile(file, (err, content) => {
        if (err) {
            return console.log("Ha habido un error!", err);
        }
        res.write(content);
        res.end();
    });
});

server.listen(3000, "localhost", err => {
    if(err) {
        return console.log("Ha habido un error:", err);
    }
    console.log("Servidor abierto en puerto 3000!");
});