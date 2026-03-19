import * as React from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, isLoading, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={cn(
          "flex w-full items-center justify-center font-medium px-4 py-2.5 rounded-lg text-lg transition-colors",
          "bg-emerald-500 hover:bg-emerald-600 text-white",
          "disabled:cursor-not-allowed disabled:opacity-70",
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
