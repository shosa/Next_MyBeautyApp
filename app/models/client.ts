// models/client.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Client extends Model {
  public id!: number;
  public name!: string;
  public email?: string;
  public phone?: string;
}

Client.init({
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
  sequelize,
  tableName: 'clients',
  timestamps: false,
});

export default Client;
