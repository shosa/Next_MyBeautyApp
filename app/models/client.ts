// app/models/client.ts
import { DataTypes } from 'sequelize';
import sequelize from '../db';

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'clients',
});

export default Client;
