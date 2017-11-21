let Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');

// initialize database connection
const sequelize = new Sequelize('webapp', 'userMA3', 'passMA3', {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true,
        timestamps: false,
        underscored: false
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

// drop all tables in the database 'webapp'
sequelize.drop();

// const FamilyUser = sequelize.import('../models/familyUser');
let FamilyUser = sequelize.import('familyUser');
let Account = sequelize.import('account');
let FamilyUserAccount = sequelize.define('familyUserAccount', {
    accountType: DataTypes.STRING,
    // Timestamps
    createdAt: {
        type: DataTypes.DATE(3),
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    updatedAt: {
        type: DataTypes.DATE(3),
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    }
})
;


FamilyUser.belongsToMany(Account, {through: FamilyUserAccount});
Account.belongsToMany(FamilyUser, {through: FamilyUserAccount});

sequelize.sync()
    .then((err) => {
        if (err) {
            console.log('An error occured while creating table');
        } else {
            console.log('Tables created successfully');
        }
    });

// export connection
module.exports.sequelize = sequelize;