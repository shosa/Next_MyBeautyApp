// models/appointment.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Client from './client';
import Service from './service';

class Appointment extends Model {
  public id!: number;
  public client_id!: number;
  public service_id!: number;
  public appointment_datetime!: Date;
  public notes?: string;

  public readonly createdAt!: Date;
}

Appointment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  appointment_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'appointments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

Appointment.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });
Appointment.belongsTo(Service, { foreignKey: 'service_id', as: 'service' });

export default Appointment;
