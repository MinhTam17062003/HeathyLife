import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Cộng đồng ",
    description: "Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ .",
    details: "mtam2003it@gmail.com",
  },
  {
    icon: "BiWorld",
    heading: "Địa chỉ ",
    description: "Nếu cần sự hỗ trợ trực tiếp hãy tìm chúng tại Happy home 2.",
    details:
      "544/42 khu phố 4, phường An Phú Đông, quận 12",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Thư 2 đến Thứ 7, từ 5h.am đến 9h.pm",
    details: "+52404207",
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