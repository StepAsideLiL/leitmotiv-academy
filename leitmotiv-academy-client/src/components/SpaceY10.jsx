import PropTypes from "prop-types";

const SpaceY10 = ({ children }) => {
  return <div className="space-y-10">{children}</div>;
};

SpaceY10.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SpaceY10;
