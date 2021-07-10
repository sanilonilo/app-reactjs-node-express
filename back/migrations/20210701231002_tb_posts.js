
exports.up = function(knex,Promise) {
  return knex.schema.createTable('posts', table => {
  	table.increments('id').primary()
  	table.string('titulo')
  	table.text('descricao')
  	table.string('post')
  	table.integer('usuarioId').references('id').inTable('usuarios').notNull()

  })
};

exports.down = function(knex,Promise) {
  return knex.schema.dropTable('posts')
};
