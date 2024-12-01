import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Button } from "./Ui/Button";

interface FollowButtonProps {
    className?: string;
    userId: number;
    following?: boolean;
}

export default function FollowButton({
    className = "",
    userId,
    following,
}: FollowButtonProps) {
    const { auth } = usePage().props;
    const { post, reset, processing } = useForm({});
    const toggleFollow: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("followers.store", userId), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    if (auth.user.id !== userId) {
        return (
            <form onSubmit={toggleFollow} className={className}>
                <Button
                    className="w-32"
                    disabled={processing}
                    variant={following ? "outline" : "default"}
                >
                    {following ? "Unfollow" : "Follow"}
                </Button>
            </form>
        );
    }
}
