import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Button } from "./Ui/Button";

export default function FollowButton({
    className = "",
    userId,
    following,
}: {
    className?: string;
    userId: number;
    following?: boolean;
}) {
    const { auth } = usePage().props;
    const { post, reset, processing } = useForm({});

    const toggleFollow: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("profile.toggleFollow", userId), {
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
