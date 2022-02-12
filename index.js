import http from "http";

const server = http.createServer((req, res) =>{
    res.write("<h1>Toma un encabezado!</h1>");
    res.end();
});

server.listen(3000, "localhost", err => {
    if(err) {
        return console.log("Ha habido un error:", err);
    }
    console.log("Servidor abierto en puerto 3000!");
});