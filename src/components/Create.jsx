import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../features/userDetailSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(createUser(values));
      navigate("/");
    },
  });

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="h4 mb-0">Fill the Data</h2>
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    required
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    required
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.age}
                    required
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.gender === "Male"}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.gender === "Female"}
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

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
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
