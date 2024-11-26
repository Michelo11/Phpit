export default function ShowInfo({
    className = "",
    title,
    description,
    countFollowers,
    countFollowing,
}: {
    className?: string;
    title: string;
    description: string;
    countFollowers: number;
    countFollowing: number;
}) {
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h3>{title}</h3>

                <p className="mt-1 muted">{description}</p>
            </header>

            <div className="flex gap-4">
                <p>Followers: {countFollowers || 0}</p>
                <p>Following: {countFollowing || 0}</p>
            </div>
        </section>
    );
}
