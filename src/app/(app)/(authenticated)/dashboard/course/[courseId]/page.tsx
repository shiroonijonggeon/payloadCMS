import { getPayload } from "payload"
import Image from "next/image"
import configPromise from "@payload-config"
import { getUser } from "../../../actions/getUser"
import { notFound } from "next/navigation"
import { Course, Participation } from "@/payload-types"
import Link from "next/link"
import { HiArrowLeft, HiPencilAlt, HiVideoCamera } from "react-icons/hi"
import StartCourseButton from "./components/StartCourseButton"
import ResumeButton from "./components/ResumeButton"

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const { courseId } = params
  const payload = await getPayload({ config: configPromise })
  const user = await getUser()

  let course: Course | null = null

  try {
    course = await payload.findByID({
      collection: "courses",
      id: courseId,
      overrideAccess: false,
      user,
    })
  } catch (err) {
    console.error(err)
    return notFound()
  }

  if (!course) return notFound()

  let participation: Participation | null = null

  try {
    const participationRes = await payload.find({
      collection: "participation",
      where: {
        course: { equals: courseId },
        customer: { equals: user?.id },
      },
      overrideAccess: false,
      user,
    })

    participation = participationRes?.docs[0] || null
  } catch (err) {
    console.error(err)
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-gray-300 transition duration-300 ease-in-out hover:text-white"
      >
        <HiArrowLeft className="text-lg" />
        Back to Dashboard
      </Link>

      {/* Course thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden border border-gray-700">
        <Image
          src={course.image?.url || "/placeholder.png"}
          alt={`${course.title} thumbnail`}
          fill
          className="object-cover"
        />
      </div>

      {/* Title & description */}
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-gray-300">{course.description}</p>

      {/* Curriculum */}
      <div>
        <h2 className="mt-6 mb-2 text-xl font-semibold">Curriculum</h2>
        <div className="flex flex-col gap-4">
          {course.curriculum?.map((block, id) => {
            if (block.blockType === "video") {
              return (
                <div
                  key={id}
                  className="rounded border border-gray-700 bg-gray-900 p-4"
                >
                  <div className="flex items-center gap-2 font-semibold text-teal-400">
                    <HiVideoCamera className="text-xl" />
                    {block.title}
                  </div>
                  <div className="text-sm text-gray-400">
                    Duration: {block.duration} min
                  </div>
                </div>
              )
            }

            if (block.blockType === "quiz") {
              return (
                <div
                  key={id}
                  className="rounded border border-gray-700 bg-gray-900 p-4"
                >
                  <div className="flex items-center gap-2 font-semibold text-yellow-400">
                    <HiPencilAlt className="text-xl" />
                    {block.title}
                  </div>
                  <div className="text-sm text-gray-400">
                    Questions: {block.questions?.length || 0}
                  </div>
                </div>
              )
            }

            return null
          })}
        </div>
      </div>

      {/* Action button */}
      {participation ? (
        <ResumeButton participation={participation} />
      ) : (
        <StartCourseButton courseId={course.id} />
      )}
    </div>
  )
}

export default CoursePage
