import { Post } from "@/types";
import PostComponent from "./Post";

export default function RecentPosts({
    className = "",
    posts,
}: {
    className?: string;
    posts: (Post & { user: { name: string; id: number } })[];
}) {
    return (
        <section className={className}>
            <header>
                <h3>Recent Posts</h3>

                <p className="mt-1 muted">
                    Here are some of the latest posts from your friends.
                </p>
            </header>

            <div className="mt-6 space-y-6">
                {posts.length === 0 && <p className="muted">No posts found.</p>}

                {posts.map((post) => (
                    <PostComponent post={post} key={post.id} />
                ))}
            </div>
        </section>
    );
}
