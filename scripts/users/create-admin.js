/**
 * This is a simple script to create a new Admin User in DB.
 * The script creates User and Auth records.
 * User password will be created randomly
 * Admin will need to use Forgot Password option to set a new valid password
 */

const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const crypto = require('crypto');
const prompt = require('prompts');

/**
 * Logs messages
 * @param {*} message 
 */
const log = (message) => {
  console.log('STATUS: ', message);
};

/**
 * Inserts Data into Database
 * @param {*} db 
 * @param {*} collectionName 
 * @param {*} data 
 */
const insertData = (db, collectionName, data) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName);
    collection.insertOne(data, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

/**
 * Performs database connection
 * @param {*} url
 */
const establishDbConnection = (url) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, {
      useNewUrlParser: true,
    }, (err, client) => {
      if (err) {
        return reject(err);
      }
      return resolve(client);
    });
  });
};

/**
 * Closes Database connection by request
 * @param {*} client
 */
const closeDbConnection = (client) => {
  client.close();
  log('DB connection closed');
};

/**
 * Gets new user data from console
 * User will need to use keyboard to provide parameters
 */
const getDataFromConsole = () => {
  // return new Promise((resolve, reject) => {
  //   prompt.get(['firstName', 'lastName', 'email'], (err, inputData) => {
  //     if (err) {
  //       return reject(err);
  //     }
  //     return resolve(inputData);
  //   });
  // });

  const questions = [
    {
      type: 'text',
      name: 'firstName',
      message: 'First Name: ',
    },
    {
      type: 'text',
      name: 'lastName',
      message: 'Last Name: ',
    },
    {
      type: 'text',
      name: 'email',
      message: 'Email: ',
    },
  ];

  return prompt(questions);
};

/**
 * Main function
 */
(async () => {
  try {

    log('script is running...');

    dotenv.config({ path: '../../.env' });

    const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
    const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

    log('environment variables retrieved');

    const dbClient = await establishDbConnection(url);
    log('DB connection established');

    const inputData = await getDataFromConsole();

    const db = dbClient.db(DB_NAME);

    const userData = {
      email: inputData.email,
      firstName: inputData.firstName,
      lastName: inputData.lastName,
      nickname: 'admin_user',
      roles: ['USER_ADMIN', 'USER_REGULAR'],
    };

    const userCreated = await insertData(db, 'user.profiles', userData);
    log(`user ${userData.email} has been created `);

    const authData = {
      _user: userCreated.ops[0]._id,
      activationCode: null,
      isActive: true,
      passwordHash: crypto.randomBytes(64).toString('hex'), // random password which should be changed
      username: userData.email,
    };
    await insertData(db, 'user.identities', authData);
    log(`authentication record for user ${authData.username} has been created `);

    closeDbConnection(dbClient);
    process.exit();

  } catch (err) {
    log(err);
    process.exit();
  }

})();
