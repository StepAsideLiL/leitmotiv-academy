import CourseCard from "../../components/CourseCard";
import Head1 from "../../components/Head1";
import useGetAllCoursesApproved from "../../hooks/useGetAllCoursesApproved";

const Classes = () => {
  const { allCoursesApproved } = useGetAllCoursesApproved();

  return (
    <div className="container mx-auto mb-7 mt-3 space-y-10 px-5 md:px-0">
      <Head1>Classes</Head1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {allCoursesApproved.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Classes;
