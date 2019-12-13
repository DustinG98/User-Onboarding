import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import Users from './Users'
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
      minWidth: 600,
      maxWidth: "50%",
      padding: 25,
    },
    input: {
        marginBottom: 20,
        minWidth: "100%",
    },
    title: {
        marginBottom: 20,
        textDecoration: "underline",
        fontWeight: 700,
    },
    error: {
        color: "red",
    },
    users: {
        margin: 20,
    },
    checkbox: {
        width: 15,
        height: 15,
        marginTop: 10,
    }
  });


const UserForm = ({ values, errors, touched, status }) => {
    const classes = useStyles();
      //user state
    const [users, setUsers] = useState([]);

    useEffect(() => {
        //add user function
        const addNewUser = (user) => {
            const newUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            tos: user.tos
            }
            setUsers([...users, newUser] )
        }
        if(status) {
            addNewUser(status)
        }
    }, [status, users])

    //delete user function
    const deleteUser = (id) => {
        let newUsers = users.filter(user => user.id !== id);
        setUsers(newUsers)
    }

    return (
        <div className="form">
        <Card className={classes.card}>
            <Typography className={classes.title} variant="h5" component="h1">Create User</Typography>
            <Form>
                <div className={classes.input}>
                    <Field type="text" name="name" placeholder="Name" component={TextField}/>
                </div>
                <div className={classes.input}>
                    <Field type="email" name="email" placeholder="Email Address" component={TextField}/>
                </div>
                <div className={classes.input}>
                    <Field type="password" name="password" placeholder="Password" component={TextField}/>
                </div>
                <div className={classes.input}>
                    {touched.tos && errors.tos && <p className={classes.error}>{errors.tos}</p>}
                    <label>
                        <Field type="checkbox" className={classes.checkbox} name="tos" checked={values.tos} />
                    
                        Accept TOS
                    </label>
                </div>
                <button type="submit">Submit!</button>
                
            </Form>
        </Card>
            <div className="users">
                {/*Passing users to the Users component to be rendered.*/}
                <Users users={users} deleteUser={deleteUser}/>
            </div>
        </div>
    )
}

const FormikUserForm = withFormik({
    //taking props from form and turning them into values
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || "", //if the name is set it will be the name, otherwise it will be an empty string
            email: email || "",
            password: password || "",
            tos: tos || false, //if the tos is checked it will be true, else it will be false.
        }  
    },
    validationSchema: Yup.object().shape({
        /*Name Errors*/
        name: Yup.string() 
            .min(2, "Name must be at least 2 characters long") 
            .required("Name is required"),
        /*Email Errors*/
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        /*Password Errors*/
        password: Yup.string()
            .min(6, "Password must be 6 characters")
            .required("Password is required"),
        /*TOS Errors*/
        tos: Yup.boolean() 
            .oneOf([true], "Must Accept Terms and Conditions")
    }),

    handleSubmit(values, { resetForm, setStatus, setSubmitting }) {
        axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                setStatus(res.data)//passes data into status state
                resetForm();//resets form after submitting
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err)
                setSubmitting(false);
            })
    }
})(UserForm);

export default FormikUserForm
