
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
            'created_at': {
                type: DataTypes.DATE(3),
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
            },
            'updated_at': {
                type: DataTypes.DATE(3),
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
            }
        },
        {
            freezeTableName: true,
            tableName: 'FamilyUser',
            timestamps: true,
            underscored: true
        }
    );
};