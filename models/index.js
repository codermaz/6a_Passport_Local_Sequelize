let Sequelize = require('sequelize');

// let config    = require('config').database;  // we use node-config to handle environments
// let sequelize = new Sequelize(
//     config.name,
//     config.username,
//     config.password,
//     config.options
// );

// initialize database connectionÄ
const sequelize = new Sequelize ('webapp','userMA3', 'passMA3', {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


// load models
let models = [
    'Role',
    'User'
];
let UserRole;

//??? position of models
models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/models/' + model);
});

// describe relationships
(function(m) {
    UserRole = sequelize.define('../models/usersRoles', {
        status: DataTypes.STRING
    });
    m.Users.belongsToMany(Roles, {through: UsersRoles});
    m.Roles.belongsToMany(Users, {through: UsersRoles});

})(module.exports);

sequelize.sync().complete((err) => {
    if (err) {
        console.log('An error occured while creating table');
    } else {
        console.log('Tables created successfully');
    }
});

// export connection
module.exports.sequelize = sequelize;