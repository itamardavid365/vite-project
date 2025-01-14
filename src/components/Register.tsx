import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginUser, registerUser } from "../services/userService";
import User from "../interfaces/User";
import { SiteSettings } from "../App";

interface RegisterProps {

}

const Register: FunctionComponent<RegisterProps> = () => {

    const navigate = useNavigate();

    const { setLoggedIn, setUserDetails } = useContext(SiteSettings)

    const formik: FormikValues = useFormik({
        initialValues: {
            name: {
                firstName: "",
                middleName: "",
                lastName: "",
            },
            phone: "",
            email: "",
            password: "",
            image: {
                imageUrl: "",
                imageDesc: "",
            },
            address: {
                state: "",
                country: "",
                city: "",
                street: "",
                houseNumber: 0,
                zip: 0,
            },
            isBusiness: false
        },
        validationSchema: yup.object({
            name: yup.object({
                firstName: yup.string().required().min(2).label("First name"),
                middleName: yup.string().min(2).label("Middle name"),
                lastName: yup.string().required().min(2).label("Last name"),
            }),
            phone: yup.string().required().matches(
                /^(\+972|972|0)(5[0-9]|[2-4][0-9]|7[2-9])\d{7}$/,
                "Phone number is not valid"
            ),
            email: yup.string().required().email().matches(
                /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/,
                'Email must be from a supported domain (gmail.com, yahoo.com, outlook.com, hotmail.com)'
            ),
            password: yup.string().min(9).required().max(20).matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{9,}$/,
                "Password must contain at least 9 characters, one uppercase letter, one lowercase letter, and one special symbol"
            ),
            image: yup.object({
                imageUrl: yup.string().url().label("Image url"),
                imageDesc: yup.string().min(3).label("Description")
            }),
            address: yup.object({
                state: yup.string().min(2).label("State"),
                country: yup.string().required().min(2).label("Country"),
                city: yup.string().required().min(2).label("City"),
                street: yup.string().required().min(2).label("Street"),
                houseNumber: yup.number().required().label("House number"),
                zip: yup.number().label("Zip")
            }),
            isBusiness: yup.boolean()
        }),
        onSubmit: (values) => {
            const userData: User = {
                name: {
                    first: values.name.firstName,
                    middle: values.name.middleName,
                    last: values.name.lastName,
                },
                phone: values.phone,
                email: values.email,
                password: values.password,
                image: {
                    url: values.image.imageUrl,
                    alt: values.image.imageDesc,
                },
                address: {
                    state: values.address.state,
                    country: values.address.country,
                    city: values.address.city,
                    street: values.address.street,
                    houseNumber: values.address.houseNumber,
                    zip: values.address.zip,
                },
                isBusiness: values.isBusiness,
            };

            registerUser(userData as User)
                .then(() => {
                    alert('Register Success!');
                    loginUser(userData.email, userData.password)
                        .then((loginRes) => {
                            console.log(loginRes.data);
                            sessionStorage.setItem("token", loginRes.data);
                            setLoggedIn(true);
                            setUserDetails({
                                isLoggedIn: true,
                                userToken: loginRes.data,
                            });
                            navigate('/');
                        })
                        .catch((err) => {
                            alert("Wrong password or email");
                            console.error(err);
                        });
                })
                .catch((err) => {
                    alert('User already exists!')
                    console.log(err);

                });
        }
    })




    return (<>
        <div className="container border rounded-2 mt-3 bg-light">
            <h2 className="display-4 p-3">Register</h2>
            <form onSubmit={formik.handleSubmit} className="">
                <div className="row g-3 mb-3">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.name?.firstName && formik.errors.name?.firstName && "is-invalid"}`} id="floatingInputName" placeholder="Jon"
                                name="name.firstName"
                                value={formik.values.name?.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInputName">First name *</label>
                            {formik.touched.name?.firstName && formik.errors.name?.firstName && (
                                <p className="text-danger">{formik.errors.name?.firstName}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.name?.middleName && formik.errors.name?.middleName && "is-invalid"}`} id="floatingInputMiddleName" placeholder="Doe"
                                name="name.middleName"
                                value={formik.values.name?.middleName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInputMiddleName">Middle name</label>
                            {formik.touched.name?.middleName && formik.errors.name?.middleName && (
                                <p className="text-danger">{formik.errors.name?.middleName}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.name?.lastName && formik.errors.name?.lastName && "is-invalid"}`} id="floatingInputLastName" placeholder="David"
                                name="name.lastName"
                                value={formik.values.name?.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInputLastName">Last name *</label>
                            {formik.touched.name?.lastName && formik.errors.name?.lastName && (
                                <p className="text-danger">{formik.errors.name?.lastName}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="email" className={`form-control ${formik.touched.email && formik.errors.email && "is-invalid"}`} id="floatingInputEmail" placeholder="name@example.com"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInputEmail">Email address *</label>
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-danger">{formik.errors.email}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="password" className={`form-control ${formik.touched.password && formik.errors.password && "is-invalid"}`} id="floatingInputPassword" placeholder="Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInputPassword">Password *</label>
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-danger">{formik.errors.password}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.phone && formik.errors.phone && "is-invalid"}`} id="floatingInputPhone" placeholder="050-000-000-000"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInputPhone">Phone *</label>
                            {formik.touched.phone && formik.errors.phone && (
                                <p className="text-danger">{formik.errors.phone}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="url" className={`form-control ${formik.touched.image?.imageUrl && formik.errors.image?.imageUrl && "is-invalid"}`} id="floatingInputImageUrl" placeholder="https://Image.com"
                                name="image.imageUrl"
                                value={formik.values.image?.imageUrl}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInputImageUrl">Image url</label>
                            {formik.touched.image?.imageUrl && formik.errors.image?.imageUrl && (
                                <p className="text-danger">{formik.errors.image?.imageUrl}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.image?.imageDesc && formik.errors.image?.imageDesc && "is-invalid"}`} id="floatingInputImageDescription" placeholder="ImageDescription"
                                name="image.imageDesc"
                                value={formik.values.image?.imageDesc}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInputImageDescription">Image description</label>
                            {formik.touched.image?.imageDesc && formik.errors.image?.imageDesc && (
                                <p className="text-danger">{formik.errors.image?.imageDesc}</p>
                            )}
                        </div>
                    </div>

                </div>
                <div className="row g-3 mb-3">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.address?.state && formik.errors.address?.state && "is-invalid"}`} id="floatingInputState" placeholder="Israel"
                                name="address.state"
                                value={formik.values.address?.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInputState">State</label>
                            {formik.touched.address?.state && formik.errors.address?.state && (
                                <p className="text-danger">{formik.errors.address?.state}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.address?.country && formik.errors.address?.country && "is-invalid"}`} id="floatingInputCountry" placeholder="Israel"
                                name="address.country"
                                value={formik.values.address?.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInputCountry">Country *</label>
                            {formik.touched.address?.country && formik.errors.address?.country && (
                                <p className="text-danger">{formik.errors.address?.country}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.address?.city && formik.errors.address?.city && "is-invalid"}`} id="floatingInputCity" placeholder="Tel Aviv"
                                name="address.city"
                                value={formik.values.address?.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInputCity">City *</label>
                            {formik.touched.address?.city && formik.errors.address?.city && (
                                <p className="text-danger">{formik.errors.address?.city}</p>
                            )}
                        </div>
                    </div>

                </div>
                <div className="row g-3 mb-3">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.address?.street && formik.errors.address?.street && "is-invalid"}`} id="floatingInputStreet" placeholder="Ben Gurion"
                                name="address.street"
                                value={formik.values.address?.street}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInputStreet">Street *</label>
                            {formik.touched.address?.street && formik.errors.address?.street && (
                                <p className="text-danger">{formik.errors.address?.street}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && "is-invalid"}`} id="floatingInputHouse" placeholder="Israel"
                                name="address.houseNumber"
                                value={formik.values.address?.houseNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInputHouse">House number *</label>
                            {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && (
                                <p className="text-danger">{formik.errors.address?.houseNumber}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.address?.zip && formik.errors.address?.zip && "is-invalid"}`} id="floatingInputZip" placeholder="Tel Aviv"
                                name="address.zip"
                                value={formik.values.address?.zip}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingInputZip">Zip</label>
                            {formik.touched.address?.zip && formik.errors.address?.zip && (
                                <p className="text-danger">{formik.errors.address?.zip}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-check d-flex gap-2 p-3 mx-3">
                    <input className="form-check-input" type="checkbox" id="flexCheckDefault"
                        name="isBusiness"
                        value={formik.values.isBusiness}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label className="form-check-label fw-bolder" htmlFor="flexCheckDefault">
                        Signup as business
                    </label>
                </div>
                <div className="row g-3 mt-3">
                    <div className="col-sm-6">
                        <Link to={"/home"} className="btn btn-outline-danger w-100 h-100 p-3">Cancel</Link>
                    </div>
                    <div className="col-sm-6">
                        <button type="button" className="btn btn-outline-info w-100 h-100 p-3" onClick={() => formik.resetForm()}>
                            <i className="fa-solid fa-rotate" />
                        </button>
                    </div>
                </div>
                <div className="row g-3 mt-1">
                    <div className="col">
                        <button type="submit" className="btn btn-success w-100 p-3"
                            disabled={!formik.dirty || !formik.isValid}
                        >Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </>);
}

export default Register;