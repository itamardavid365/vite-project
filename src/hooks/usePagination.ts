import { useContext, useEffect, useState } from "react";
import { getCards, getMyCards } from "../services/cardService";
import { GetCard } from "../interfaces/Card";
import { SiteSettings } from "../App";

export enum PaginationOptions {
    PageMyCards = "myCards",
    PageCards = "cards",
    PageMyFavCards = "myFavCards"
}
export interface PaginationAction {
    type: PaginationOptions
}

export default function useCardsPagination(setCardsPerPageInitail: number, paginationAction: PaginationAction) {
    const [cards, setCards] = useState<GetCard[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(setCardsPerPageInitail);
    const { decodedToken } = useContext(SiteSettings)
    const [needRender, setNeedRender] = useState<boolean>(false);

    useEffect(() => {
        switch (paginationAction.type) {
            case PaginationOptions.PageCards:
                const fetchCards = async () => {
                    setLoading(true);
                    const res = await getCards();
                    setCards(res.data);
                    setLoading(false);
                }

                fetchCards();
                break;
            case PaginationOptions.PageMyCards:
                const fetchMyCards = async () => {
                    setLoading(true);
                    const res = await getMyCards(sessionStorage.getItem('token') as string);
                    setCards(res.data);
                    setLoading(false);
                }
                fetchMyCards();
                break;
            case PaginationOptions.PageMyFavCards:
                const fetchMyFavCards = async () => {
                    setLoading(true);
                    const res = await getCards();
                    const likedCards = res.data.filter((card: any) => card.likes && card.likes.includes(decodedToken._id as never)
                    )
                    setCards(likedCards);
                    setLoading(false);
                }
                fetchMyFavCards();
                break;

            default:
                break;


        }

    }, [needRender])



    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(cards.length / cardsPerPage); i++) {
        pageNumbers.push(i);
    };


    return { cards, loading, currentCards, setCurrentPage, pageNumbers, currentPage, needRender, setNeedRender, setCards }
}