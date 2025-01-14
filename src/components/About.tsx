import { FunctionComponent, useContext, useEffect, useState } from "react";
import { SiteSettings } from "../App";
import { getUserById } from "../services/userService";
import { errorMsg } from "../services/feedbackService";
import User from "../interfaces/User";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    const { decodedToken } = useContext(SiteSettings);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        getUserById(decodedToken._id).then((res) => {

            setUser(res.data)
        }
        ).catch((err) => {
            errorMsg("Somthing went wrong");
            console.log(new Error(err));
        })

    }, [decodedToken])


    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4 rounded">
                <div className="row g-4 align-items-center">
                    <div className="col-md-4 text-center">
                        <img
                            src={user?.image?.url}
                            alt={user?.image?.alt || "User Image"}
                            className="img-fluid rounded-circle"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                        <h5 className="mt-3">{`${user?.name.first} ${user?.name.middle || ""} ${user?.name.last}`}</h5>
                        <p className="text-muted">{user?.isBusiness ? "Business User" : "Regular User"}</p>
                    </div>
                    <div className="col-md-8">
                        <h4 className="mb-3 text-primary">About Me</h4>
                        <p className="mb-4 text-muted">
                            Below are my personal and contact details.
                        </p>

                        <div className="row mb-3">
                            <div className="col-6">
                                <strong>Phone:</strong>
                                <p>{user?.phone}</p>
                            </div>
                            <div className="col-6">
                                <strong>Email:</strong>
                                <p>{user?.email}</p>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-6">
                                <strong>Address:</strong>
                                <p>
                                    {`${user?.address.street} ${user?.address.houseNumber}, ${user?.address.city}, 
                                    ${user?.address.state || ""} ${user?.address.zip}, ${user?.address.country}`}
                                </p>
                            </div>
                            <div className="col-6">
                                <strong>Account Type:</strong>
                                <p>{user?.isBusiness ? "Business" : "Personal"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;