const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
    textAlign: "center",
    padding: "1rem",
    backgroundColor: "#f8f8f8",
    borderTop: "1px solid #ddd",
  };

  return (
    <div style={footerStyle}>
      <em>Blog app by miti</em>
    </div>
  );
};

export default Footer;
