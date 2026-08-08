import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Modal from '../Modal'
import FormField from '../FormField'
import { EyeIcon } from '../icons'
import { loginSchema } from '../../lib/validation'
import { useAuth } from '../../context/AuthContext'

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema) })

  function handleClose() {
    reset()
    setAuthError('')
    onClose()
  }

  async function onSubmit(values) {
    setAuthError('')
    try {
      await login(values.email, values.password)
      handleClose()
    } catch (error) {
      setAuthError(error.message)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} labelledBy="login-title">
      <h2 id="login-title" className="text-4xl font-extrabold text-ink-900">
        Log In
      </h2>
      <p className="mt-4 text-ink-500">
        Welcome back! Please enter your credentials to access your account and continue your
        search for an teacher.
      </p>

      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField label="Email" name="email" register={register} error={errors.email?.message} />
        <FormField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          register={register}
          error={errors.password?.message}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-ink-500"
            >
              <EyeIcon crossedOut={showPassword} />
            </button>
          }
        />

        {authError && <p className="text-sm text-red-600">{authError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-xl bg-brand-400 py-4 text-lg font-bold text-ink-900 transition hover:bg-brand-500 disabled:opacity-60"
        >
          {isSubmitting ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </Modal>
  )
}
