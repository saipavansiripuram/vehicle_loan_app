import React from "react";

const ErrorPage = () => {
  return (
    <div className="container text-center w-25 h-25 mt-5  bg-light border border-grey">
      <div className="row justify-content-center align-items-center p-4">
        <div className="col-12">
          <h4 className="text-danger">Oops! Something Went Wrong</h4>
          <p>Please try again later.</p>
          <img src="alert.png" className="img-fluid" alt="Error Image" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
