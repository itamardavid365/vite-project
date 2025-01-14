import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from 'yup';
import { AddCard } from "../interfaces/Card";
import { createCard } from "../services/cardService";
import { useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbackService";


interface CreateCardProps {

}

const CreateCard: FunctionComponent<CreateCardProps> = () => {

    const navigate = useNavigate();

    const formik: FormikValues = useFormik({
        initialValues: {
            title: "",
            subtitle: "",
            description: "",
            phone: "",
            email: "",
            web: "",
            image: {
                url: "",
                alt: "",
            },
            address: {
                state: "",
                country: "",
                city: "",
                street: "",
                houseNumber: 0,
                zip: 0
            }
        },
        validationSchema: yup.object({
            title: yup.string().required().min(2),
            subtitle: yup.string().required().min(2),
            description: yup.string().required().min(2),
            phone: yup.string().required().matches(/^05\d{8}$/, "Not valid phone"),
            email: yup
                .string()
                .required("Email is required")
                .email("email address is not valid").matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "email address is not valid"),
            web: yup.string().url(),
            image: yup.object({
                url: yup.string().url().label('url'),
                alt: yup.string().min(3).label('Image description'),
            }),
            address: yup.object({
                state: yup.string().label("state"),
                country: yup.string().required().label("country"),
                city: yup.string().required().label("city"),
                street: yup.string().required().label("street"),
                houseNumber: yup.number().typeError("Must be a number").required().label("House Number").positive("must be a positive number"),
                zip: yup.number().typeError("Must be a number").label("zip")
            }),
        }),
        onSubmit: (values) => {
            createCard(values as AddCard).then((res) => {
                successMsg(`${res.data.title} was added successfuly`);
                navigate("/my-cards");
            }).catch((err) => console.log(err))

        }

    })





    return (<>
        <div className="container border rounded-2 mt-3 bg-light">
            <h2 className="display-4 p-3">Create Card</h2>
            <form onSubmit={formik.handleSubmit} className="">
                <div className="row g-3 mb-3">

                    {/* title  */}
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.title && formik.errors.title && "is-invalid"}`} id="floatingTitle" placeholder="Title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingTitle">Title *</label>
                            {formik.touched.title && formik.errors.title && (
                                <p className="text-danger">{formik.errors.title}</p>
                            )}
                        </div>
                    </div>

                    {/* subtitle */}
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.subtitle && formik.errors.subtitle && "is-invalid"}`} id="floatingSubtitle" placeholder="Subtitle"
                                name="subtitle"
                                value={formik.values.subtitle}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingSubtitle">Subtitle *</label>
                            {formik.touched.subtitle && formik.errors.subtitle && (
                                <p className="text-danger">{formik.errors.subtitle}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row g-3 mb-3">

                    {/* description */}
                    <div className="col">
                        <div className="form-floating">
                            <textarea className={`form-control ${formik.touched.description && formik.errors.description && "is-invalid"}`} id="floatingDescription" placeholder="Description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{ height: "100px" }}
                            />
                            <label htmlFor="floatingDescription">Description *</label>
                            {formik.touched.description && formik.errors.description && (
                                <p className="text-danger">{formik.errors.description}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    {/* phone  */}
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.phone && formik.errors.phone && "is-invalid"}`} id="floatingPhone" placeholder="Phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingPhone">Phone *</label>
                            {formik.touched.phone && formik.errors.phone && (
                                <p className="text-danger">{formik.errors.phone}</p>
                            )}
                        </div>
                    </div>
                    {/* email  */}
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="email" className={`form-control ${formik.touched.email && formik.errors.email && "is-invalid"}`} id="floatingEmail" placeholder="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingEmail">Email *</label>
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-danger">{formik.errors.email}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    {/* web  */}
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="url" className={`form-control ${formik.touched.web && formik.errors.web && "is-invalid"}`} id="floatingWeb" placeholder="Website"
                                name="web"
                                value={formik.values.web}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingWeb">Website</label>
                            {formik.touched.web && formik.errors.web && (
                                <p className="text-danger">{formik.errors.web}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    {/* image url  */}
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="url" className={`form-control ${formik.touched.image?.url && formik.errors.image?.url && "is-invalid"}`} id="floatingImageUrl" placeholder="Image URL"
                                name="image.url"
                                value={formik.values.image?.url}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingImageUrl">Image URL</label>
                            {formik.touched.image?.url && formik.errors.image?.url && (
                                <p className="text-danger">{formik.errors.image?.url}</p>
                            )}
                        </div>
                    </div>
                    {/* image alt  */}
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.image?.alt && formik.errors.image?.alt && "is-invalid"}`} id="floatingImageAlt" placeholder="Image Alt"
                                name="image.alt"
                                value={formik.values.image?.alt}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingImageAlt">Image Alt</label>
                            {formik.touched.image?.alt && formik.errors.image?.alt && (
                                <p className="text-danger">{formik.errors.image?.alt}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    {/* state */}
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.address?.state && formik.errors.address?.state && "is-invalid"}`} id="floatingState" placeholder="state"
                                name="address.state"
                                value={formik.values.address?.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingState">State</label>
                            {formik.touched.address?.state && formik.errors.address?.state && (
                                <p className="text-danger">{formik.errors.address?.state}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md">
                        {/* country  */}
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.address?.country && formik.errors.address?.country && "is-invalid"}`} id="floatingCountry" placeholder="Country"
                                name="address.country"
                                value={formik.values.address?.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingCountry">Country *</label>
                            {formik.touched.address?.country && formik.errors.address?.country && (
                                <p className="text-danger">{formik.errors.address?.country}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md">
                        {/* city  */}
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.address?.city && formik.errors.address?.city && "is-invalid"}`} id="floatingCity" placeholder="City"
                                name="address.city"
                                value={formik.values.address?.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingCity">City *</label>
                            {formik.touched.address?.city && formik.errors.address?.city && (
                                <p className="text-danger">{formik.errors.address?.city}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    {/* street */}
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.address?.street && formik.errors.address?.street && "is-invalid"}`} id="floatingStreet" placeholder="street"
                                name="address.street"
                                value={formik.values.address?.street}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingStreet">Street *</label>
                            {formik.touched.address?.street && formik.errors.address?.street && (
                                <p className="text-danger">{formik.errors.address?.street}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md">
                        {/* house number  */}
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && "is-invalid"}`} id="floatingHouseNumber"
                                name="address.houseNumber"
                                value={formik.values.address?.houseNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingHouseNumber">House number *</label>
                            {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && (
                                <p className="text-danger">{formik.errors.address?.houseNumber}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md">
                        {/* zip  */}
                        <div className="form-floating">
                            <input type="text" className={`form-control ${formik.touched.address?.zip && formik.errors.address?.zip && "is-invalid"}`} id="floatingZip" placeholder="Zip"
                                name="address.zip"
                                value={formik.values.address?.zip}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingZip">Zip</label>
                            {formik.touched.address?.zip && formik.errors.address?.zip && (
                                <p className="text-danger">{formik.errors.address?.zip}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col">
                        <button type="submit" className="btn btn-success w-100 p-3" disabled={!formik.dirty || !formik.isValid}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>

    </>);
}

export default CreateCard;