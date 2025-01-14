export interface GetCard {

    _id: string,
    title: string,
    subtitle: string,
    description: string,
    phone: string,
    email: string,
    web?: string,
    image: {
        url?: string,
        alt?: string,
        _id: string
    },
    address: {
        state?: string,
        country: string,
        city: string,
        street: string,
        houseNumber: number,
        zip: number,
        _id?: string
    },
    bizNumber?: number,
    likes?: [],
    user_id: string,
    createdAt: string,
    __v: number

}

export interface AddCard {
    title: string,
    subtitle: string,
    description: string,
    phone: string,
    email: string,
    web?: string,
    image: {
        url?: string,
        alt?: string,
    },
    address: {
        state?: string,
        country: string,
        city: string,
        street: string,
        houseNumber: number,
        zip: number,
    },
}