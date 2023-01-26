NODE_ENV = process.env.NODE_ENV
NODE_ENV = (NODE_ENV === undefined ? 'development' : NODE_ENV).toLowerCase();

const results =  require('dotenv').config({ path: require('path').join(__dirname, `./${NODE_ENV}.env`) });

const { parsed : envs } = results;
module.exports = envs