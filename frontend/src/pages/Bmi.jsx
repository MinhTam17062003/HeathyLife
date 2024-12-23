import React, { useState } from "react";
import Footer from "../components/common/Footer";
import BmiTable from "../assets/Images/BmiTable1.jpg";

const BmiCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [bmiResult, setBmiResult] = useState(null);
  const [healthStatus, setHealthStatus] = useState({ status: "", advice: "" });

  // Hàm tính BMI
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));
  };

  // Hàm lấy trạng thái sức khỏe
  const getHealthStatus = (bmi) => {
    if (bmi < 18.5)
      return { status: "Thiếu cân", advice: "Bổ sung dinh dưỡng hợp lý." };
    if (bmi < 25)
      return { status: "Bình thường", advice: "Duy trì lối sống lành mạnh." };
    if (bmi < 30)
      return { status: "Thừa cân", advice: "Cải thiện chế độ ăn uống." };
    return { status: "Béo phì", advice: "Tham khảo ý kiến bác sĩ." };
  };

  // Xử lý sự kiện khi nhấn nút tính toán
  const handleCalculate = () => {
    if (!weight || !height) {
      setError("Cân nặng và chiều cao không được để trống.");
      return;
    }

    if (weight <= 0 || height <= 0) {
      setError("Cân nặng và chiều cao phải là số dương.");
      return;
    }

    setError("");
    const bmi = calculateBMI(weight, height);
    const status = getHealthStatus(bmi);
    setBmiResult(bmi);
    setHealthStatus(status);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className="flex flex-col pt-5">
      {/* Giới thiệu về BMI */}
      <div className="pt-12 rounded-lg shadow-md bg-green-25">
        <div className="block px-5 lg:px-20 max-w-5xl mx-auto mb-5">
          <h2 className="text-xl font-bold text-teal-700 mb-3">BMI LÀ GÌ?</h2>
          <p className="mb-3">
            BMI là viết tắt của "Body Mass Index" (Chỉ số khối cơ thể), đây là một
            phép đo tiêu chuẩn được sử dụng để đánh giá mức độ cân đối giữa cân
            nặng và chiều cao của một người. Chỉ số BMI giúp bạn phân loại tình
            trạng sức khỏe của mình là mập, bình thường, thiếu cân hay ốm.
          </p>
          <p className="mb-3">
            BMI (Chỉ số khối cơ thể) là phép tính đơn giản ước tính lượng mỡ trong
            cơ thể dựa trên chiều cao và cân nặng.
          </p>
          <p className="mb-3">Để tính chỉ số BMI của bạn, hãy sử dụng công thức sau:</p>
          <p className="italic mb-5">BMI = Cân nặng (kg) / (Chiều cao (m))²</p>
          <p className="mb-3">Ví dụ, nếu bạn nặng 70 kg và cao 1,75 m, chỉ số BMI của bạn sẽ là:</p>
          <p className="font-bold mb-5">BMI = 70 / (1,75)² = 22,86</p>
        </div>

        {/* Công cụ tính BMI */}
        <div className="flex flex-col items-center w-full mt-8">
          <div className="max-w-xl w-full mb-10 px-5 py-5 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-3">CÔNG CỤ TÍNH BMI ONLINE</h3>
            <p className="text-center text-gray-500 mb-5">
              Hãy nhập cân nặng và chiều cao để kiểm tra chỉ số BMI của bạn.
            </p>
            <div className="flex flex-col gap-4 mb-5">
              <input
                type="number"
                placeholder="Cân nặng (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full"
              />
              <input
                type="number"
                placeholder="Chiều cao (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <button
              onClick={handleCalculate}
              className="w-full py-3 bg-green-50 text-white font-bold rounded-lg hover:bg-teal-700"
            >
              Nhận Kết quả
            </button>
            {error && <p className="text-red-500 text-center mt-3">{error}</p>}
          </div>
        </div>

        {/* Chẩn đoán cân nặng qua BMI */}
        <div className="block px-5 lg:px-20 max-w-5xl mx-auto mt-10 mb-10">
          <h2 className="text-xl font-bold mb-3">CHẨN ĐOÁN CÁC TÌNH TRẠNG CÂN NẶNG QUA BMI</h2>
          <p className="mb-3">
            Nhìn chung, các phạm vi BMI sau đây (tính bằng kg/m2) phân loại các loại cân nặng khác nhau:
          </p>
          <div className="text-center my-5">
            <img src={BmiTable} alt="Bảng phân loại BMI" className="w-full max-w-lg mx-auto" />
          </div>
          <p className="mb-3">
            BMI không phải là công cụ duy nhất mà nhà cung cấp sử dụng để phân loại các loại cân nặng. Các công cụ khác bao gồm:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Đo vòng eo.</li>
            <li>Đo độ dày của da bằng thước kẹp da ở một số vùng nhất định trên cơ thể, chẳng hạn như mặt sau cánh tay trên và dưới xương bả vai.</li>
            <li>Quét DEXA và phép đo thể tích dịch chuyển không khí (ADP) — những phương pháp này ít được sử dụng hơn.</li>
          </ul>
        </div>
      </div>

      <Footer />

      {/* Dialog kết quả */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-center text-xl font-bold text-teal-600 mb-4">KẾT QUẢ BMI</h3>
            <p className="text-center text-red-500 text-lg font-bold mb-2">BMI của bạn: {bmiResult}</p>
            <p className="text-center text-gray-700 mb-2">Trạng thái: <strong>{healthStatus.status}</strong></p>
            <p className="text-center text-gray-500 mb-4">Lời khuyên: {healthStatus.advice}</p>
            <button
              onClick={handleDialogClose}
              className="w-full py-2 bg-green-50 text-white rounded-lg hover:bg-teal-700"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
