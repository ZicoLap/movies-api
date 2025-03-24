import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_FILE_NAME,

});

export async function initDB() {
    try {
        // await sequelize.authenticate();
        // console.log("Connection has been established successfully.");
        await sequelize.sync();
        console.log("Datebase has been run successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}


export default sequelize;