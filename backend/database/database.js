import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("ejemplo_bd", "postgres", "postgres", {
    host: "localhost",
    dialect: "postgres"
})