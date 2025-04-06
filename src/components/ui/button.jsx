import * as React from "react";
import { clsx } from "clsx";

const Button = React.forwardRef(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                className={clsx(
                    "inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-gray-900 text-gray-50 hover:bg-gray-900/90": variant === "default",
                        "bg-emerald-600 text-white hover:bg-emerald-700": variant === "primary",
                        "bg-transparent border border-gray-200 hover:bg-gray-100 hover:text-gray-900":
                            variant === "outline",
                        "bg-red-500 text-white hover:bg-red-600": variant === "destructive",
                        "bg-transparent hover:bg-gray-100 hover:text-gray-900": variant === "ghost",
                        "bg-transparent text-gray-900 underline-offset-4 hover:underline":
                            variant === "link",
                        "h-10 px-4 py-2": size === "default",
                        "h-9 rounded-md px-3": size === "sm",
                        "h-11 rounded-md px-8": size === "lg",
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
