import { FunctionComponent, useContext, useState } from "react";
import { DecodedToken, SiteSettings } from "../App";
import { Link } from "react-router-dom";
import { formatDate } from "../hooks/useFormatDate";
import { PaginationOptions } from "../hooks/usePagination";
import useCardsPagination from "../hooks/usePagination";
import LikeFeacher from "./LikeFeacher";
import EditCardModel from "./EditCardModel";
import { GetCard } from "../interfaces/Card";
import { cardDelete } from "../services/cardService";
import { errorMsg, successMsg } from "../services/feedbackService";
import { ClipLoader } from "react-spinners";

interface MyCardsProps {

}

const MyCards: FunctionComponent<MyCardsProps> = () => {
    const { decodedToken, loggedIn } = useContext(SiteSettings);

    const [openModel, setOpenModel] = useState<boolean>(false);
    const [cardToChange, setCardToChange] = useState<GetCard | undefined>(undefined);





    const { setNeedRender, needRender, currentCards, setCurrentPage, pageNumbers, currentPage, loading } = useCardsPagination(8, { type: PaginationOptions.PageMyCards });

    const handleDelete = (cardId: string, cardBizNum: number) => {
        if (window.confirm("Are you sure ? Warning!!!")) {
            cardDelete(cardId, cardBizNum).then(() => {
                successMsg("Card was deleted successfully");
                setNeedRender(!needRender);
            }).catch((err) => errorMsg(`problem found: ${err}`))
        }
    }





    return (<>
        <div className="container mt-4">
            {loading ? (
                <ClipLoader />
            ) : (<>
                {pageNumbers.length > 1 && (<nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center flex-wrap">
                        <li className="page-item"><a className="page-link" onClick={() => {
                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}>Previous</a></li>
                        {
                            pageNumbers.map((pageNum) => (
                                <li className={`page-item ${pageNum == currentPage && 'active'}`} key={pageNum}><a className="page-link"
                                    onClick={() => setCurrentPage(pageNum)}
                                >{pageNum}</a></li>
                            ))
                        }
                        <li className="page-item"><a className="page-link"
                            onClick={() => {
                                if (currentPage < pageNumbers.length) setCurrentPage(currentPage + 1);
                            }}
                        >Next</a></li>
                    </ul>
                </nav>)}
                <div className="row g-4">
                    {currentCards.map((card) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={card._id}>
                            <div className="card h-100 position-relative">
                                {loggedIn && card.user_id == (decodedToken as DecodedToken)._id && (<div className="position-absolute end-0 border-2">
                                    <div onClick={() => {
                                        setOpenModel(true)
                                        setCardToChange(card)
                                    }} className="bg-warning p-2">
                                        <i className="fa-solid fa-pen-to-square" />
                                    </div>
                                    <div className="bg-danger p-2" onClick={() => {
                                        handleDelete(card._id, card.bizNumber as number)
                                    }}>
                                        <i className="fa-solid fa-trash" />
                                    </div>
                                </div>
                                )
                                }
                                <div className="position-absolute d-flex flex-column">
                                    <a href={`tel:${card.phone}`}>
                                        <i className="fa-solid fa-phone p-2 text-white border border-1 bg-success" />
                                    </a>
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
                </div>
                {pageNumbers.length > 1 && (<nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center flex-wrap">
                        <li className="page-item"><a className="page-link" onClick={() => {
                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}>Previous</a></li>
                        {
                            pageNumbers.map((pageNum) => (
                                <li className={`page-item ${pageNum == currentPage && 'active'}`} key={pageNum}><a className="page-link"
                                    onClick={() => setCurrentPage(pageNum)}
                                >{pageNum}</a></li>
                            ))
                        }
                        <li className="page-item"><a className="page-link"
                            onClick={() => {
                                if (currentPage < pageNumbers.length) setCurrentPage(currentPage + 1);
                            }}
                        >Next</a></li>
                    </ul>
                </nav>)}
            </>
            )}

        </div>
        <EditCardModel card={cardToChange} show={openModel} onHide={() => setOpenModel(false)} refresh={() => {
            setNeedRender(!needRender);
            // setCurrentPage(currentPage)
        }}
        />
    </>)
}

export default MyCards;