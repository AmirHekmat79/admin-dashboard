const Spinner = ({ theme = 'info' }) => {
  return (
    <div className="spinner-wrapper">
      <div className={`spinner-border me-2 text-${theme}`}></div>
    </div>
  );
};

export default Spinner;
