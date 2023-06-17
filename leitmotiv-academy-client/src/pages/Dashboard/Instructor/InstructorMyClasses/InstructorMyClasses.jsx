import Head3 from "../../../../components/Head3";
import SpaceY10 from "../../../../components/SpaceY10";
import useFirebaseAuth from "../../../../hooks/useFirebaseAuth";
import useGetInstructorCourses from "../../../../hooks/useGetInstructorCourses";
import InstructorClassTableCard from "./sections/InstructorClassTableCard";

const InstructorMyClasses = () => {
  const { user } = useFirebaseAuth();
  const { instructorCourses } = useGetInstructorCourses(user);

  return (
    <SpaceY10>
      <Head3>My Classes</Head3>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label></label>
              </th>
              <th>Class Image</th>
              <th>Class name</th>
              <th>Available seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Enrolled student</th>
              <th>Feedback</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {instructorCourses.map((course, index) => {
              return (
                <InstructorClassTableCard
                  key={course._id}
                  course={course}
                  index={index}
                />
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
              <th>Class name</th>
              <th>Available seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Enrolled student</th>
              <th>Feedback</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </SpaceY10>
  );
};

export default InstructorMyClasses;
