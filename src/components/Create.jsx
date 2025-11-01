import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../features/userDetailSlice";

const Create = () => {
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(users));
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="h4 mb-0">Fill the Data</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg"
                    onChange={getUserData}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    onChange={getUserData}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="form-control form-control-lg"
                    onChange={getUserData}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold d-block">
                    Gender
                  </label>
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="gender"
                        id="male-radio"
                        value="Male"
                        type="radio"
                        onChange={getUserData}
                        required
                      />
                      <label className="form-check-label" htmlFor="male-radio">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="gender"
                        id="female-radio"
                        value="Female"
                        type="radio"
                        onChange={getUserData}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="female-radio"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
