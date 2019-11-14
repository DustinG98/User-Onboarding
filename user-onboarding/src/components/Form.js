import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import Users from './Users'
//name
//email
//password
//TOS(checkbox)
//Submit BTN

const UserForm = ({ values, errors, touched, status }) => {
      //user state
    const [users, addUser] = useState([]);

    //add user function


    useEffect(() => {
        const addNewUser = (user) => {
            const newUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            tos: user.tos
            }
            addUser([...users, newUser] )
        }
        if(status) {
            addNewUser(status)
        }
    }, [status, users])

    return (
        <div>
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
            <div>
                <Users users={users}/>
            </div>
        </div>
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

    handleSubmit(values, { props, resetForm, setStatus, setSubmitting }) {
        console.log(props)
        axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                console.log(res);
                setStatus(res.data)
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err);
                setSubmitting(false);
            })
    }
})(UserForm);

export default FormikUserForm