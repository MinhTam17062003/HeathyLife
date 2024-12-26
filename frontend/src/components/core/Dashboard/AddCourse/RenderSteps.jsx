import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";
import EditCourse from "./../EditCourse/EditCourse";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);
  const { editCourse } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Thông tin khóa học",
    },
    {
      id: 2,
      title: "Xây dựng khóa học",
    },
    {
      id: 3,
      title: "Đăng khóa học",
    },
  ];

  return (
    <>
      <div className="relative mb-2 flex w-full select-none justify-center ">
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center ">
              <div
                className={`grid aspect-square w-[34px] place-items-center rounded-full border-[1px] 
                    ${step === item.id ? "border-black bg-black text-white" // Bước hiện tại
                    : "border-black bg-black text-white"} // Các bước chưa đạt hoặc đã hoàn thành
                    ${step > item.id && "bg-black text-white"}`} // Bước đã hoàn thành
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-white" /> // Icon màu trắng trên nền đen
                ) : (
                  item.id
                )}
              </div>
            </div>

            {/* Dashes */}
            {item.id !== steps.length && (
              <div
                className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 
                    ${step > item.id ? "border-black" : "border-black"} `}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <div
            className={`sm:min-w-[130px] flex flex-col items-center gap-y-2 ${
              editCourse && "sm:min-w-[270px]"
            }`}
            key={item.id}
          >
            <p className={`text-sm ${step >= item.id ? "text-black" : "text-black"}`}>
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
}
