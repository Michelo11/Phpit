import NavLink from "@/Components/NavLink";
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
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-background flex flex-col">
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

                            <NavLink
                                href={route("posts.index")}
                                active={route().current("posts.index")}
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                href={route("profile.index", user.id)}
                                active={
                                    route().current("profile.index") &&
                                    route().params.id === user.id.toString()
                                }
                            >
                                Profile
                            </NavLink>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-32">
                                    <img
                                        src={user.avatar}
                                        alt="Profile photo"
                                        className="w-6 h-6 rounded-md"
                                        draggable="false"
                                    />
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
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="w-full"
                                    >
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

            <footer className="mt-auto">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-center">
                    <p className="muted">
                        &copy; {currentYear}{" "}
                        <a
                            href="https://michelemanna.me"
                            className="hover:underline"
                        >
                            Michele Manna
                        </a>
                        . All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
