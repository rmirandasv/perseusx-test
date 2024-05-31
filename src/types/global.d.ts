declare global {

    type Status = "active" | "inactive";

    interface Person {
        name: string;
        favoriteFood: string;
        favoriteMovie: string;
        status: Status;
        date?: Date;
    }

}

export {}