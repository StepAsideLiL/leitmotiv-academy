import Head1 from "../../components/Head1";
import InsctuctorCard from "../../components/InsctuctorCard";
import useGetAllInstructors from "../../hooks/useGetAllInstructors";

const Instructors = () => {
  const { allInstructors } = useGetAllInstructors();

  return (
    <div className="container mx-auto mb-7 mt-3 space-y-10 px-5 md:px-0">
      <Head1>Instructors</Head1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {allInstructors.map((instructor) => (
          <InsctuctorCard key={instructor._id} instructor={instructor} />
        ))}
      </div>
    </div>
  );
};

export default Instructors;
