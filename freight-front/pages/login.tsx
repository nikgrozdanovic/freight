import { useRouter } from "next/router"
import axios from 'axios';
import { useSession } from "next-auth/react"

export default function Login() {
    const router = useRouter();
    const { data: session, status } = useSession();
    console.log(session)

    const handleLogin = (event: any) => {
        event.preventDefault();
        const data = {
            username: event.target.username.value,
            password: event.target.password.value
        }

        axios.post(`http://localhost:3001/login`, data)
            .then(data => {
                console.log(data);
            })
    }

    return (
        <div className="container">
            <div className="col-md-4 offset-md-4 mt-5">
                <h1>Welcome to Freight</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-outline mb-4">
                        <input type="text" name="username"  className="form-control" />
                        <label className="form-label">Username</label>
                    </div>
                
                    <div className="form-outline mb-4">
                        <input type="password" name="password" className="form-control" />
                        <label className="form-label" >Password</label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4" >Sign in</button>
                    
                    <div className="text-center">
                        <p>Not a member? <a href="#!">Register</a></p> 
                    </div>
                </form>
            </div>
        </div>
    )
}