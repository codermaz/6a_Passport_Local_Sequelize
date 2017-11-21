module.exports = (sequelize, DataTypes) => {

    return sequelize.define(
        'Account',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            accountType: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            freezeTableName: true,
            tableName: 'Account',
            timestamps: true,
            underscored: true
        }
    );
};