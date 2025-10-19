/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://abubakrsiddik-portfolio.vercel.app', 
  generateRobotsTxt: true, 
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.8,

  
  exclude: ['/dashboard'],

  // Robots.txt setup
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/admin', '/private'],
      },
    ],
    additionalSitemaps: [
      'https://abubakrsiddik-portfolio.vercel.app/sitemap.xml',
    ],
  },

  
  transform: async (config, path) => {
    // default configuration
    return {
      loc: path, // route location
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
