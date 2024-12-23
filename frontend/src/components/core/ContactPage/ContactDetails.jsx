import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Trò chuyện với chúng tôi",
    description: "Đội ngũ thân thiện sẵn sàng giúp đỡ bạn ",
    details: "mtam2003it@gmail.com",
  },
  {
    icon: "BiWorld",
    heading: "Đến gặp chúng tôi tại địa chỉ",
    description: "300A Nguyễn Tất Thành Q.4 TP:HCM",
    details:
      "Đại học Nguyễn Tất Thành",
  },
  {
    icon: "IoCall",
    heading: "Gọi cho tôi",
    description: "Từ thứ 2 đến thứ 6. 9am to 6pm",
    details: "0352404207"
  },
]


const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div
            className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
            key={i}
          >
            <div className="flex flex-row items-center gap-3">
              <Icon size={25} />

              <h1 className="text-lg font-semibold text-richblack-5">
                {ele?.heading}
              </h1>
            </div>

            <p className="font-medium">{ele?.description}</p>
            <p className="font-semibold">{ele?.details}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails