module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/luncher.sqlite3'
    },
    migrations: {
      directory: './data/migrations'
    }, 
    seeds: {
      directory: './data/seeds'
    }
  },
  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/testing-luncher.sqlite3'
    },
    migrations: {
      directory: './data/migrations'
    }, 
    seeds: {
      directory: './data/seeds'
    }
  },
};
