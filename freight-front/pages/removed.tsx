import Layout from "../components/Layout"
import axios from "axios"
import { GetServerSideProps, NextPage } from "next"
import Removed  from '../interfaces/removed';

import Link from "next/link";

type Props = {
    removed: Removed[]
}

const Removed: NextPage<Props> = ({ removed }) => {

    return (
        <Layout title="List of all removed Freights">
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    <div className="row">
                       <div className="col-md-10"><h1>List of removed freights</h1></div>
                    </div>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Weight</th>
                                <th scope="col">User</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {removed.map((rm) => {
                                return (
                                    <tr key={rm._id}>
                                        <td>{rm.name}</td>
                                        <td>{rm.type}</td>
                                        <td>{rm.weight}</td>
                                        <td>{rm.username}</td>
                                        <td>
                                            {new Date(rm.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
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

    const res = await axios.get(`http://localhost:3001/removed/`);
    const data  = await res.data.freights;
    return {
        props: {
            removed: data,
        }
    }
  }


export default Removed