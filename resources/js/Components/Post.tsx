import { Post } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FormEventHandler, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { Button } from "@/Components/Ui/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/Ui/Dropdown";
import ManagePost from "@/Components/ManagePost";

dayjs.extend(relativeTime);

export default function PostComponent({
    postItem,
    className = "",
    following,
}: {
    postItem: Post & { user: { name: string; id: number; avatar: string } };
    className?: string;
    following?: boolean;
}) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);

    const { post, reset, processing } = useForm({});

    const toggleFollow: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("profile.toggleFollow", postItem.user.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <section className={className}>
            <header className="flex items-center justify-between">
                <div>
                    <h3>{postItem.title}</h3>

                    <div className="flex items-center gap-1">
                        <div className="mt-1 muted flex gap-1 items-center">
                            {dayjs(postItem.created_at).fromNow()} by{" "}
                            <Link
                                className="flex gap-1 items-center hover:underline"
                                href={`/profile/${postItem.user.id}`}
                            >
                                <img
                                    src={postItem.user.avatar}
                                    alt="Profile photo"
                                    className="w-6 h-6 rounded-md"
                                    draggable="false"
                                />
                                {postItem.user.name}
                            </Link>
                        </div>

                        {postItem.created_at !== postItem.updated_at && (
                            <p className="mt-1 muted">&middot; edited</p>
                        )}
                    </div>
                </div>

                <div className="flex gap-4">
                    {auth.user && auth.user.id === postItem.user.id && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-32">
                                    <FaArrowDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-32">
                                <DropdownMenuLabel>Manage</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="w-full"
                                    >
                                        Edit
                                    </button>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={route(
                                            "posts.destroy",
                                            postItem.id
                                        )}
                                        method="delete"
                                    >
                                        Delete
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    {auth.user.id !== postItem.user.id && (
                        <form onSubmit={toggleFollow}>
                            <Button
                                className="w-32"
                                disabled={processing}
                                variant={following ? "outline" : "default"}
                            >
                                {following ? "Unfollow" : "Follow"}
                            </Button>
                        </form>
                    )}
                </div>
            </header>

            <p className="mt-6">{postItem.content}</p>

            {postItem.image && (
                <img
                    src={`storage/${postItem.image}`}
                    alt={postItem.title}
                    className="w-1/3 mt-6"
                    draggable={false}
                />
            )}

            {editing && (
                <ManagePost
                    title="Edit postItem"
                    description="Edit your postItem."
                    className="mt-6"
                    postItem={postItem}
                    action="update"
                    setEditing={setEditing}
                />
            )}
        </section>
    );
}
