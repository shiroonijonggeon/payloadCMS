'use client'

import { participate } from '@/app/(app)/(authenticated)/actions/participate'
import { Participation } from '@/payload-types'
import { useRouter } from 'next/navigation'
import { useState, MouseEvent } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { HiExclamationCircle, HiPlay } from 'react-icons/hi'

export default function StartCourseButton({ courseId }: { courseId: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleStartCourse(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setStatus('loading')
    setError(null)

    try {
      const participation: Participation = await participate({ courseId })
      if (!participation) {
        throw new Error('Failed to start course participation')
      }

      router.push(`/dashboard/participation/${participation.id}`)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setError('Failed to start course. Please try again.')
    }
  }

  const isLoading = status === 'loading'
  const isError = status === 'error'

  return (
    <div className="mt-6">
      <button
        onClick={handleStartCourse}
        disabled={isLoading}
        className={`relative inline-flex items-center gap-2 px-6 py-3 rounded font-semibold transition duration-300 ease-in-out
          ${isError ? 'bg-red-600 text-white' : 'bg-teal-500 text-white hover:bg-teal-600'}
          disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-xl" />
        ) : isError ? (
          <HiExclamationCircle className="text-xl" />
        ) : (
          <HiPlay className="text-xl" />
        )}
        <span>Start Course</span>
      </button>

      {isError && (
        <p className="mt-2 flex items-center gap-2 text-sm text-red-400">
          <HiExclamationCircle className="text-lg" />
          {error}
        </p>
      )}
    </div>
  )
}
