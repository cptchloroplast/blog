const metadata: Metadata = {
  author: {
    name: "Benjamin Okkema",
    email: "ben@okkema.org",
  },
  description: "Benjamin Okkema's Homepage",
  navigation: [
    {
      text: "Posts",
      href: "/posts"
    },
    {
      text: "Projects",
      children: [
        {
          text: "Okkema Labs",
          href: "https://okkema.org",
          external: true,
        },
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
      ]
    },
    {
      text: "Tags",
      href: "/tags"
    },
    {
      text: "Contact",
      href:"/contact"
    }
  ],
  profile: {
    bio: [
      {
        icon: "lab",
        text: "Founder @ ",
        link: {
          href: "https://okkema.org",
          text: "Okkema Labs"
        }
      },
      {
        icon: "code",
        text: "Software Engineer @ ",
        link: {
          href: "https://www.nvisia.com/",
          text: "nvisia",
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
        title: "cptchloroplast",
        icon: "keybase",
        href: "https://keybase.io/cptchloroplast"
      },
      {
        title: "ben@okkema.org",
        icon: "mail",
        href: "mailto:ben@okkema.org"
      },
      {
        title: "+1-630-670-9876",
        icon: "phone",
        href: "tel:+16306709876"
      },
      {
        title: "AD18B95D04FD76D23EE482A64B62EE4B3E7E7D6B",
        icon: "key",
        href: "/keys/public.txt"
      }
    ],
  },
}

export default metadata