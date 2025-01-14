import { FunctionComponent, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SiteSettings, DecodedToken } from "../App";
import { formatDate } from "../hooks/useFormatDate";
import useCardsPagination, { PaginationOptions } from "../hooks/usePagination";
import { GetCard } from "../interfaces/Card";
import EditCardModel from "./EditCardModel";
import LikeFeacher from "./LikeFeacher";
import { ClipLoader } from "react-spinners";

interface SearchCardProps {

}

const SearchCard: FunctionComponent<SearchCardProps> = () => {

    const { search } = useParams();

    const { loggedIn, decodedToken } = useContext(SiteSettings);
    const { cards, loading, needRender, setNeedRender, } = useCardsPagination(8, { type: PaginationOptions.PageCards });

    const [openModel, setOpenModel] = useState<boolean>(false);
    const [cardToChange, setCardToChange] = useState<GetCard | undefined>(undefined);
    const searchCards = cards.filter((card) => card.title.includes(search as string))







    return (<>
        <div className="container mt-4">
            {loading ? (
                <ClipLoader />
            ) : (<>

                <div className="row g-4">

                    {searchCards.length ? (
                        <>
                            {searchCards.map((card) => (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={card._id}>
                                    <div className="card h-100 position-relative">
                                        {loggedIn && card.user_id == (decodedToken as DecodedToken)._id && (
                                            <div onClick={() => {
                                                setOpenModel(true)
                                                setCardToChange(card)
                                            }} className="position-absolute end-0 p-1 border-2 bg-warning">
                                                <i className="fa-solid fa-pen-to-square" />
                                            </div>)
                                        }
                                        <div className="position-absolute d-flex flex-column">
                                            <i className="fa-solid fa-phone p-2 text-white border border-1 bg-success" />
                                            {loggedIn && (
                                                <LikeFeacher card={card} decodedTokenId={decodedToken._id} />
                                            )}
                                        </div>
                                        <img
                                            src={card.image.url}
                                            className="card-img-top fixed-image"
                                            alt={card.image.alt}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{card.title}</h5>
                                            <p className="card-text truncate-text">{card.description}</p>
                                        </div>
                                        <div className="card-footer d-flex flex-column">
                                            <small className="text-body-secondary">
                                                Created {formatDate(card.createdAt)}
                                            </small>
                                            <Link to={`/card/${card._id}`} className="btn btn-info">Show card</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <h1 className="display-3">no cards</h1>
                        </>
                    )}


                </div>

            </>
            )}

        </div>

        <EditCardModel card={cardToChange} show={openModel} onHide={() => setOpenModel(false)} refresh={() => {
            setNeedRender(!needRender);
            // setCurrentPage(currentPage)
        }}
        />
    </>);
}

export default SearchCard;