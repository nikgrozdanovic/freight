import React, { useState } from "react";
import Layout from "../components/Layout";
import { Field, Formik } from "formik";
import { InputFields } from "../components/fields/InputFields";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter  } from "next/router";
import { NextPage } from "next";

const Home: NextPage = () => {
  const [cookie, setCookie] = useCookies(["logged"]);
  const [wrongPwd, setWrongPwd] = useState('');
  const router = useRouter();

  return (
      <Layout title="Login page">
          <Formik 
          onSubmit={async (data) => {
              await axios.post(`http://localhost:3001/login`, data)
                  .then(data => {
                      console.log(data);
                      if (data.status == 200) {
                            const user: Object = data.data;
                          setCookie("logged", user, {
                              path: "/",
                              maxAge: 36000,
                              sameSite: true
                          });

                          router.push('/landing');
                      }
                  })
                  .catch(err => {
                      setWrongPwd('Wrong password or username, or user does not exist.');
                  });
          }}
          initialValues={{
              username: '',
              password: ''
          }}>
              {({handleSubmit}) => 
                <div className="container">
                    <div  className="col-md-4 offset-md-4">
                    {wrongPwd != '' ? <div className="alert alert-danger" role="alert" style={{marginTop: '10px'}}>{wrongPwd}</div> : <div></div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-outline mb-4">
                                <label className="form-label">Username</label>
                                <Field name="username" component={InputFields}/>
                            </div>
                        
                            <div className="form-outline mb-4">
                                <label className="form-label" >Password</label>
                                <Field type="password" name="password" component={InputFields}/>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-4" >Sign in</button>
                            <div className="text-center">
                                <p>Not a member? <a href="/register">Register</a></p> 
                            </div>
                        </form>

                    </div>
                  </div>
                  }
          </Formik>
      </Layout>
  )
}

export default Home
