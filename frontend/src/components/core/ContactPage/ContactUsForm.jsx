import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  // Hàm gửi dữ liệu form
  const submitContactForm = async (data) => {
    console.log("Dữ liệu gửi từ frontend:", data); // Kiểm tra xem dữ liệu có đầy đủ không
    try {
      setLoading(true);
<<<<<<< HEAD
      setError("");
      setSuccess(false);
  
      const response = await fetch("http://localhost:5001/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Đảm bảo header đúng
        },
        body: JSON.stringify(data), // Gửi dữ liệu dạng JSON
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Lỗi từ server: ${errorResponse.error || response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Form submitted successfully:", result);
      setSuccess(true);
      alert("Email đã được gửi thành công!");
      reset(); // Reset các trường trong form
    } catch (error) {
      console.error("Thông tin lỗi:", error);
      setError(error.message);
      alert(`Lỗi gửi email: ${error.message}`);
    } finally {
      setLoading(false); // Tắt trạng thái loading
=======
      const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to send contact form");
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error: ", error.message);
    } finally {
      setLoading(false);
>>>>>>> e84fd777d59e83c536432462b51618800e80b154
    }
  };
  

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        phoneNo: "",
        countrycode: "",
        message: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit(submitContactForm)}>
      {error && (
        <div className="p-3 text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 text-green-500 bg-green-50 rounded-md">
          Email đã được gửi thành công!
        </div>
      )}

      {/* First Name and Last Name */}
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="text-sm font-medium text-gray-600">
            Tên
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="Tên"
            className="form-style focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
            {...register("firstname", { required: "Vui lòng nhập tên." })}
          />
          {errors.firstname && (
            <span className="text-sm text-red-500">{errors.firstname.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="text-sm font-medium text-gray-600">
            Họ
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Họ"
            className="form-style focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
            {...register("lastname")}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-600">
          Địa chỉ Email
        </label>
        <input
          type="email"
          id="email"
<<<<<<< HEAD
          placeholder="Nhập địa chỉ email"
=======
          placeholder="Enter email address"
>>>>>>> e84fd777d59e83c536432462b51618800e80b154
          className="form-style focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
          {...register("email", { required: "Vui lòng nhập email." })}
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="text-sm font-medium text-gray-600">
          Số điện thoại
        </label>
        <div className="flex gap-3">
          <select
            id="countrycode"
            className="form-style w-[90px] focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
            {...register("countrycode", { required: "Vui lòng chọn mã quốc gia." })}
          >
            {CountryCode.map((ele, index) => (
              <option key={index} value={ele.code}>
                {ele.code}
              </option>
            ))}
          </select>
          <input
            type="text"
            id="phonenumber"
            placeholder="12345 67890"
            className="form-style w-full focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
            {...register("phoneNo", {
              required: "Vui lòng nhập số điện thoại.",
              minLength: { value: 10, message: "Số điện thoại không hợp lệ." },
              maxLength: { value: 12, message: "Số điện thoại không hợp lệ." },
            })}
          />
        </div>
        {errors.phoneNo && (
          <span className="text-sm text-red-500">{errors.phoneNo.message}</span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-600">
          Phản hồi của bạn cho chúng tôi
        </label>
        <textarea
          id="message"
          rows="5"
          placeholder="Nhập phản hồi vào đây"
          className="form-style focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
          {...register("message", { required: "Vui lòng nhập phản hồi." })}
        />
        {errors.message && (
          <span className="text-sm text-red-500">{errors.message.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-green-300 px-6 py-3 text-center font-bold text-black hover:scale-95 
          transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? "Đang gửi..." : "Phản hồi"}
      </button>
    </form>
  );
};

export default ContactUsForm;
