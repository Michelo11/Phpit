import { Notification } from "@/types";
import NotificationComponent from "./Notification";

interface NotificationsListProps {
    className?: string;
    notifications: Notification[];
    title: string;
    description: string;
}

export default function NotificationsList({
    className = "",
    notifications,
    title,
    description,
}: NotificationsListProps) {
    return (
        <section className={className}>
            <header>
                <h3>{title}</h3>

                <p className="mt-1 muted">{description}</p>
            </header>

            <div className="mt-6 space-y-6">
                {notifications.length === 0 && (
                    <p className="muted">No notification found.</p>
                )}

                {notifications.map((notification) => (
                    <NotificationComponent
                        className="border border-card p-4 sm:rounded-xl"
                        notification={notification}
                        key={notification.id}
                    />
                ))}
            </div>
        </section>
    );
}
