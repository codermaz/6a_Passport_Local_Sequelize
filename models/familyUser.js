
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'FamilyUser',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: 'FamilyUser',
        }
    );
};