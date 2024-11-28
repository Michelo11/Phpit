import ManagePost from "@/Components/ManagePost";
import { Button } from "@/Components/Ui/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/Ui/Dropdown";
import { Post, User } from "@/types/index";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowDown, Heart, HeartOff } from "lucide-react";
import { FormEventHandler, useState } from "react";
import FollowButton from "./FollowButton";
import { useLongPress } from "use-long-press";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./Ui/Tooltip";

dayjs.extend(relativeTime);

export default function PostComponent({
    postItem,
    className = "",
    following,
}: {
    postItem: Post & { user: User };
    className?: string;
    following?: boolean;
}) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const { post, reset, processing } = useForm({});
    const toggleLike: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("posts.toggleLike", postItem.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };
    const bind = useLongPress(() => {
        router.visit(route("posts.view", postItem.id));
    });
    const formatNumber = (number: number) => {
        if (number >= 1_000_000_000) {
            return (number / 1_000_000_000).toFixed(1) + "B";
        } else if (number >= 1_000_000) {
            return (number / 1_000_000).toFixed(1) + "M";
        } else if (number >= 1_000) {
            return (number / 1_000).toFixed(1) + "K";
        } else {
            return number.toString();
        }
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
                                    <ArrowDown />
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

                    <FollowButton
                        userId={postItem.user.id}
                        following={following}
                    />
                </div>
            </header>

            <p className="mt-6">{postItem.content}</p>

            {postItem.image && (
                <img
                    src={`/storage/${postItem.image}`}
                    alt={postItem.title}
                    className="w-1/3 mt-6"
                    draggable={false}
                />
            )}

            {postItem.user.id !== auth.user.id && (
                <form onSubmit={toggleLike} className="mt-6">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    {...bind()}
                                >
                                    {postItem.has_liked ? (
                                        <div className="flex flex-col items-center gap-1">
                                            <HeartOff />
                                            {postItem.likers?.length
                                                ? formatNumber(
                                                      postItem.likers.length
                                                  )
                                                : 0}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-1">
                                            <Heart />
                                            {postItem.likers?.length
                                                ? formatNumber(
                                                      postItem.likers.length
                                                  )
                                                : 0}
                                        </div>
                                    )}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Long press to view likes</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </form>
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
