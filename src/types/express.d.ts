// src/types/express.d.ts
import { JwtPayload } from 'jsonwebtoken'

// Estende a interface 'Request' do Express
declare global {
  namespace Express {
    export interface Request {
      // Adicionamos a propriedade 'user'
      // Ela pode conter o payload do JWT ou ser undefined
      user?: string | JwtPayload
    }
  }
}
