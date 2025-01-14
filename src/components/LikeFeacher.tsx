import { FunctionComponent, useRef, useState } from "react";
import { GetCard } from "../interfaces/Card";
import { userLike } from "../services/userService";

interface LikeFeacherProps {
    card: GetCard
    decodedTokenId: string
}

const LikeFeacher: FunctionComponent<LikeFeacherProps> = ({ card, decodedTokenId }) => {

    const likeRef = useRef<HTMLElement | null>(null);
    const [likes, setLikes] = useState<number>(card.likes?.length || 0)
    const handleLike = (cardId: string) => {
        userLike(cardId).then(() => {
            likeRef.current?.classList.contains('fa-solid') ? (
                likeRef.current?.classList.replace('fa-solid', 'fa-regular')
            ) : (
                likeRef.current?.classList.replace('fa-regular', 'fa-solid')
            )
            counter()

        }
        ).catch(() => alert('some problem'))
    }
    const counter = () => {
        if (likeRef.current?.classList.contains('fa-solid')) {
            setLikes(likes + 1)
        } else {
            setLikes(likes - 1)
        }
    }

    return (<>

        <i
            className={`fa-${card.likes && card.likes.includes(decodedTokenId as never) ? 'solid' : 'regular'
                } fa-heart p-2 text-danger border border-1 bg-white`}
            onClick={() => handleLike(card._id)}
            ref={likeRef}
        />
        <strong className="p-1 bg-white">{likes}</strong>

    </>);
}

export default LikeFeacher;