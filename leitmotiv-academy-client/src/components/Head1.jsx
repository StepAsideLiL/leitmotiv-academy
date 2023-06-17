import PropTypes from "prop-types";

const Head1 = ({ children }) => {
  return (
    <div className="border-l-4 border-accent px-3 py-2">
      <h3 className="text-4xl font-semibold">{children}</h3>
    </div>
  );
};

Head1.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Head1;
