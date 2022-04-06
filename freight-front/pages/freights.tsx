import Layout from "../components/Layout"
import { Formik } from "formik";
import axios from "axios";
import { Field } from "formik";
import { InputFields } from "../components/fields/InputFields";
import { useRouter } from "next/router";

const AddFreight = () => {
    const router = useRouter();
    return (
        <Layout title="Add new freights">
            <div className="container">
                <div className="row">
                    <h1>Add new freight</h1>
                    <Formik 
                    onSubmit={async (data) => {
                        await axios.post(`http://localhost:3001/freights/create`, data)
                            .then(data => {
                                if (data.status == 200) {
                                    router.push('/landing');
                                }
                            });

                    }}
                    initialValues={{
                        name: '',
                        type: '',
                        weight: 0,
                        destination: '',
                        owner_email: '',
                        owner_number: ''
                    }}>
                        {({handleSubmit}) => 
                            
                            
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <label className="form-label" >Name</label>
                                    <Field type="text" name="name" component={InputFields} placeholder="Name..."/>
                                </div>
                            
                                <div className="form-outline mb-4">
                                    <label className="form-label" >Type</label>
                                    <Field type="text" name="type" component={InputFields} placeholder="Type..."/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label">Weight</label>
                                    <Field type="number" name="weight" component={InputFields} placeholder="Weight..."/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label">Destination</label>
                                    <Field type="text" name="destination" component={InputFields} placeholder="Destination..."/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" >Owner's e-mail</label>
                                    <Field type="email" name="owner_email" component={InputFields} placeholder="E-mail of the owner..."/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" >Owner's number</label>
                                    <Field type="text" name="owner_number" component={InputFields} placeholder="Phone number of the owner..."/>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mb-4" >Add</button>
                            </form>
                            
                            }
                    </Formik>
                </div>
            </div>
        </Layout>
    )
}

export default AddFreight