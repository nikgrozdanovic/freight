import Layout from "../../components/Layout";
import axios from "axios"
import { GetServerSideProps, NextPage } from "next"
import FreightsInterface from "../../interfaces/freights";
import { Field, Formik } from "formik";
import { useRouter } from "next/router";
import { InputFields } from "../../components/fields/InputFields";

type Props = {
    freight: FreightsInterface,
    cookie: string,
}

const Freights: NextPage<Props> = ({ freight, cookie }) => {
    const router = useRouter();
    return (
        <Layout title="Freights page" cookie={cookie}>
            <div className="container">
                <div className="row">
                    <h1>Edit {freight.name}</h1>
                    <Formik
                    onSubmit={async (data) => {
                        await axios.patch(`http://localhost:3001/freights/update/${freight._id}`, data)
                            .then(data => {
                                if (data.status == 200) {
                                    router.push('/landing');
                                }
                            });

                    }}
                    initialValues={{
                        name: freight.name,
                        type: freight.type,
                        weight: freight.weight,
                        destination: freight.destination,
                        owner_email: freight.owner_email,
                        owner_number: freight.owner_number
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

                                <button type="submit" className="btn btn-success btn-block mb-4" >Save</button>
                            </form>
                        }
                    </Formik>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookie = context.req.cookies.logged ? context.req.cookies.logged : null;
    const freight_id = context.query.id; 

    if(!cookie) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const res = await axios.get(`http://localhost:3001/freights/${freight_id}`);
    const data  = await res.data.freight;

    return {
        props: {
            freight: data,
            cookie: cookie
        }
    }
  }


export default Freights