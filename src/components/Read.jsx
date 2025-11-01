import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";

const Read = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [radioData, setRadioData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const { users, loading, searchData } = useSelector((state) => state.app);

  const handleDeleteClick = (userId, userName) => {
    setUserToDelete({ id: userId, name: userName });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {showDeleteModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete user{" "}
                <strong>"{userToDelete?.name}"</strong>? This action cannot be
                undone.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPopup && <CustomModal id={id} setShowPopup={setShowPopup} />}

      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
              <h2 className="h4 mb-0">All Users</h2>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Filter by Gender:
                  </label>
                  <div className="d-flex flex-wrap gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="gender"
                        id="all-radio"
                        checked={radioData === ""}
                        type="radio"
                        onChange={(e) => setRadioData("")}
                      />
                      <label className="form-check-label" htmlFor="all-radio">
                        All
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="gender"
                        id="male-radio"
                        checked={radioData === "Male"}
                        value="Male"
                        type="radio"
                        onChange={(e) => setRadioData(e.target.value)}
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
                        checked={radioData === "Female"}
                        type="radio"
                        onChange={(e) => setRadioData(e.target.value)}
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
              </div>

              <div className="row">
                {users &&
                  users
                    .filter((ele) => {
                      if (searchData.length === 0) {
                        return ele;
                      } else {
                        return ele.name
                          .toLowerCase()
                          .includes(searchData.toLowerCase());
                      }
                    })
                    .filter((ele) => {
                      if (radioData === "Male") {
                        return ele.gender === radioData;
                      } else if (radioData === "Female") {
                        return ele.gender === radioData;
                      } else return ele;
                    })
                    .map((ele) => (
                      <div
                        key={ele.id}
                        className="col-12 col-md-6 col-lg-4 mb-3"
                      >
                        <div className="card h-100 shadow-sm">
                          <div className="card-body">
                            <h5 className="card-title text-primary">
                              {ele.name}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                              {ele.email}
                            </h6>
                            <div className="d-flex justify-content-between text-sm">
                              <span className="badge bg-info">
                                {ele.age} years
                              </span>
                              <span className="badge bg-secondary">
                                {ele.gender}
                              </span>
                            </div>
                          </div>
                          <div className="card-footer bg-transparent">
                            <div className="btn-group w-100" role="group">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => [
                                  setId(ele.id),
                                  setShowPopup(true),
                                ]}
                              >
                                View
                              </button>
                              <Link
                                to={`/edit/${ele.id}`}
                                className="btn btn-outline-warning btn-sm"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() =>
                                  handleDeleteClick(ele.id, ele.name)
                                }
                                className="btn btn-outline-danger btn-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                {users &&
                  users.filter((user) => {
                    if (searchData.length === 0 && radioData === "")
                      return true;
                    if (searchData.length > 0) {
                      return user.name
                        .toLowerCase()
                        .includes(searchData.toLowerCase());
                    }
                    if (radioData !== "") {
                      return user.gender === radioData;
                    }
                    return true;
                  }).length === 0 && (
                    <div className="col-12">
                      <div className="text-center py-5">
                        <i className="bi bi-people display-1 text-muted"></i>
                        <h4 className="text-muted mt-3">No users found</h4>
                        <p className="text-muted">
                          Try adjusting your search or filter criteria.
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Read;
