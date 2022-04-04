import React, { useState } from "react";
import Layout from "../components/Layout";
import { Field, Formik } from "formik";
import { InputFields } from "../components/fields/InputFields";
import axios from "axios";

export default () => {

    const [registered, setRegistered] = useState(false);

    return (
        <Layout title="Register page">
            <Formik 
            onSubmit={async (data) => {
                await axios.post(`http://localhost:3001/users/create`, data)
                    .then(data => {
                        if (data.status) {
                            setRegistered(true);
                        }
                    });
            }}
            initialValues={{
                username: '',
                password: ''
            }}>
                {({handleSubmit}) => 
                    <div  className="col-md-4 offset-md-4">
                        {registered ? <div className="alert alert-success" role="alert">User successfully registered!</div> : <div></div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-outline mb-4">
                                <label className="form-label">Username</label>
                                <Field name="username" component={InputFields}/>
                            </div>
                        
                            <div className="form-outline mb-4">
                                <label className="form-label" >Password</label>
                                <Field type="password" name="password" component={InputFields}/>
                            </div>

                            <button type="submit" className="btn btn-success btn-block mb-4" >Register</button>
                        </form>
                    </div>
                    }
            </Formik>
            
        </Layout>
    )
}