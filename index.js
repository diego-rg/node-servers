import http from "http";
import fs from "fs";//Necesario para ler o html
import path from "path"
import mongoose from "mongoose";
import Sequelize from 'Sequelize'

//Mongoose/MongoDB
const conn = mongoose.connect('mongodb://localhost:27017/films');

const filmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
});

const Film = mongoose.model("Film", filmSchema);

const newFilm = new Film({
  title: "Star Wars",
  poster: "https://es.wikipedia.org/wiki/Star_Wars#/media/Archivo:Star_Wars_Logo.svg"
});

newFilm.save(err => {
  if(err){
    throw err;
  }
});

//Sequelize/PostgreSQL
const sequelize = new Sequelize('films', '', '', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

const Film2 = sequelize.define(
  'Film',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      field: 'id',
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      field: 'title'
    },
    poster: {
      type: Sequelize.STRING,
      field: 'poster'
    }
  },
  {
    freezeTableName: true
  }
)

Film2.sync({ force: true })
  .then(() => Film.create({
    title: 'Star Wars: The Last Jedi',
    poster: 'https://lumiere-a.akamaihd.net/v1/images/the-last-jedi-theatrical-poster-film-page_bca06283.jpeg?region=0%2C0%2C480%2C711'
  })
)

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