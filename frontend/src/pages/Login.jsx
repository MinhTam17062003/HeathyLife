import loginImg from "../assets/Images/HeroImg.png"
import Template from "../components/core/Auth/Template"
import Box from "@mui/material/Box";


function Login() {
  return (
      <Box>
          <Template
            title="Chào mừng bạn đến với Heathylife"
            description2="Chăm sóc sức khỏe của bạn từ bây giờ với những khóa học giúp cơ thể bạn tái tạo lại nguồn năng lượng đã mất"
            image={loginImg}
            formType="login"
          />
      </Box>
  )
}

export default Login