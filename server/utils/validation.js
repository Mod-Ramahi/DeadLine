const yup = require("yup")

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string() .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .max(20, 'password must not exceed 20 character')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]+$/,
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
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]+$/,
      'Password must include at least one letter and one number'
    ),
});

const postJobSchema = yup.object().shape({
  title: yup.string().min(4, 'Title must be at least 4 characters')
      .max(30, 'Title must not exceed 10 characters'),
  description: yup.string().min(100, 'Description must be atleast 100 character')
      .max(700, 'Description must not exceed 100 character'),
  shortDescription: yup.string().min(15, 'Job summary must be at least 15 character')
      .max(90, 'Job summary must not exceed 90 characters'),
  category: yup.string()
      .notOneOf(["", "select"], 'Please select category'),
  salary: yup.number().min(30, 'min value is 30$')
      .max(50000, 'max value is 50,000 $')
})

module.exports = { loginSchema, registerSchema, postJobSchema }