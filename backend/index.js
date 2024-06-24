import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { sequelize } from "./database/database.js";
import { Usuario } from "./models/Usuario.js";
import { Proyecto } from "./models/Proyecto.js";
import { Tarea } from "./models/Tarea.js";
import { Autor } from "./models/Autor.js";


const app = express();
const port = 3080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

async function verificarConexion(){
    try{
        await sequelize.authenticate();
        console.log("Conexion satisfactoria con la BD");
        await sequelize.sync({force: true});
    } catch(error) {
        console.error("No se puede conectar a la BD", error);
    }
}

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

app.get("/usuarios", async function(req, res) {
    const listUsuarios = await Usuario.findAll();
    res.json(listUsuarios);
})

app.post("/usuarios", async function(req, res) {
    const data = req.body;
    if(data.codigo && data.nombre && data.edad){
        const usuarioCreado = await Usuario.create({
            codigo: data.codigo,
            nombre: data.nombre,
            edad: data.edad
        });
        res.status(201).json(usuarioCreado);
    } else {
        res.status(404).send("Faltan datos");
    };
})

app.delete("/usuarios/:id", async function(req, res) {
    const id = req.params.id;
    try {
        await Usuario.destroy({
            where: {
                id: id,
            }
        })
        res.send("usuario eliminado");
    } catch(error) {
        console.log("Ocurrio error: ", error);
        res.status(400).send("ocurrio un error");
    }
})

app.put("/usuarios/:id", async function(req, res) {
    const id = req.params.id;
    const data = req.body;

    if(data.codigo && data.nombre && data.edad){
        const usuarioModificado = await Usuario.update({
            codigo: data.codigo,
            nombre: data.nombre,
            edad: data.edad,
        }, {
            where: {
                id: id
            }
        });
        res.json(usuarioModificado)
    } else {
        res.status(400).send('Faltan datos');
    }
})

app.post("/proyecto", async function(req, res) {
    const data = req.body;

    if(data.nombre){
        const proyCreado = await Proyecto.create({
            nombre: data.nombre,
            encargado: data.encargado,
            descripcion: data.descripcion
        })
        res.json(proyCreado);
    } else {
        res.status(400).send("Faltan datos");
    }    
})

app.post("/proyecto/:id/tarea", async function(req, res) {
    const data = req.body;
    const idProy = req.params.id;

    const tareaCreada = await Tarea.create({
        nombre: data.nombre
    })

    const proyecto = await Proyecto.findOne({where: {
        id: idProy
    }})

    await proyecto.addTarea(tareaCreada);
    const result = await Tarea.findOne({
        where: {
            id: tareaCreada.id,
        }
    })

    res.status(201).json(tareaCreada);
})

app.get("/proyecto/:id", async function(req, res) {
    const idProy = req.params.id;
    try{
        const data = await Proyecto.findOne({
            where: {
                id: idProy
            },
            include: Tarea
        });
    
        res.status(201).json(data);
    } catch(error) {
        res.status(404).send("Hubo un error em la BD");
    }
})

app.post("/publicaciones", function(req, res) {
    const data = req.body;
    if(data && data.titulo && data.contenido && data.autor){
        const nuevoId = publicaciones.length + 1;
        const nuevaPublicacion = crearPublicacion(nuevoId, data.titulo, data.contenido, data.autor);
        publicaciones.push(nuevaPublicacion);
        res.json(nuevaPublicacion);
        console.log(nuevaPublicacion);
    } else {
        res.status(404).send("Faltan datos")
    };
})

app.put("/publicaciones/:id", function(req, res) {
    const id = req.params.id;
    const data = req.body;

    if(data.titulo && data.contenido && data.autor){
        const publicacion = publicaciones.find((pub) => pub.id == id);
        if(publicacion) {
            publicacion.titulo = data.titulo;
            publicacion.contenido = data.contenido;
            publicacion.autor = data.autor;
            res.json(publicacion);
        } else {
            res.status(404).send("no se encontró la publicacion");
        }
    } else {
        res.status(404).send("faltan datos");
    }
})

app.delete("/publicaciones/:id", function(req, res){
    const id = req.params.id;
    const publicacion =  publicaciones.find((pub) => pub.id == id);
    if(publicacion) {
        publicacion.estado = "eliminado";
        res.json(publicacion);
    } else {
        res.status(404).send("no se encontró la publicacion");
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
    verificarConexion();
})





