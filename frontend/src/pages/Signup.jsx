import signupImg from "../assets/Images/Signup1.png"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Đến với Heathy Lifestyle để có một cuộc sống tràn đầy năng lượng"
      description2="Phát triển, học tập sáng tạo các khóa học, cùng nhau học tập, rèn luyện sức khỏe"
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup