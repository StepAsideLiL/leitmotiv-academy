import PropTypes from "prop-types";

const Head3 = ({ children }) => {
  return <h3 className="text-center text-2xl font-semibold">{children}</h3>;
};

Head3.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Head3;
