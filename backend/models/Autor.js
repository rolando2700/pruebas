import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Libro } from "./Libro.js";

export const Autor = sequelize.define(
    "Autor", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        apellido: {
            type: DataTypes.STRING
        },
    }, {
        freezeTableName: true
    },     
);

Libro.belongsToMany(Autor, {
    through: "Autor_Libro"
});

Autor.belongsToMany(Libro, {
    through: "Autor_Libro"
})