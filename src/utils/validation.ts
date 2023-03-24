import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Неверный формат E-mail")
    .required("Введите E-mail"),
  password: yup.string().required("Введите пароль"),
});

// export const registerSchema = yup.object().shape({
//     email: yup.string().email('Неверный формат E-mail').required('Введите E-mail'),
//     password: yup.string().required('Введите пароль'),
//     firstName: yup.string().required('Введите имя'),
//     lastName: yup.string().required('Введите фамилию'),
//     phone: yup.string().matches(phoneRegExp, 'Неверный формат номера телефона').required('Введите номер')
// });

// export const profileEditSchema = yup.object().shape({
//     firstName: yup.string().required('Введите имя'),
//     phone: yup.string().matches(phoneRegExp, 'Неверный формат номера телефона').required('Введите номер'),
//     email: yup.string().email('Неверный формат E-mail').required('Введите E-mail'),
//     date: yup.date().nullable().min(new Date(1900, 0, 1), "Нужно вести больше 1900").required('Введите дату рождения'),
//     oldPassword: yup.string().required('Введите старый пароль'),
//     newPassword: yup.string().required('Введите новый пароль'),
//     confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Пароли не совпадают').required('Введите новый пароль'),
// });

// export const shopSchema = yup.object().shape({
//     firstName: yup.string().required('Введите имя'),
//     company: yup.string().required('Введите название компании'),
//     bin: yup.string().required('Введите БИН/ИИН'),
//     address: yup.string().required('Введите адрес'),
//     email: yup.string().email('Неверный формат E-mail').required('Введите E-mail'),
//     phone: yup.string().matches(phoneRegExp, 'Неверный формат номера телефона').required('Введите номер'),
//     instagram: yup.string().required('Введите логин инстаграма'),
// });

// export const orderSchema = yup.object().shape({
//     apartment: yup.string(),
//     building: yup.string().required('Введите дом/здание'),
//     street: yup.string().required('Введите адрес'),
//     city: yup.string().required('Введите город'),
//     cardsId: yup.string().nullable().default(null),
//     phone: yup.string().required('Введите номер телефона'),
//     date: yup.string()
// });
