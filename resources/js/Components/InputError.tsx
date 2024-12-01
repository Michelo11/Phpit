import { HTMLAttributes } from "react";

interface InputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
    message?: string;
}

export default function InputError({
    message,
    className = "",
    ...props
}: InputErrorProps) {
    return message ? (
        <p {...props} className={"muted !text-destructive " + className}>
            {message}
        </p>
    ) : null;
}
