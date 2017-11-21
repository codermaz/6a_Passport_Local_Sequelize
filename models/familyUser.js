
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'FamilyUser',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: function() {
                    return generateMyId()
                },
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
            // Timestamps
            createdAt: {
                type: DataTypes.DATE(3),
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
            },
            updatedAt: {
                type: DataTypes.DATE(3),
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
            }
        },
        {
            tableName: 'FamilyUser',
        }
    );
};