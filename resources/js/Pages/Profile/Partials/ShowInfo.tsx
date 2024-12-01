import { Link } from "@inertiajs/react";

interface ShowInfoProps {
    className?: string;
    title: string;
    description: string;
    countFollowers: number;
    countFollowings: number;
    userId: number;
}

export default function ShowInfo({
    className = "",
    title,
    description,
    countFollowers,
    countFollowings,
    userId,
}: ShowInfoProps) {
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h3>{title}</h3>

                <p className="mt-1 muted">{description}</p>
            </header>

            <div className="flex gap-4">
                <Link
                    href={route("followers.index", userId)}
                    className="hover:underline"
                >
                    Followers: {countFollowers || 0}
                </Link>
                <Link
                    href={route("followings.index", userId)}
                    className="hover:underline"
                >
                    Followings: {countFollowings || 0}
                </Link>
            </div>
        </section>
    );
}
