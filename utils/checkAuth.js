import jwt from 'jsonwebtoken';
import { tokenKey } from '../index.js';

export default (req, res, next) => {
   const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

   if (token) {
      try {
         const decoded = jwt.verify(token, tokenKey);

         req.userId = decoded._id;
         next();
      } catch (e) {
         console.log(e);
         return res.status(403).json({
            message: 'Нет доступа',
         });
      }
   } else {
      return res.status(403).json({
         message: 'Нет доступа',
      });
   }
};
