import http from "http";
import fs from "fs";//Necesario para ler o html
import path from "path"

const server = http.createServer((request, response) => {
  let filePath = request.url
  if (filePath === '/') {
    filePath = 'index.html'
  }
  filePath = `./${filePath}`
  const extname = path.extname(filePath)
  let contentType = 'text/html'
  switch (extname) {
    case '.css':
      contentType = 'text/css'
      break
  }
  response.writeHead(200, { 'Content-Type': `${contentType}; charset=UTF-8` })

  fs.readFile(filePath, (err, content) => {
    if (err) {
      return console.log(err)
    }
    response.write(content)
    return response.end()
  })
})

server.listen(3000, "localhost", err => {
    if(err) {
        return console.log("Ha habido un error:", err);
    }
    console.log("Servidor abierto en puerto 3000!");
});