import Layout from "../components/Layout"
import axios from "axios"
import { useEffect, useState } from "react"
import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import FreightsInterface  from '../interfaces/freights';
import { Cookies, useCookies } from 'react-cookie';
import { useRouter } from "next/router";

type Props = {
    freights: FreightsInterface[],
}

const Freights: NextPage<Props> = ({ freights }) => {
    return (
        <Layout title="Freights page">
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Owner's number</th>
                            <th scope="col">Owner's e-mail</th>
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