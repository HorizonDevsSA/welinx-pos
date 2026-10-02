import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 font-bold",
        emeraldGlow:
          "bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 hover:from-emerald-400 hover:to-emerald-300 shadow-xl shadow-emerald-500/25 border border-emerald-300/40 font-bold",
        cyanGlow:
          "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 shadow-xl shadow-cyan-500/25 border border-cyan-300/40 font-bold",
        secondary:
          "bg-slate-800/90 text-slate-100 hover:bg-slate-700/90 border border-slate-700/80 backdrop-blur-sm",
        outline:
          "border border-slate-700 bg-transparent hover:bg-slate-800/60 hover:text-white text-slate-200 backdrop-blur-sm",
        ghost:
          "hover:bg-slate-800/60 hover:text-white text-slate-300",
        destructive:
          "bg-red-600 text-white hover:bg-red-500 shadow-md shadow-red-600/20",
        link:
          "text-emerald-400 underline-offset-4 hover:underline p-0 h-auto font-medium",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-13 px-8 py-3.5 text-base rounded-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
