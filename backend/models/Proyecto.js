import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Tarea } from "./Tarea.js";

export const Proyecto = sequelize.define(
    "Proyecto", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        encargado: {
            type: DataTypes.STRING
        },
        descripcion: {
            type: DataTypes.STRING
        },
    }, {
        freezeTableName: true
    },     
);


Proyecto.hasMany(Tarea, {
    foreignKey: "proyectoId",
    sourceKey: "id"
});

Tarea.belongsTo(Proyecto, {
    foreignKey: "proyectoId",
    targetKey: "id"
});