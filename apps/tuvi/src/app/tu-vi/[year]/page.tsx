import { Metadata } from "next";
import { PageContent } from "./PageContent";
import { getYearArticle, getBirthYearRange } from "@/lib/seo";

const baseUrl = "https://tuvi.vutera.net";

export async function generateStaticParams() {
  const years = getBirthYearRange();
  return years.map((year) => ({
    year: year.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year: yearStr } = await params;
  const year = parseInt(yearStr, 10);
  const article = getYearArticle(year);
  const url = `${baseUrl}/tu-vi/${year}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    keywords: article.keywords,
    author: {
      "@type": "Organization",
      name: "TuVi.vutera.net",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Harmony AI",
      url: baseUrl,
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
  };

  return {
    title: article.title,
    description: article.metaDescription,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url,
      type: "article",
      siteName: "TuVi - Harmony AI",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    other: {
      "application/ld+json": JSON.stringify(jsonLd),
    },
  };
}

export default async function TuViYearPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  return <PageContent year={year} />;
}
