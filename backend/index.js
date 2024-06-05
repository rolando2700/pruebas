
import express from "express";
import cors from "cors";

const app = express();
const port = 3080;

app.use(cors());

function crearPublicacion(id, titulo, contenido, autor){
    return{
        id: id,
        titulo: titulo,
        contenido: contenido,
        autor: autor
    }
}

const publicaciones = [
    crearPublicacion(1, "Mi 1er post", "contenido 1er post", "autor 01"),
    crearPublicacion(2, "Mi 2do post", "contenido 2do post", "autor 02"),
    crearPublicacion(3, "Mi 3er post", "contenido 3er post", "autor 03"),
    crearPublicacion(4, "Mi 4to post", "contenido 4to post", "autor 04")
]

app.get("/publicaciones", function(req, res) {
    res.json(publicaciones);
})

app.get("/publicaciones/:id", function(req, res) {
    const id = req.params.id;
    const publicacion =  publicaciones.find((pub) => pub.id == id);
    if (publicacion) {
        res.json(publicacion);
    } else {
        res.status(404).send("publicacion no encontrada");
    }

})

app.get("/publicaciones-url", function(req, res) {
    const id = req.query.id;
    const publicacion =  publicaciones.find((pub) => pub.id == id);
    if (publicacion) {
        res.json(publicacion);
    } else {
        res.status(404).send("publicacion no encontrada");
    }
    
})

app.listen(port, function(){
    console.log("Servidor escuchando en puerto " + port);
})





