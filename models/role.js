module.exports = (sequelize, DataTypes) => {

    let RoleModel = sequelize.define(
        'Role',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            role: {   // role_admin, role_user
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            freezeTableName: true,
            tableName: 'roleTable',
            timestamps : true,
            underscored: true
        }
    );
    return RoleModel;
};