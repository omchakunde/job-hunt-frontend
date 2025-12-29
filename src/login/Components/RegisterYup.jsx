import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";
import classes from "./Register.module.css";
import {
  NumberInput,
  SelectInput,
  TextInput,
} from "../../components/dashboard/ManageUsers/AddUsersFormik/fields/FieldInputs";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

/* ✅ BACKEND BASE URL */
const API_BASE_URL =
  process.env.REACT_APP_SERVER_URL ||
  "https://job-hunt-3-jqng.onrender.com";

const Register = (props) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    age: "",
    gender: "",
    qualification: "",
    experience: "",
    role: "User",
  };

  const formSubmitHandler = (values) => {
    setShowSpinner(true);

    axios
      .post(`${API_BASE_URL}/auth/signup`, values) // ✅ FIXED HERE
      .then((res) => {
        setShowSpinner(false);

        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
        });

        navigate("/login", { replace: true });
      })
      .catch((err) => {
        setShowSpinner(false);

        toast.error(
          err.response?.data?.message || "Oops something went wrong",
          {
            position: "top-right",
            autoClose: 5000,
          }
        );

        console.error(err);
      });
  };

  return (
    <React.Fragment>
      <Header />

      <Container>
        <h1 className="p-3 text-center rounded" style={{ color: "#2c49ed" }}>
          Register
        </h1>

        {showSpinner && <SpinnerComponent />}

        <Row className="mb-5">
          <Col
            lg={7}
            md={6}
            sm={12}
            className={`${classes.formContainer} p-5 m-auto shadow-sm rounded-lg`}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                name: Yup.string()
                  .min(4)
                  .max(25)
                  .required("Name is required"),
                email: Yup.string()
                  .email("Invalid email")
                  .required("Email is required"),
                password: Yup.string()
                  .min(6)
                  .required("Password is required"),
                mobile: Yup.string()
                  .matches(/^[0-9]{10}$/, "Must be 10 digits")
                  .required("Mobile number required"),
                gender: Yup.string().required("Gender required"),
                age: Yup.number()
                  .min(18)
                  .max(60)
                  .required("Age required"),
                qualification: Yup.string().required("Qualification required"),
                experience: Yup.string(),
                role: Yup.string(),
              })}
              onSubmit={formSubmitHandler}
            >
              {(formik) => (
                <div className={classes.main}>
                  <Form>
                    <TextInput label="Name" name="name" mandatory="true" />
                    <TextInput label="Email" name="email" mandatory="true" />
                    <TextInput
                      label="Password"
                      name="password"
                      type="password"
                      mandatory="true"
                    />
                    <TextInput
                      label="Mobile No"
                      name="mobile"
                      mandatory="true"
                    />

                    <div className={classes["formInputs__side"]}>
                      <NumberInput
                        label="Age"
                        name="age"
                        mandatory="true"
                      />

                      <div>
                        <label>
                          Gender<span className="text-danger">*</span>
                        </label>
                        <div className={classes.gender}>
                          <label>
                            <Field type="radio" name="gender" value="Male" />
                            Male
                          </label>
                          <label>
                            <Field type="radio" name="gender" value="Female" />
                            Female
                          </label>
                        </div>
                        {formik.errors.gender && (
                          <div className="error">
                            {formik.errors.gender}
                          </div>
                        )}
                      </div>
                    </div>

                    <SelectInput
                      name="qualification"
                      label="Qualification"
                      mandatory="true"
                    >
                      <option value="">Select</option>
                      <option value="Post Graduate">Post Graduate</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Diploma">Diploma</option>
                      <option value="High School">High School</option>
                    </SelectInput>

                    <SelectInput name="experience" label="Experience">
                      <option value="">Select</option>
                      <option value="0-2">0-2</option>
                      <option value="3-7">3-7</option>
                      <option value="7-10">7-10</option>
                      <option value="10-50">10-50</option>
                    </SelectInput>

                    <SelectInput name="role" label="Role">
                      <option value="User">User</option>
                      <option value="Job Provider">Job Provider</option>
                    </SelectInput>

                    <Button type="submit" variant="success" className="mt-4">
                      Register
                    </Button>

                    <Link to="/login">
                      <Button variant="primary" className="mt-4 float-end">
                        Back to Login
                      </Button>
                    </Link>
                  </Form>
                </div>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Register;
