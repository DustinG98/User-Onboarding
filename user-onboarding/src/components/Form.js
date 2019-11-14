import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios'
//name
//email
//password
//TOS(checkbox)
//Submit BTN

const UserForm = ({ values, errors, touched }) => {
    return (
        <Form>
            <div>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field type="text" name="name" placeholder="Name"/>
            </div>
            <div>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type="email" name="email" placeholder="Email Address"/>
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="Password"/>
            </div>
            <div>
                <label>
                    {touched.tos && errors.tos && <p>{errors.tos}</p>}
                    <Field type="checkbox" name="tos" checked={values.tos}/>
                    Accept TOS
                </label>
            </div>
            <button>Submit!</button>
        </Form>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        }  
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(2, "Name must be at least 2 characters long")
            .required("Name is required"),
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be 6 characters or longer")
            .required("Password is required"),
        tos: Yup.bool()
            .oneOf([true], "Must Accept Terms and Conditions")
    }),

    handleSubmit(values) {
        console.log(values)
    }
})(UserForm);

export default FormikUserForm