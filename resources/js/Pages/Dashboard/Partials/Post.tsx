import { Post } from "@/types";
import { usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import ManagePost from "./ManagePost";

dayjs.extend(relativeTime);

export default function PostComponent({
    post,
    className = "",
}: {
    post: Post & { user: { name: string; id: number } };
    className?: string;
}) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);

    return (
        <section className={className}>
            <header>
                <div className="flex items-center gap-4">
                    <h3>{post.title}</h3>

                    {auth.user && auth.user.id === post.user.id && (
                        <button
                            className="text-sm"
                            onClick={() => setEditing(true)}
                        >
                            <FaPencilAlt />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-1">
                    <p className="mt-1 muted">
                        {dayjs(post.created_at).fromNow()} by {post.user.name}
                    </p>

                    {post.created_at !== post.updated_at && (
                        <p className="mt-1 muted">&middot; edited</p>
                    )}
                </div>
            </header>

            <p className="mt-6">{post.content}</p>

            {post.image && (
                <img
                    src={`storage/${post.image}`}
                    alt={post.title}
                    className="w-1/3 mt-6"
                    draggable={false}
                />
            )}

            {editing && (
                <ManagePost
                    title="Edit Post"
                    description="Edit your post."
                    className="mt-6"
                    postItem={post}
                    action="update"
                    setEditing={setEditing}
                />
            )}
        </section>
    );
}
