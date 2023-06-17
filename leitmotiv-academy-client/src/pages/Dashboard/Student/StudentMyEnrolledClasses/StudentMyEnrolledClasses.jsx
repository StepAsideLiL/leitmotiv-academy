import Head3 from "../../../../components/Head3";
import SpaceY10 from "../../../../components/SpaceY10";
import useGetEnrolledCourses from "../../../../hooks/useGetEnrolledCourses";

const StudentMyEnrolledClasses = () => {
  const { enrolledCourses } = useGetEnrolledCourses();

  return (
    <SpaceY10>
      <Head3>My Enroll Classes</Head3>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label></label>
              </th>
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Class Price</th>
            </tr>
          </thead>

          <tbody>
            {enrolledCourses.map((course, index) => {
              return (
                <tr key={course._id}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-square h-12 w-12">
                        <img
                          src={course.courseImage}
                          alt={`Profile Picture of ${course.courseName}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{course.courseName}</td>
                  <td>${course.price}</td>
                </tr>
              );
            })}
          </tbody>

          {/* foot */}
          <tfoot>
            <tr>
              <th>
                <label></label>
              </th>
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Class Price</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </SpaceY10>
  );
};

export default StudentMyEnrolledClasses;
