// src/auth.middleware.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  // 1. 401 se não houver header
  if (!authHeader) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' })
  }

  // 2. 401 se não tiver formato "Bearer <token>"
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Token mal formatado.' })
  }

  const token = parts[1]
  const jwtSecret = process.env.JWT_SECRET || 'segredo-padrao'

  try {
    // 3. Anexa payload ao req.user
    const payload = jwt.verify(token, jwtSecret)
    ;(req as any).user = payload

    // 4. Chama next()
    next()
  } catch (err) {
    // 5. 401 se inválido
    return res.status(401).json({ message: 'Token inválido.' })
  }
}

export default authMiddleware
