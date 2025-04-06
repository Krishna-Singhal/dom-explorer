import * as React from "react";
import { clsx } from "clsx";

const Alert = React.forwardRef(({ className, variant = "default", ...props }, ref) => (
    <div
        ref={ref}
        role="alert"
        className={clsx(
            "relative w-full rounded-lg border p-4",
            {
                "bg-gray-50 text-gray-950 border-gray-200": variant === "default",
                "bg-red-50 text-red-900 border-red-200": variant === "destructive",
            },
            className
        )}
        {...props}
    />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={clsx("font-medium leading-none tracking-tight", className)}
        {...props}
    />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={clsx("text-sm [&_p]:leading-relaxed", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
