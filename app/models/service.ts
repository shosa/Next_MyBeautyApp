// app/models/service.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';

interface ServiceAttributes {
    id: number;
    name: string;
    description?: string | null;
    duration: number;
}

interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> { }

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
    public id!: number;
    public name!: string;
    public description!: string | null;
    public duration!: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Service.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'services',
        timestamps: false,
    }
);

export default Service;
