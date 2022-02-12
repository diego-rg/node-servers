import http from "http";

const server = http.createServer((req, res) =>{
    res.writeHead(200, { "Content-Type": "application/json" });//Configuramos con headers que a resposta sea en json.
    res.write("<h1>Toma un encabezado en json!</h1>");
    res.end();
});

server.listen(3000, "localhost", err => {
    if(err) {
        return console.log("Ha habido un error:", err);
    }
    console.log("Servidor abierto en puerto 3000!");
});