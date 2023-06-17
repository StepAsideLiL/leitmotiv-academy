import Head3 from "../../components/Head3";
import SpaceY10 from "../../components/SpaceY10";
import useGetLoggedinUser from "../../hooks/useGetLoggedinUser";

const DashboardHome = () => {
  const { loggedinUser } = useGetLoggedinUser();

  const { name, email, role, image } = loggedinUser;

  return (
    <SpaceY10>
      <Head3>
        <span className="capitalize">{role}</span> Home
      </Head3>

      <div className="mx-auto flex w-96 gap-5">
        <div>
          <div className="avatar">
            <div className="w-32 rounded">
              <img src={image} alt={`Profile of ${name}`} />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-xl font-semibold">{name}</h1>
          <p>{email}</p>
        </div>
      </div>
    </SpaceY10>
  );
};

export default DashboardHome;
