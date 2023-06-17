import Head1 from "../../../components/Head1";
import InsctuctorCard from "../../../components/InsctuctorCard";
import useGetAllInstructors from "../../../hooks/useGetAllInstructors";

const PopularInstructorsSection = () => {
  const { allInstructors } = useGetAllInstructors();

  const sixInstructors = allInstructors.slice(0, 6);

  return (
    <div className="space-y-6">
      <Head1>Popular Instructors</Head1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {sixInstructors.map((instructor) => (
          <InsctuctorCard key={instructor._id} instructor={instructor} />
        ))}
      </div>
    </div>
  );
};

export default PopularInstructorsSection;
