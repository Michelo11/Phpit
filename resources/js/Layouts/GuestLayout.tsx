import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

interface GuestProps extends PropsWithChildren<{}> {
    children: React.ReactNode;
}

export default function Guest({ children }: GuestProps) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-background">
            <Link href="/">
                <img
                    src="https://michelemanna.me/img/logo.png"
                    alt="Logo"
                    className="w-20 h-20 rounded-xl"
                    draggable="false"
                />
            </Link>

            <div className="mt-6 w-full overflow-hidden py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
