import { Button } from "@/Components/Ui/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/Ui/Dropdown";
import { Notification } from "@/types";
import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowDown } from "lucide-react";

dayjs.extend(relativeTime);

interface NotificationComponentProps {
    notification: Notification;
    className?: string;
}

export default function NotificationComponent({
    notification,
    className = "",
}: NotificationComponentProps) {
    return (
        <section className={className}>
            <header className="flex items-center justify-between">
                <div>
                    <h3>{notification.data.message}</h3>

                    <p className="mt-1 muted flex gap-1 items-center">
                        {dayjs(notification.created_at).fromNow()}
                    </p>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-32">
                            <ArrowDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32">
                        <DropdownMenuLabel>Manage</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>RERRREEAD</DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                href={route("notifications.destroy", {
                                    notification: notification.id,
                                })}
                                as="button"
                                className="w-full"
                                method="delete"
                                preserveState={false}
                            >
                                Delete
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
        </section>
    );
}
