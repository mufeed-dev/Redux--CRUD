import { useSelector } from "react-redux";
import "./CustomModal.css";

const CustomModal = ({ id, setShowPopup }) => {
  const allusers = useSelector((state) => state.app.users);
  const singleUser = allusers.filter((ele) => ele.id === id);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  const getGenderBadgeClass = (gender) => {
    return gender === "Male"
      ? "gender-badge gender-male"
      : "gender-badge gender-female";
  };

  return (
    <div className="modalBackground" onClick={() => setShowPopup(false)}>
      <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-primary mb-0 fw-bold">User Profile</h3>
          <button
            className="close-btn"
            onClick={() => setShowPopup(false)}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="user-avatar">{getInitial(singleUser[0]?.name)}</div>

        <div className="user-details">
          <div className="detail-item">
            <div className="flex-grow-1">
              <div className="detail-label">Full Name</div>
              <div className="detail-value fs-5 fw-bold text-primary">
                {singleUser[0]?.name}
              </div>
            </div>
          </div>

          <div className="detail-item">
            <div className="flex-grow-1">
              <div className="detail-label">Email Address</div>
              <div className="detail-value">
                <a
                  href={`mailto:${singleUser[0]?.email}`}
                  className="text-decoration-none text-break"
                >
                  {singleUser[0]?.email}
                </a>
              </div>
            </div>
          </div>

          <div className="detail-item">
            <div className="flex-grow-1">
              <div className="detail-label">Age</div>
              <div className="detail-value">
                <span className="badge bg-info text-dark fs-6">
                  {singleUser[0]?.age} years old
                </span>
              </div>
            </div>
          </div>

          <div className="detail-item">
            <div className="flex-grow-1">
              <div className="detail-label">Gender</div>
              <div className="detail-value">
                <span className={getGenderBadgeClass(singleUser[0]?.gender)}>
                  {singleUser[0]?.gender}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-primary"
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
