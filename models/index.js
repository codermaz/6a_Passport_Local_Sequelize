var Sequelize = require('sequelize');
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
        timestamps: true,
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
// sequelize.drop();

// const FamilyUser = sequelize.import('../models/familyUser');
var FamilyUser = sequelize.import('familyUser');
var Account = sequelize.import('account');
var FamilyUserAccount = sequelize.define('familyUserAccount', {
    accountType: DataTypes.STRING,
});
// // Timestamps
//     createdAt: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//         // sequelize.literal('CURRENT_TIMESTAMP(3)'),
//     },
//     updatedAt: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//         // sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
//     }

FamilyUser.belongsToMany(Account, {through: FamilyUserAccount});
Account.belongsToMany(FamilyUser, {through: FamilyUserAccount});

sequelize.sync()
    .then(() => {
        console.log('Tables created successfully.');
    })
    .catch(err => console.log(err));


function randomIntInclusive(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var randPerson = "person" + randomIntInclusive(1, 1000);

var user = FamilyUser.build({
    username: randPerson,
    password: randomIntInclusive(1, 1000) + randPerson,
    email: randPerson + '@gmx.de'
});

// to save >> POST
saveUser = () => {
    FamilyUser
        .create({
            username: user.username,
            password: randomIntInclusive(1, 1000) + randPerson,
            email: randPerson + '@gmx.de'
        })
        .then(data => {
            if (data) {
                console.log(`User inserted:  \n\t Username: ${data.username} & email: ${data.email}`);
            } else {
                console.log('Error in inserting');
            }
        })
        .catch(err => console.log(err));
};
saveUser(user);

// to read >> GET
findUsername = (user) => {
    FamilyUser
        .find({
            where: {
                username: user.userToFind
            }
        })
        .then((data) => {
            if (data) {
                console.log(`User found: \n\t Username: ${data.username} & Email: ${data.email}`);
                return data;
            }
            else {
                console.log('User cannot be found!')
            }
        })
        .catch(err => console.log(err));
};
findUsername({userToFind: "person201"});

// to update >> PUT
updateUsername = (user) => {
    FamilyUser
        .find({where: {username: user.userToUpdate}})
        .then(data => {
            if (!data) {
                console.log('User cannot be found!')
            }
            else {
                console.log('User found: ');
                console.log(`Username: ${data.username} & Email: ${data.email}`);
                data
                    .updateAttributes({
                        password: 'updated112'
                    })
                    .then((dataupdate) => {
                        dataupdate ?
                            console.log(`User's password updated successfully: ${dataupdate.username} & ${dataupdate.email}`) :
                            console.log('User cannot be updated!')
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.trace(err));
};
updateUsername({userToUpdate: "person201"});

// to delete >> DELETE
deleteUser = (user) => {

    FamilyUser
        .find({where: {username: user.usernameToDelete}})
        .then(data => {
            if (!data) {
                console.log('User cannot be found!')
            }
            else {
                console.log('User found: ');
                console.log(`Username: ${data.username} & Pass: ${data.password}`);
                data
                    .destroy()
                    .then((datadelete) => {
                        datadelete ?
                            console.log(`User's deleted successfully: ${datadelete.username} & ${datadelete.password}`) :
                            console.log('User cannot be deleted!')
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.trace(err));
};
deleteUser({usernameToDelete: "person925"});


// export connection
module.exports.sequelize = sequelize;