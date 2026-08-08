import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ref, push } from 'firebase/database'
import Modal from './Modal'
import FormField from './FormField'
import { bookTrialSchema } from '../lib/validation'
import { db } from '../lib/firebase'

const REASONS = [
  'Career and business',
  'Lesson for kids',
  'Living abroad',
  'Exams and coursework',
  'Culture, travel or hobby',
]

export default function BookTrialModal({ teacher, isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(bookTrialSchema),
    defaultValues: { reason: REASONS[0] },
  })

  function handleClose() {
    reset({ reason: REASONS[0] })
    setSubmitted(false)
    onClose()
  }

  async function onSubmit(values) {
    await push(ref(db, 'trialBookings'), {
      teacherId: teacher.id,
      teacherName: `${teacher.name} ${teacher.surname}`,
      ...values,
    })
    setSubmitted(true)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} labelledBy="book-trial-title">
      <h2 id="book-trial-title" className="text-4xl font-extrabold text-ink-900">
        Book trial lesson
      </h2>
      <p className="mt-4 text-ink-500">
        Our experienced tutor will assess your current language level, discuss your learning
        goals, and tailor the lesson to your specific needs.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <img src={teacher.avatar_url} alt="" className="h-12 w-12 rounded-full object-cover" />
        <div>
          <p className="text-sm text-ink-500">Your teacher</p>
          <p className="font-semibold text-ink-900">
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>

      {submitted ? (
        <p className="mt-8 rounded-xl bg-brand-100 p-5 font-medium text-ink-900">
          Thanks! Your trial lesson request has been sent. We will contact you shortly.
        </p>
      ) : (
        <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <fieldset>
            <legend className="text-lg font-bold text-ink-900">
              What is your main reason for learning {teacher.languages[0]}?
            </legend>
            <div className="mt-3 flex flex-col gap-2">
              {REASONS.map((reason) => (
                <label key={reason} className="flex items-center gap-3 text-ink-900">
                  <input
                    type="radio"
                    value={reason}
                    {...register('reason')}
                    className="h-4 w-4 accent-brand-400"
                  />
                  {reason}
                </label>
              ))}
            </div>
            {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>}
          </fieldset>

          <FormField
            label="Full Name"
            name="fullName"
            register={register}
            error={errors.fullName?.message}
          />
          <FormField label="Email" name="email" register={register} error={errors.email?.message} />
          <FormField
            label="Phone number"
            name="phone"
            register={register}
            error={errors.phone?.message}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-xl bg-brand-400 py-4 text-lg font-bold text-ink-900 transition hover:bg-brand-500 disabled:opacity-60"
          >
            {isSubmitting ? 'Booking…' : 'Book'}
          </button>
        </form>
      )}
    </Modal>
  )
}
