import 'module-alias/register'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

Promise.all([
  createConnection()
])
  .then(async () => {
    const host = '0.0.0.0'
    const port = 3001 || 3000
    const app = (await import('./config/app')).default
    app.listen(port, host, () => console.log(`SERVER RUNNING AT http://localhost:${process.env.API_PORT}`))
  })
  .catch((err) => (console.log(err)))
