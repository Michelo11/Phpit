import { Button } from "@/Components/Ui/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/Ui/Dropdown";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-background">
            <nav className="border-b">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center gap-8">
                            <Link href="/">
                                <img
                                    src="https://michelemanna.me/img/logo.png"
                                    alt="Logo"
                                    className="w-10 h-10 rounded-xl"
                                    draggable="false"
                                />
                            </Link>

                            <Link href={route("posts.index")}>Dashboard</Link>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-32">
                                    {user.name}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-32">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={route("profile.edit")}>
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={route("logout")} method="post">
                                        Log out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>

            {header && (
                <header>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
