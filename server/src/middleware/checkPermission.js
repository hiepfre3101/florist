import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.js'

dotenv.config()
export const checkPermission = async (req, res, next) => {
   try {
      const authHeader = req.headers.authorization
      //check login
      if (!authHeader) {
         return res.status(401).json({
            message: 'Login expired ! Please Login again',
            isExpried: true
         })
      }
      const token = authHeader && authHeader.split(' ')[1]
      //decode jwt
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
      //get user
      const user = await User.findOne({ _id: decodedToken.id })
      if (!user.role === 'admin') {
         return res.status(401).json({
            message: 'Only for admin!',
            isExpried: false
         })
      }
      req.user = user
      next()
   } catch (error) {
      res.status(400).json({
         message: error.message
      })
   }
}
