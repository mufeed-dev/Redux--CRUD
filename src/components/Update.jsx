import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });
  const { users } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const singleUser = users.filter((ele) => ele.id === id);
      if (singleUser[0]) {
        setUpdateData(singleUser[0]);
      }
    }
  }, [id, users]);

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-warning text-dark">
              <h2 className="h4 mb-0">Edit User Data</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg"
                    value={updateData.name}
                    onChange={newData}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    value={updateData.email}
                    onChange={newData}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="form-control form-control-lg"
                    value={updateData.age}
                    onChange={newData}
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
                        checked={updateData.gender === "Male"}
                        onChange={newData}
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
                        checked={updateData.gender === "Female"}
                        onChange={newData}
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

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary flex-fill"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-warning flex-fill">
                    Update User
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

export default Update;
