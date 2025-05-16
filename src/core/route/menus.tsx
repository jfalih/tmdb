import { ListItem } from "@/components/ui/list-item";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Bird, Instagram, Linkedin, MonitorPlay, PartyPopper, Stars } from "lucide-react";
import Link from "next/link";

const menus = [
  { label: "Home", href: "/", type: "link" },
  {
    label: "Category",
    type: "dropdown",
    content: (
      <ul className="grid grid-cols-3 grid-rows-2 gap-4 p-4 md:w-[600px] lg:w-[800px]">
        <li className="col-span-1 row-span-2">
          <NavigationMenuLink asChild>
            <Link
              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-white p-6 no-underline outline-none focus:shadow-md"
              href="#"
            >
              <div className="mb-2 mt-4 text-lg font-medium">
                Discover Category
              </div>
              <p className="text-sm leading-tight text-muted-foreground">
                Explore a wide range of categories and find your favorite
                movies, series, and more. Click to discover!
              </p>
            </Link>
          </NavigationMenuLink>
        </li>

        <ListItem
          icon={<MonitorPlay className="w-6 h-6" />}
          username="Now Playing Movies"
          href="/category/now_playing"
          title="Now Playing"
        >
          Follow me on Instagram for updates and behind-the-scenes content.
        </ListItem>

        <ListItem
          icon={<PartyPopper className="w-6 h-6" />}
          username="Popular Movies"
          href="/category/popular"
          title="Popular"
        >
          Connect with me on LinkedIn for professional updates.
        </ListItem>

        <ListItem
          icon={<Stars className="w-6 h-6" />}
          href="/category/top_rated"
          title="Top Rated"
          username="Top Rated Movies"
        >List of top-rated movies based on user ratings and reviews.
        </ListItem>

        <ListItem
          icon={<Bird className="w-6 h-6" />}
          username="Upcoming Movies"
          href="/category/upcoming"
          title="Upcoming"
        >
          Stay tuned for the latest releases and upcoming movies.
        </ListItem>
      </ul>
    ),
  },
  {
    label: "Author",
    type: "dropdown",
    content: (
      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        <li className="row-span-2">
          <NavigationMenuLink asChild>
            <Link
              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-white p-6 no-underline outline-none focus:shadow-md"
              href="#"
            >
              <div className="mb-2 mt-4 text-lg font-medium">
                Jan Falih Fadhillah
              </div>
              <p className="text-sm leading-tight text-muted-foreground">
                Hope you enjoy this template! I am a software engineer with a
                passion for building web applications. Feel free to reach out if
                you have any questions or feedback.
              </p>
            </Link>
          </NavigationMenuLink>
        </li>
        <ListItem
          icon={<Instagram className="w-6 h-6" />}
          username="@jfalih"
          href="https://instagram.com/jfalih"
          title="Instagram"
        >
          Follow me on Instagram for updates and behind-the-scenes content.
        </ListItem>
        <ListItem
          icon={<Linkedin className="w-6 h-6" />}
          username="Jan Falih Fadhillah"
          href="https://linkedin.com/in/janfalih"
          title="LinkedIn"
        >
          Connect with me on LinkedIn for professional updates.
        </ListItem>
      </ul>
    ),
  },
];

export default menus;