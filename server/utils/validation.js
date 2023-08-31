const yup = require("yup")

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string() .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .max(20, 'password must not exceed 20 character')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
    'Password must include at least one letter and one number'
  ),
});

const registerSchema = yup.object().shape({
  name: yup.string().required().min(3).max(10),
  // bio: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'password must not exceed 20 character')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      'Password must include at least one letter and one number'
    ),
});

module.exports = { loginSchema, registerSchema }