// sequelize.ts
import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('my_mybeautyapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    logging: true, // Disabilita il logging se non necessario
});

export default sequelize;
