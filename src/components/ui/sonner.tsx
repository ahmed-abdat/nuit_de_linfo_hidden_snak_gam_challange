"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "hsl(222 47% 11%)",
          "--normal-text": "hsl(210 40% 98%)",
          "--normal-border": "hsl(217 33% 25%)",
          "--success-bg": "hsl(142 76% 15%)",
          "--success-text": "hsl(142 76% 90%)",
          "--success-border": "hsl(142 76% 30%)",
          "--error-bg": "hsl(0 72% 15%)",
          "--error-text": "hsl(0 72% 90%)",
          "--error-border": "hsl(0 72% 30%)",
          "--border-radius": "0.75rem",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
