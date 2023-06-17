import SpaceY10 from "../../../../components/SpaceY10";
import Head3 from "../../../../components/Head3";
import useGetEnrolledCourses from "../../../../hooks/useGetEnrolledCourses";

const StudentPaymentHistory = () => {
  const { enrolledCourses } = useGetEnrolledCourses();

  return (
    <SpaceY10>
      <Head3>Payment History</Head3>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label></label>
              </th>
              <th>Transaction ID</th>
              <th>Class Name</th>
              <th>Class Price</th>
              <th>Purchase Date</th>
            </tr>
          </thead>

          <tbody>
            {enrolledCourses.map((course, index) => {
              return (
                <tr key={course._id}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>{course.transactionId}</td>
                  <td>{course.courseName}</td>
                  <td>${course.price}</td>
                  <td>
                    {new Date(course.transactionDate * 1000).toLocaleString()}
                  </td>
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
              <th>Transaction ID</th>
              <th>Class Name</th>
              <th>Class Price</th>
              <th>Purchase Date</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </SpaceY10>
  );
};

export default StudentPaymentHistory;
