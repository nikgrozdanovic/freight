import Layout from "../components/Layout"
import axios from "axios"
import { GetServerSideProps, NextPage } from "next"
import FreightsInterface  from '../interfaces/freights';
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
    freights: FreightsInterface[],
    cookie: string
}

const Freights: NextPage<Props> = ({ freights, cookie }) => {
    const user = JSON.parse(cookie); 
    const router = useRouter();
    const handleRemoveClick = async (id: string) => {
        await axios.patch(`http://localhost:3001/freights/delete/${id}`, {user: user.user.username})
            .then(() => {
                router.replace(router.asPath)
            })
        
    }

    return (
        <Layout title="List of all Freights" cookie={cookie}>
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    <div className="row">
                       <div className="col-md-10"><h1>List of freights</h1></div>
                       <div className="col-md-2">
                           <Link href={`/freights`}>
                               <button className="btn btn-primary"  style={{marginTop: '10px'}}>New</button>
                           </Link>
                       </div>
                    </div>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Owner's number</th>
                            <th scope="col">Owner's e-mail</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {freights.map((freight) => {
                                return (
                                    <tr key={freight._id}>
                                        <td>{freight.name}</td>
                                        <td>{freight.type}</td>
                                        <td>{freight.weight}</td>
                                        <td>{freight.destination}</td>
                                        <td>{freight.owner_number}</td>
                                        <td>{freight.owner_email}</td>
                                        <td>
                                            <button type="submit" className="btn btn-danger" onClick={() => handleRemoveClick(freight._id)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookie = context.req.cookies.logged ? context.req.cookies.logged : null;

    if(!cookie) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const res = await axios.get(`http://localhost:3001/freights/`);
    const data  = await res.data.freights;
    return {
        props: {
            freights: data,
            cookie: cookie
        }
    }
  }


export default Freights