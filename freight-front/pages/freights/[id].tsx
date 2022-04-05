import Layout from "../../components/Layout";
import axios from "axios"
import { GetServerSideProps, NextPage } from "next"
import FreightsInterface from "../../interfaces/freights";

type Props = {
    freight: FreightsInterface,
}

const Freights: NextPage<Props> = ({ freight }) => {
    return (
        <Layout title="Freights page">
            <div className="container">
                <div className="col-md-8">
                <div className="row justify-content-center"> <h1 className="center">{freight.name}</h1> </div>
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