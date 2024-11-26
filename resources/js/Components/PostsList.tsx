import PostComponent from "@/Components/Post";
import { Post } from "@/types";

export default function PostsList({
    className = "",
    posts,
    title,
    description,
    followers,
}: {
    className?: string;
    posts: (Post & { user: { name: string; id: number; avatar: string } })[];
    title: string;
    description: string;
    followers: { id: number }[];
}) {
    return (
        <section className={className}>
            <header>
                <h3>{title}</h3>

                <p className="mt-1 muted">{description}</p>
            </header>

            <div className="mt-6 space-y-6">
                {posts.length === 0 && <p className="muted">No posts found.</p>}

                {posts.map((post) => (
                    <PostComponent
                        postItem={post}
                        key={post.id}
                        following={followers.some(
                            (follower) => follower.id === post.user.id
                        )}
                    />
                ))}
            </div>
        </section>
    );
}
