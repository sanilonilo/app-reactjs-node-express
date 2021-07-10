
exports.up = function(knex,Promise) {
  return knex.schema.createTable('usuarios', table => {
  	table.increments('id').primary()
  	table.string('nome').notNull()
  	table.string('usuario').notNull()
  	table.string('email').notNull().unique()
  	table.string('senha').notNull()
  	table.boolean('online').defaultTo(true)
  })
};

exports.down = function(knex,Promise) {
  return knex.schema.dropTable('usuarios')
};
