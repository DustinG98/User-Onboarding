import React from "react";
import { withFormik, Form, Field } from "formik";

//name
//email
//password
//TOS(checkbox)
//Submit BTN

const UserForm = ({ values }) => {
    return (
        <Form>
            <div>
                <Field type="text" name="name" placeholder="Name"/>
            </div>
            <div>
                <Field type="email" name="email" placeholder="Email Address"/>
            </div>
            <div>
                <Field type="password" name="password" placeholder="Password"/>
            </div>
            <div>
                <label>
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
    handleSubmit(values) {
        console.log(values)
    }
})(UserForm);

export default FormikUserForm