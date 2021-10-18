import 'module-alias/register'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

Promise.all([
  createConnection()
])
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(process.env.API_PORT, () => console.log(`SERVER RUNNING AT http://localhost:${process.env.API_PORT}`))
  })
  .catch((err) => (console.log(err)))
