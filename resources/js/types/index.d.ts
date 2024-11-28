export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    avatar: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    image: string;
    has_liked: boolean;
    likers?: User[];
    comments?: Comment[];
}

export interface Comment {
    id: string;
    comment: string;
    created_at: string;
    updated_at: string;
    user: User;
}

export interface Followable {
    followable: User;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
