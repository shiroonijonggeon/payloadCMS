"use client"

import { Course } from "@/payload-types"
import { HiFlag, HiPencilAlt, HiVideoCamera } from "react-icons/hi"

export default function Curriculum({
  course,
  currentProgress,
}: {
  course: Course
  currentProgress: number
}) {
  return (
    <div className="flex max-h-[20rem] flex-col gap-4 overflow-y-auto">
      {course.curriculum?.map((item, index) => {
        const isCurrent = index === currentProgress
        const baseClass = "p-4 border rounded bg-gray-900"
        const borderClass = isCurrent ? "border-white" : "border-gray-700"
        const className = `${baseClass} ${borderClass}`

        if (item.blockType === "video") {
          return (
            <div key={index} className={className}>
              <div className="flex items-center gap-2 font-semibold text-teal-400">
                <HiVideoCamera className="text-xl" />
                {item.title}
              </div>
              <div className="text-sm text-gray-400">
                Duration: {item.duration} min
              </div>
            </div>
          )
        }

        if (item.blockType === "quiz") {
          return (
            <div key={index} className={className}>
              <div className="flex items-center gap-2 font-semibold text-yellow-400">
                <HiPencilAlt className="text-xl" />
                {item.title}
              </div>
              <div className="text-sm text-gray-400">
                Questions: {item.questions?.length || 0}
              </div>
            </div>
          )
        }

        if (item.blockType === "finish") {
          return (
            <div key={index} className={className}>
              <div className="flex items-center gap-2 font-semibold text-green-400">
                <HiFlag className="text-xl" />                
                Certificate
              </div>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
