import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div style={{ margin: '1rem auto', maxWidth: '500px', textAlign: 'center' }}>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} style={buttonStyle}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div style={cardStyle}>
          {props.children}
          <button onClick={toggleVisibility} style={cancelButtonStyle}>Cancel</button>
        </div>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#0077cc',
  color: '#fff',
  border: 'none',
  borderRadius: '15px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#999',
  borderRadius: '15px',
  marginTop: '10px',
};

const cardStyle = {
  padding: '1rem',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
};

export default Togglable;
