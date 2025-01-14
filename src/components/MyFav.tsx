import { FunctionComponent, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { SiteSettings } from "../App";
import { formatDate } from "../hooks/useFormatDate";
import { PaginationOptions } from "../hooks/usePagination";
import useCardsPagination from "../hooks/usePagination";
import LikeFeacher from "./LikeFeacher";
import { ClipLoader } from "react-spinners";

interface MyFavProps {

}

const MyFav: FunctionComponent<MyFavProps> = () => {
    const { decodedToken, loggedIn } = useContext(SiteSettings);








    const { currentCards, setCurrentPage, pageNumbers, currentPage, loading } = useCardsPagination(8, { type: PaginationOptions.PageMyFavCards });

    useEffect(() => {

    }, [])

    return (<>
        <div className="container mt-4">
            {loading ? (
                <ClipLoader />
            ) : (<>
                {pageNumbers.length > 1 && (<nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
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
                </div>
                {pageNumbers.length > 1 && (<nav className="mt-3" aria-label="Page navigation example">
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
    </>)
}

export default MyFav;