module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'cluckr-db'
    },
    migrations: {
      directory: './db/migrations'
    }
  }
};