import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export const registerSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export const bookTrialSchema = yup.object({
  reason: yup.string().required('Please choose a reason'),
  fullName: yup.string().trim().required('Full name is required'),
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  phone: yup.string().trim().required('Phone number is required'),
})
