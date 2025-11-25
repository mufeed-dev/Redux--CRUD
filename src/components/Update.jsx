import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.app);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    age: Yup.number()
      .min(1, "Age must be at least 1")
      .max(120, "Age must be less than 120")
      .required("Age is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female"], "Please select a gender")
      .required("Gender is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      gender: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updateUser({ ...values, id }));
      navigate("/");
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (id) {
      const singleUser = users.filter((ele) => ele.id === id);
      if (singleUser[0]) {
        formik.setValues(singleUser[0]);
      }
    }
  }, [id, users]);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-warning text-dark">
              <h2 className="h4 mb-0">Edit User Data</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control form-control-lg ${
                      formik.touched.name && formik.errors.name
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control form-control-lg ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Age</label>
                  <input
                    type="number"
                    name="age"
                    className={`form-control form-control-lg ${
                      formik.touched.age && formik.errors.age
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.age && formik.errors.age && (
                    <div className="invalid-feedback">{formik.errors.age}</div>
                  )}
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
                        checked={formik.values.gender === "Male"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
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
                        checked={formik.values.gender === "Female"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="female-radio"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                  {formik.touched.gender && formik.errors.gender && (
                    <div className="text-danger small mt-1">
                      {formik.errors.gender}
                    </div>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary flex-fill"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-warning flex-fill"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
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
