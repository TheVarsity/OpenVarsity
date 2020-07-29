module.exports = {
  siteMetadata: {
    title: `Open Varsity`,
    name: `Varsity Publications Inc`,
    siteUrl: `https://open-varsity.netlify.app/`,
    description: `An engineering blog by the Varsity Publications team, detailing how a University Newspaper is build and maintained.`,
    hero: {
      heading: `Welcome to Open Varsity, An engineering blog.`,
      maxWidth: 652,
    },
    footerLinks: [
      {
        name: "About Open Varsity",
        url: "/What-is-Open-Varsity",
        external: false,
      },
      // {
      //   name: "Stats for Nerds",
      //   url: "/stats",
      //   external: false,
      // },
      {
        name: "Varsity Status",
        url: "https://status.thevarsity.ca/",
        external: true,
      },
    ],
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/TheVarsity`,
      },
      {
        name: `github`,
        url: `https://github.com/TheVarsity`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/company/varsity-publications-inc./`,
      },
      {
        name: `url`,
        url: `https://thevarsity.ca/`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Open Varsity`,
        short_name: `Open Varsity`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/varsityLogo.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-173183822-1",
      },
    },
  ],
};
