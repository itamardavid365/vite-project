import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginUser } from "../services/userService";
import { SiteSettings } from "../App";
import { errorMsg, successMsg } from "../services/feedbackService";

interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {

    const navigate = useNavigate();
    const { setLoggedIn, setUserDetails } = useContext(SiteSettings)


    const formik: FormikValues = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().required().email().min(5),
            password: yup.string().required().min(7).max(20)
        }),
        onSubmit: (values) => {
            loginUser(values.email, values.password).then((res) => {
                sessionStorage.setItem("token", res.data)
                setLoggedIn(true)
                setUserDetails({
                    isLoggedIn: true,
                    userToken: res.data
                })
                successMsg(`Successful login !`);
                navigate('/');

            }).catch((err) => {
                errorMsg("wrong password or email")
                console.log(err)
            })
        }
    })





    return (
        <div className="d-flex flex-column justify-content-evenly align-items-center vh-100">
            <div className="">
                <h2 className="display-1">Bcard</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, assumenda!</p>
            </div>
            <div className="bg-primary border bg-light p-4 rounded-2 form-login">
                <h1 className="">Login</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="input-group mb-3" >
                        <div className="form-floating">
                            <input type="text" className="form-control" id="email" placeholder="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="email">Email</label>

                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <div className="form-floating">
                            <input type="password" className="form-control" id="password" placeholder="Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="password">Password</label>

                        </div>
                    </div>
                    <button className="btn btn-info" type="submit" disabled={!formik.isValid || !formik.dirty}>Submit</button>
                    <div>
                        <p className="mt-1">don't have an account? <Link to="/register">Sign up</Link></p>
                    </div>
                </form>
            </div >
        </div >
    );
}

export default Login;