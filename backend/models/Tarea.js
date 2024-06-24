import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Tarea = sequelize.define(
    "Tarea", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        culminado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        freezeTableName: true
    },     
);