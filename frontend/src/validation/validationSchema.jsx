import * as Yup from "yup";
const validation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
    .required("Mobile number is required"),
  designation: Yup.string().required("Designation is required"),
  gender: Yup.string().required("Gender is required"),
  courses: Yup.array().min(1, "Select at least one course"),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileType",
      "Only jpg or png files are allowed",
      (value) =>
        value && (value.type === "image/jpg" || value.type === "image/png")
    ),
});

export default validation;
