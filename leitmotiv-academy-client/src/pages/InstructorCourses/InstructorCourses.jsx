import { useParams } from "react-router-dom";
import useGetInstructor from "../../hooks/useGetInstructor";
import useGetInstructorCourses from "../../hooks/useGetInstructorCourses";
import CourseCard from "../../components/CourseCard";
import Head1 from "../../components/Head1";

const InstructorCourses = () => {
  const params = useParams();

  const { instructor } = useGetInstructor(params.id);

  const { instructorCourses } = useGetInstructorCourses(instructor);

  return (
    <div className="container mx-auto mb-7 mt-3 space-y-10 px-5 md:px-0">
      <Head1>
        Courses by <span className="text-accent">{instructor.name}</span>
      </Head1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {instructorCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default InstructorCourses;
