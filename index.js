import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import * as dotenv from 'dotenv';

import { registerValidation, loginValidation, postCreateValidation } from './validation.js';
import { UserController, PostController } from './controllers/index.js';
import { checkAuth, handleValidErrors } from './utils/index.js';

dotenv.config();

mongoose.set('strictQuery', true);
mongoose
   .connect(process.env.MONGODB_URL)
   .then(() => console.log('DB OK'))
   .catch((err) => console.log('DB ERROR', err));

const app = express();

const storage = multer.diskStorage({
   destination: (_, __, cb) => {
      cb(null, 'uploads');
   },
   filename: (_, file, cb) => {
      cb(null, file.originalname);
   },
});

const upload = multer({ storage });

const PORT = 4444;
export const tokenKey = 'secret123';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

//USER
app.post('/auth/register', registerValidation, handleValidErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

//POST
app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidErrors, PostController.create);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidErrors, PostController.update);
app.delete('/posts/:id', checkAuth, PostController.remove);

//FileUpload
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
   res.json({
      url: `/uploads/${req.file.originalname}`,
   });
});

app.listen(PORT, (err) => {
   if (err) {
      return console.log(err);
   }
   console.log('Server OK');
});
