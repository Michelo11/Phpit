import { InertiaLinkProps, Link } from "@inertiajs/react";

interface NavLinkProps extends InertiaLinkProps {
    active: boolean;
}

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}: NavLinkProps) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active ? "text-primary" : "text-muted-foreground") +
                className
            }
        >
            {children}
        </Link>
    );
}
