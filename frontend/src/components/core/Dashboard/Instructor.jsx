import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"
import Img from './../../common/Img';



export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])


  // get Instructor Data
  useEffect(() => {
    ; (async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      // console.log('INSTRUCTOR_API_RESPONSE.....', instructorApiData)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)

  const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)


  // skeleton loading
  const skItem = () => {
    return (
      <div className="mt-5 w-full flex flex-col justify-between  rounded-xl ">
        <div className="flex border p-4 border-richblack-600 ">
          <div className="w-full">
            <p className="w-[100px] h-4 rounded-xl skeleton"></p>
            <div className="mt-3 flex gap-x-5">
              <p className="w-[200px] h-4 rounded-xl skeleton"></p>
              <p className="w-[100px] h-4 rounded-xl skeleton"></p>
            </div>

            <div className="flex justify-center items-center flex-col">
              <div className="w-[80%] h-24 rounded-xl mt-5 skeleton"></div>
              {/* circle */}
              <div className="w-60 h-60 rounded-full  mt-4 grid place-items-center skeleton"></div>
            </div>
          </div>
          {/* right column */}
          <div className="sm:flex hidden min-w-[250px] flex-col rounded-xl p-6 skeleton"></div>
        </div>

        {/* bottom row */}
        <div className="flex flex-col gap-y-6  mt-5">
          <div className="flex justify-between">
            <p className="text-lg font-bold text-black pl-5">Your Courses</p>
            <Link to="/dashboard/my-courses">
              <p className="text-xs font-semibold text-yellow-50 hover:underline pr-5">View All</p>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row  gap-6 ">
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-black text-center sm:text-left">
          Hii {user?.firstName} 👋
        </h1>
        <p className="font-medium text-richblack-200 text-center sm:text-left">
          Let's start something new
        </p>
      </div>


      {loading ? (
        <div>
          {skItem()}
        </div>
      )
        :
        courses.length > 0 ? (
          <div>
            <div className="my-4 flex h-[450px] space-x-4">
              {/* Render chart / graph */}
              {totalAmount > 0 || totalStudents > 0 ? (
                <InstructorChart courses={instructorData} />
              ) : (
                <div className="flex-1 rounded-md bg-[#FFFFFF] p-6">
                  <p className="text-lg font-bold text-black"></p>
                  <p className="mt-4 text-xl font-medium text-black">
                    Not Enough Data To Visualize
                  </p>
                </div>
              )}

              {/* left column */}
              {/* Total Statistics */}
              <div className="flex min-w-[250px] flex-col rounded-md bg-[#FFFFFF] p-6">
                <p className="text-lg font-bold text-black">Trạng thái</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-lg text-richblack-200">Tổng số khóa học</p>
                    <p className="text-3xl font-semibold text-black0">
                      {courses.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Tổng số học viên</p>
                    <p className="text-3xl font-semibold text-black0">
                      {totalStudents}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Doanh thu</p>
                    <p className="text-3xl font-semibold text-black0">
                      {totalAmount} .VNĐ 
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Render 3 courses */}
            <div className="rounded-md bg-[#FFFFFF] p-6">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-black">Các khóa học của bạn</p>
                <Link to="/dashboard/my-courses">
                  <p className="text-xs font-semibold text-yellow-50 hover:underline">Xem tất cả</p>
                </Link>
              </div>

              <div className="my-4 flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 ">
                {courses.slice(0, 3).map((course) => (
                  <div key={course._id} className="sm:w-1/3 flex flex-col items-center justify-center">
                    <Img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[201px] w-full rounded-2xl object-cover"
                    />

                    <div className="mt-3 w-full">
                      <p className="text-sm font-medium text-black0">
                        {course.courseName}
                      </p>
                      <div className="mt-1 flex items-center space-x-2">
                        <p className="text-xs font-medium text-richblack-300">
                          {course.studentsEnrolled.length} học viên
                        </p>
                        <p className="text-xs font-medium text-richblack-300">
                          |
                        </p>
                        <p className="text-xs font-medium text-richblack-300">
                           {course.price} .VNĐ
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 rounded-md bg-[#FFFFFF] p-6 py-20">
            <p className="text-center text-2xl font-bold text-black">
              Bạn chưa có khóa học nào của bạn 
            </p>

            <Link to="/dashboard/add-course">
              <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                Tạo khóa học
              </p>
            </Link>
          </div>
        )}
    </div>
  )
}
