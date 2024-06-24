import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Libro = sequelize.define(
    "Libro", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING
        },
        fecha_publicacion: {
            type: DataTypes.DATE
        },
        isbn: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    },     
);

