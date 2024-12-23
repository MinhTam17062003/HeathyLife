import { useEffect } from "react";
import RenderSteps from "./RenderSteps"



export default function AddCourse() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="flex w-full items-start gap-x-6">

      <div className="flex flex-1 flex-col">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5 font-boogaloo text-center lg:text-left">
          Thêm khóa học
        </h1>

        <div className="flex-1">
          <RenderSteps />
        </div>
      </div>

      {/* Course Upload Tips */}
      <div className="sticky top-10 hidden lg:block max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 ">
        <p className="mb-8 text-lg text-richblack-5">⚡ Gợi ý đăng bài</p>

        <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
          <li>Đặt tùy chọn Giá khóa học hoặc miễn phí.</li>
          <li>Kích thước chuẩn cho hình thu nhỏ của khóa học là 1024x576.</li>
          <li>Phần video điều khiển video tổng quan về khóa học.</li>
          <li>Xây dựng khóa học là nơi bạn tạo và tổ chức một khóa học.</li>
          <li>Thêm Chủ đề vào phần Trình tạo khóa học để tạo bài học, câu đố và bài tập.</li>
          <li>Thông tin từ phần Dữ liệu bổ sung sẽ hiển thị trên trang duy nhất của khóa học.</li>
          <li>Thực hiện thông báo để thông báo bất kỳ điều quan trọng nào</li>
          <li>Ngửi đến tất cả sinh viên đã đăng ký cùng một lúc.</li>
        </ul>
      </div>
    </div>
  )
}