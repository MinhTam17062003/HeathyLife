import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion'

// Components
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'
import Course_Slider from '../components/core/Catalog/Course_Slider'
import Loading from '../components/common/Loading'

// API
import { fetchCourseCategories } from '../services/operations/courseDetailsAPI'
import { getCatalogPageData } from '../services/operations/pageAndComponentData'

// Icons
import { FaArrowRight } from "react-icons/fa"

// Animations
import { fadeIn } from '../components/common/motionFrameVarients'

// Background Images
import backgroundImg1 from '../assets/Images/random bg img/carousel1.jpg'
import backgroundImg2 from '../assets/Images/random bg img/carousel4.jpg'
import backgroundImg3 from '../assets/Images/random bg img/carousel3.jpg'

const randomImges = [backgroundImg1, backgroundImg2, backgroundImg3];

const Home = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [backgroundImg, setBackgroundImg] = useState(null);
    const [categories, setCategories] = useState([]);

    // Set random background image
    useEffect(() => {
        const bg = randomImges[Math.floor(Math.random() * randomImges.length)]
        setBackgroundImg(bg);
    }, [])

    // Fetch all course data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // First fetch all categories
                const categoriesResult = await fetchCourseCategories();
                setCategories(categoriesResult);

                // Then fetch data for each category
                const allCategoriesData = await Promise.all(
                    categoriesResult.map(async (category) => {
                        const result = await getCatalogPageData(category._id, dispatch);
                        return result;
                    })
                );

                // Combine all data
                const combinedData = {
                    selectedCategory: {
                        courses: allCategoriesData.flatMap(data => 
                            data.selectedCategory?.courses || []
                        )
                    },
                    mostSellingCourses: allCategoriesData.flatMap(data => 
                        data.mostSellingCourses || []
                    )
                };

                setCatalogPageData(combinedData);
                setError(null);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Không thể tải dữ liệu khóa học. Vui lòng thử lại sau.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <p className="text-richblack-5">{error}</p>
            </div>
        );
    }

    return (
        <React.Fragment>
            {/* Background Image */}
            <div>
                <div className="w-full h-[450px] md:h-[650px] absolute top-0 left-0 overflow-hidden object-cover">
                    <img src={backgroundImg} alt="Background" className="w-full h-full object-cover"/>
                    <div className="absolute left-0 bottom-0 w-full h-[250px] opacity_layer_bg"></div>
                </div>
            </div>

            <div className='bg-[#F0FFF0]'>
                {/* Hero Section */}
                <div className='relative h-[450px] md:h-[550px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white'>
                    <Link to={"/signup"}>
                        <div className='z-0 group p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                                    transition-all duration-200 hover:scale-95 w-fit'>
                            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                                        transition-all duration-200 group-hover:bg-richblack-900'>
                                <p>Giúp cuộc sống trở nên cân bằng hơn</p>
                                <FaArrowRight />
                            </div>
                        </div>
                    </Link>

                    <motion.div
                        variants={fadeIn('left', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='text-center text-3xl lg:text-4xl font-semibold mt-7'
                    >
                        Tái tạo năng lượng với
                        <HighlightText text={"HeathyLife"} />
                    </motion.div>

                    <motion.div
                        variants={fadeIn('right', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-richblack-400'
                    >
                        Tham gia khóa học Yoga trực tuyến để cải thiện sức khỏe, giảm căng thẳng, 
                        và tìm lại sự cân bằng trong cuộc sống, với các bài học dễ dàng theo dõi
                        và hỗ trợ từ các chuyên gia hàng đầu.
                    </motion.div>

                    <div className='flex flex-row gap-7 mt-8'>
                        <CTAButton active={true} linkto={"/signup"}>
                            Chi tiết
                        </CTAButton>
                        <CTAButton active={false} linkto={"/login"}>
                            Khám phá cùng chúng tôi
                        </CTAButton>
                    </div>
                </div>

                {/* Courses Sections */}
                <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>
                    {/* All Courses Section */}
                    {catalogPageData?.selectedCategory?.courses?.length > 0 && (
                        <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                            <h2 className='text-black mb-6 text-2xl'>
                                Tất cả khóa học
                            </h2>
                            <Course_Slider 
                                Courses={catalogPageData.selectedCategory.courses} 
                            />
                        </div>
                    )}

                    {/* Most Popular Courses Section */}
                    {catalogPageData?.mostSellingCourses?.length > 0 && (
                        <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                            <h2 className='text-black mb-6 text-2xl'>
                                Khóa học phổ biến
                            </h2>
                            <Course_Slider 
                                Courses={catalogPageData.mostSellingCourses} 
                            />
                        </div>
                    )}
                </div>

                {/* Benefits Section */}
                <div className='bg-pure-greys-5 text-richblack-700'>
                    <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                        <div className='flex flex-col lg:flex-row gap-5 mb-10 mt-[95px]'>
                            <div className='text-3xl lg:text-4xl font-semibold w-full lg:w-[45%]'>
                                Duy trì tập luyện đều đặn  
                                <HighlightText text={"Nâng cao sức khỏe"} />
                            </div>

                            <div className='flex flex-col gap-10 w-full lg:w-[40%] items-start'>
                                <div className='text-[16px]'>
                                    Tập yoga không chỉ giúp cải thiện sức khỏe thể chất mà còn hỗ trợ cân bằng tinh thần. 
                                    Hãy biến yoga thành một phần không thể thiếu trong cuộc sống để đạt được sự thư giãn và hạnh phúc.
                                </div>
                                <CTAButton active={true} linkto={"/about"}>
                                    <div>
                                        Tìm hiểu thêm
                                    </div>
                                </CTAButton>
                            </div>
                        </div>
                        <LearningLanguageSection />
                    </div>
                </div>

                {/* Instructors and Reviews Section */}
                <div className='mt-14 w-11/12 mx-auto py-16 max-w-maxContent flex-col items-center justify-between gap-8 bg-[#ebfff7] text-white'>
                    <InstructorSection />
                    <ReviewSlider />
                </div>

                <Footer />
            </div>
        </React.Fragment>
    )
}

export default Home