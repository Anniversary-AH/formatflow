import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://formatflow.amber-field.com/", lastModified: new Date() },
    { url: "https://formatflow.amber-field.com/privacy", lastModified: new Date() },
    { url: "https://formatflow.amber-field.com/terms", lastModified: new Date() },
    { url: "https://formatflow.amber-field.com/contact", lastModified: new Date() },
  ];
}
