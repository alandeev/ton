const devConfig = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_DB_HOST,
    port: process.env.POSTGRES_DB_PORT || 5433,
    username: process.env.POSTGRES_DB_USERNAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_DATABASE,
    logging: true,
    synchronize: false,
    migrationsRun: false,
    entities: [
      './src/infra/db/typeorm/modules/**/*-entity.ts'
    ],
    migrations: [
      './src/infra/db/typeorm/migrations/release-16-10/*.ts'
    ],
    cli: {
      migrationsDir: './src/infra/db/typeorm/migrations/release-16-10'
    }
  }
]

const prodConfig = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_DB_HOST_PROD,
    port: process.env.POSTGRES_DB_PORT_PROD || 5432,
    username: process.env.POSTGRES_DB_USERNAME_PROD,
    password: process.env.POSTGRES_DB_PASSWORD_PROD,
    database: process.env.POSTGRES_DB_DATABASE_PROD,
    synchronize: false,
    migrationsRun: false,
    extra: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    entities: [
      './dist/infra/db/typeorm/modules/**/*-entity.js'
    ],
    migrations: [
      './dist/infra/db/typeorm/migrations/release-16-10/*.js'
    ],
    cli: {
      migrationsDir: './dist/infra/db/typeorm/migrations/release-16-10'
    }
  }
]
module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig
