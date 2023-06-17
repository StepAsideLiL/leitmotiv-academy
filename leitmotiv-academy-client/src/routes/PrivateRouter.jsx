import PropTypes from "prop-types";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { user, isAuthLoading } = useFirebaseAuth();

  if (isAuthLoading) {
    return (
      <>
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="h-10  w-10 animate-spin rounded-full border-4 border-t-4 border-blue-500"></div>
        </div>
      </>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};

PrivateRouter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRouter;
