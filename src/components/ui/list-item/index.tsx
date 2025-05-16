import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import { Instagram } from "lucide-react"

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string, username: string, icon?: React.ReactNode }
>(({ className, title, username, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "select-none flex flex-col h-full justify-between space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors text-white hover:bg-accent hover:text-black focus:bg-accent focus:text-black",
            className
          )}
          href={props.href ?? "#"}
          {...props}
        >
          {props.icon ?? <Instagram className="h-6 w-6" />}
          <div className="mb-2" />
          <div>
            <div className="text-sm font-medium leading-none">{title}</div>
            {/* Username */}
            <div className="text-xs mb-2 text-muted-foreground">
              {username}
            </div>
            <p className="line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
