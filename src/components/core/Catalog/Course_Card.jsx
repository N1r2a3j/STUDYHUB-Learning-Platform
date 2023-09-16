/*import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {


    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
  export default Course_Card;
}*/

import React, { useEffect, useState } from 'react';
import RatingStars from '../../common/RatingStars';
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../slices/cartSlice';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { toast } from 'react-hot-toast';
import course from '../../../slices/courseSlice';

const Course_Card = ({ course, Height }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  const handleAddToCart = () => {
    if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an instructor. You can't add this course to the cart.");
    } else if (!user) {
      toast.error("Login to add to cart")
      return
    } else if(user&&course?.studentsEnrolled.includes(user?._id)) {
      toast.error("Already Enrolled")
       //dispatch(addToCart(course));
    }
    else
    {
      dispatch(addToCart(course))
    }
  };

  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <>
     
        <div className="">
        <Link to={`/courses/${course._id}`}>
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full rounded-xl object-cover`}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
           
          </div>
          </Link>
          <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
           
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
              >
                Add to Cart
              </button>
            
        </div>
      
    </>
  );
};

export default Course_Card;
