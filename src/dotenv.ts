import { config } from 'dotenv'
import * as path from 'path'

const bDev = process.env.NODE_ENV === 'development'

if (bDev) config({ path: path.resolve('.env') })
