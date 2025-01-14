import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetCard } from "../interfaces/Card";
import { getCardById } from "../services/cardService";

interface CardDetailsProps {

}

const CardDetails: FunctionComponent<CardDetailsProps> = () => {
    const { id } = useParams();
    const [card, setCard] = useState<GetCard>();
    useEffect(() => {
        getCardById(id as string).then((res) => setCard(res.data)).catch((err) => console.log(err))
    }, [id])

    const navigate = useNavigate();

    return (<>
        <div className="container mt-5">
            {card ? (
                <div className="card shadow-lg rounded">
                    <div className="row g-0">

                        <div className="col-md-5">
                            <img
                                src={card.image.url}
                                className="img-fluid rounded-start"
                                alt={card.image.alt || "Card Image"}
                                style={{ objectFit: "cover", height: "100%" }}
                            />
                        </div>


                        <div className="col-md-7">
                            <div className="card-body p-4">
                                <h2 className="card-title text-primary">{card.title}</h2>
                                <h5 className="card-subtitle text-muted">{card.subtitle}</h5>
                                <p className="card-text mt-3">{card.description}</p>

                                <div className="mt-4">
                                    <h6 className="text-secondary">Contact Information</h6>
                                    <ul className="list-unstyled">
                                        <li>
                                            <strong>Phone:</strong> {card.phone}
                                        </li>
                                        <li>
                                            <strong>Email:</strong> {card.email}
                                        </li>
                                        {card.web && (
                                            <li>
                                                <strong>Website:</strong>{" "}
                                                <a href={card.web} target="_blank" rel="noopener noreferrer">
                                                    {card.web}
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                <div className="mt-4">
                                    <h6 className="text-secondary">Address</h6>
                                    <p className="mb-0">
                                        {card.address.street} {card.address.houseNumber},{" "}
                                        {card.address.city}, {card.address.state || ""}{" "}
                                        {card.address.zip}, {card.address.country}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <small className="text-muted">
                                        <strong>Created At:</strong> {new Date(card.createdAt).toLocaleDateString()}
                                    </small>
                                </div>

                                <button
                                    className="btn btn-info mt-4"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center mt-5">
                    <h3>Loading card details...</h3>
                </div>
            )}
        </div>
    </>);
}

export default CardDetails;