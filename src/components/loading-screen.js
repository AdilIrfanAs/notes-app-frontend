const Loading = () => {
  return (
    <div className="border border-danger vh-100 d-flex justify-content-center align-items-center bg-black opacity-50">
      <div className="fw-bold fs-4 text-white">Please wait....</div>
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );
};

export default Loading;
