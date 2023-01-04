import { body } from 'express-validator';

export const registerValidation = [
   body('email', 'Неверный формат почты').isEmail(),
   body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
   body('fullName', 'Укажите имя более 3 символов').isLength({ min: 3 }),
   body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const loginValidation = [
   body('email', 'Неверный формат почты').isEmail(),
   body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const postCreateValidation = [
   body('title', 'Заголовок должен быть минимум 3 символа').isLength({ min: 3 }).isString(),
   body('text', 'Текст должен быть минимум 5 символа').isLength({ min: 5 }).isString(),
   body('tags', 'Неверный формат тегов').optional().isString(),
   body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
