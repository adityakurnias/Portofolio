import projectsData from "~/contents/pages/projects.json";

export default defineEventHandler((event) => {
  const baseUrl = "https://kurnia.me";
  const currentDate = new Date().toISOString().split("T")[0];

  const staticPages = [
    { url: "/", changefreq: "weekly", priority: "1.0" },
    { url: "/about", changefreq: "monthly", priority: "0.8" },
  ];

  const projects = projectsData.projects || [];
  const projectPages = projects.map((p) => ({
    url: `/project/${p.slug}`,
    changefreq: "monthly",
    priority: "0.8",
  }));

  const allPages = [...staticPages, ...projectPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
      .map(
        (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
      )
      .join("\n")}
</urlset>`;

  setHeader(event, "Content-Type", "application/xml");
  return sitemapXml;
});
