const config = require('./.env')

module.exports = {

    client: 'postgresql',
    connection: config.conexao,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};
