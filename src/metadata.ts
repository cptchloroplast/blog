import type { Metadata } from "./schemas/Metadata"
const metadata: Metadata = {
  author: {
    name: "Benjamin Okkema",
    email: "ben@okkema.org",
  },
  description: "Benjamin Okkema's Homepage",
  repo: "https://github.com/cptchloroplast/blog",
  navigation: [
    {
      text: "Posts",
      href: "/posts"
    },
    {
      text: "Tags",
      href: "/tags"
    },
    {
      text: "Projects",
      children: [
        {
          text: "Rayün Handmade",
          href: "https://rayunhandmade.com",
          external: true,
        },
        {
          text: "Crank Tools",
          href: "https://crank.tools",
          external: true,
        },
        {
          text: "Notebooks",
          href: "https://public.notes.okkema.org",
          external: true,
        }
      ]
    },
    {
      text: "The Bike Shed",
      href: "/bikes"
    },
    {
      text: "Contact",
      href: "/contact"
    },
    {
      text: "RSS",
      href: "/rss.xml",
      icon: "rss",
    }
  ],
  profile: {
    bio: [
      {
        icon: "lab",
        text: "Console Cowboy @ ",
        link: {
          href: "https://okkema.org",
          text: "Okkema Labs"
        }
      },
      {
        icon: "wrench",
        text: "Guerrilla Bicycle Mechanic"
      },
      {
        icon: "leaf",
        text: "Amateur Botanist"
      },
      {
        icon: "space",
        text: "Astronomy Enthusiast"
      },
      {
        icon: "family",
        text: "Husband and Father"
      }
    ],
    contact: [
      {
        title: "@cptchloroplast",
        icon: "github",
        href: "https://github.com/cptchloroplast"
      },
      {
        title: "Benjamin Okkema",
        icon: "linkedin",
        href: "https://www.linkedin.com/in/benokkema"
      },
      {
        title: "@cptchloroplast",
        icon: "twitter",
        href: "https://twitter.com/cptchloroplast"
      },
      {
        title: "Benjamin Okkema",
        icon: "strava",
        href: "https://www.strava.com/athletes/8782282"
      },
      {
        title: "ben@okkema.org",
        icon: "mail",
        href: "mailto:ben@okkema.org"
      },
      {
        title: "@ben@okkema.org",
        icon: "activitypub",
        href: "https://ben.okkema.org/activity"
      }
    ],
  },
}

export default metadata