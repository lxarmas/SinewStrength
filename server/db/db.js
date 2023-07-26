const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const config = {
  logging: false
};

if (process.env.LOGGING === 'true') {
  delete config.logging;
}

if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

let db;
if (process.env.DATABASE_URL) {
  // Parse the DATABASE_URL to extract the protocol
  const urlParts = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  if (urlParts) {
    const [, username, password, host, port, database] = urlParts;
    db = new Sequelize(database, username, password, {
      host,
      port,
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    });
  } else {
    console.error('Invalid DATABASE_URL');
    process.exit(1); // Exit the process if the URL format is invalid
  }
} else {
  db = new Sequelize(`postgres://localhost:5432/${databaseName}`, config);
}

module.exports = db;
