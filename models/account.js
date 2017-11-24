module.exports = (sequelize, DataTypes) => {

    return sequelize.define(
        'Account',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true
            },
            accountType: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: 'Account'
        }
    );
};