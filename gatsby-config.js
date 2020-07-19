module.exports = {
  siteMetadata: {
    title: `Open Varsity`,
    name: `Varsity Publications Inc`,
    siteUrl: `https://novela.narative.co`,
    description: `This is my description that will be used in the meta tags and important for search results`,
    hero: {
      heading: `Welcome to Open Varsity, An engineering blog.`,
      maxWidth: 652,
    },
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
        url: `https://www.linkedin.com/company/narative/`,
      },
      // {
      //   name: `url`,
      //   url: `https://thevarsity.ca/`,
      // },
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
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {},
    },
  ],
};
