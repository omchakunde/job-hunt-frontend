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

const API_BASE_URL =
  process.env.REACT_APP_SERVER_URL ||
  "https://job-hunt-3-jqng.onrender.com";

const Register = () => {
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
      .post(`${API_BASE_URL}/auth/signup`, values) // ✅ FIXED
      .then((res) => {
        setShowSpinner(false);
        toast.success(res.data.message);
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        setShowSpinner(false);
        toast.error(err.response?.data?.message || "Signup failed");
        console.error(err);
      });
  };

  return (
    <>
      <Header />
      <Container>
        <h1 className="p-3 text-center" style={{ color: "#2c49ed" }}>
          Register
        </h1>

        {showSpinner && <SpinnerComponent />}

        <Row>
          <Col lg={7} className={`${classes.formContainer} p-5 m-auto`}>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                name: Yup.string().min(4).required(),
                email: Yup.string().email().required(),
                password: Yup.string().min(6).required(),
                mobile: Yup.string().length(10).required(),
                age: Yup.number().min(18).max(60).required(),
                gender: Yup.string().required(),
                qualification: Yup.string().required(),
              })}
              onSubmit={formSubmitHandler}
            >
              <Form>
                <TextInput label="Name" name="name" />
                <TextInput label="Email" name="email" />
                <TextInput label="Password" name="password" type="password" />
                <TextInput label="Mobile No" name="mobile" />

                <NumberInput label="Age" name="age" />

                <label>Gender *</label>
                <div>
                  <Field type="radio" name="gender" value="Male" /> Male
                  <Field type="radio" name="gender" value="Female" /> Female
                </div>

                <SelectInput name="qualification" label="Qualification">
                  <option value="">Select</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                </SelectInput>

                <SelectInput name="experience" label="Experience">
                  <option value="">Select</option>
                  <option value="0-2">0-2</option>
                  <option value="3-7">3-7</option>
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
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
