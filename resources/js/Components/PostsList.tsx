import PostComponent from "@/Components/Post";
import { User, Post } from "@/types/index";

export default function PostsList({
    className = "",
    posts,
    title,
    description,
    userFollowings,
}: {
    className?: string;
    posts: (Post & { user: { name: string; id: number; avatar: string } })[];
    title: string;
    description: string;
    userFollowings: User[];
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
                        className="border border-card p-4 sm:rounded-xl"
                        postItem={post}
                        key={post.id}
                        following={userFollowings.some(
                            (follower) => follower.id === post.user.id
                        )}
                    />
                ))}
            </div>
        </section>
    );
}
