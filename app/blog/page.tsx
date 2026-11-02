
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Clock3,
  CalendarDays,
  Sparkles,
  BookOpen,
  TrendingUp,
  Code2,
  Megaphone,
  X,
} from "lucide-react";

const categories = [
  "All Articles",
  "Web Design",
  "Digital Marketing",
  "SEO",
  "Technology",
];

const articles = [
  {
    id: 1,
    title: "How a Professional Website Helps Your Business Grow",
    excerpt:
      "Discover how thoughtful web design, a clear user journey, and a strong online presence can turn visitors into customers.",
    category: "Web Design",
    date: "Oct 18, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1000&q=85",
    featured: true,
    slug: "professional-website-business-growth",
  },
  {
    id: 2,
    title: "Digital Marketing Strategies That Build Real Growth",
    excerpt:
      "Learn how to combine content, social media, and paid campaigns into a smarter marketing strategy.",
    category: "Digital Marketing",
    date: "Oct 12, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
    featured: false,
    slug: "digital-marketing-strategies",
  },
  {
    id: 3,
    title: "SEO Fundamentals Every Business Owner Should Know",
    excerpt:
      "Understand keywords, technical SEO, helpful content, and the fundamentals of organic search visibility.",
    category: "SEO",
    date: "Oct 08, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=900&q=85",
    featured: false,
    slug: "seo-fundamentals-business",
  },
  {
    id: 4,
    title: "Modern Website Design Trends Worth Exploring",
    excerpt:
      "Explore clean layouts, accessible interfaces, subtle motion, and responsive experiences that put users first.",
    category: "Web Design",
    date: "Oct 02, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=85",
    featured: false,
    slug: "modern-website-design-trends",
  },
  {
    id: 5,
    title: "How AI Is Changing the Digital Business Landscape",
    excerpt:
      "A practical introduction to AI-powered workflows, customer experiences, and opportunities for growing businesses.",
    category: "Technology",
    date: "Sep 25, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85",
    featured: false,
    slug: "ai-digital-business",
  },
  {
    id: 6,
    title: "Local SEO Tips to Help Customers Find Your Business",
    excerpt:
      "Improve local discoverability with accurate business information, useful location pages, and customer reviews.",
    category: "SEO",
    date: "Sep 18, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=85",
    featured: false,
    slug: "local-seo-tips",
  },
];

const categoryIcons: Record<string, typeof BookOpen> = {
  "Web Design": Code2,
  "Digital Marketing": Megaphone,
  SEO: TrendingUp,
  Technology: Sparkles,
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "All Articles" ||
        article.category === activeCategory;

      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredArticle = articles[0];

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{ background: "var(--page)", color: "var(--text-heading)" }}
    >
      {/* Hero */}
      <section
        className="relative isolate overflow-hidden pt-16 sm:pt-20"
        style={{
          background:
            "linear-gradient(145deg, var(--brand-900), var(--brand-700))",
        }}
      >
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 85% 15%, var(--accent-soft), transparent 40%), radial-gradient(ellipse at 10% 90%, var(--accent-wash), transparent 40%)",
          }}
        />

        <div className="absolute -right-20 top-24 -z-10 h-80 w-80 rounded-full border border-white/10 sm:right-10 sm:h-[420px] sm:w-[420px]" />
        <div className="absolute -right-10 top-36 -z-10 h-60 w-60 rounded-full border border-white/10 sm:right-20 sm:h-[320px] sm:w-[320px]" />

        <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm font-medium text-sky-200">
              <Sparkles size={15} />
              Ideas for your next big move
            </div>

            <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Deepara Tech
              <span className="mt-2 block bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                Blog.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Stay ahead of the curve with expert tutorials, digital marketing
              insights, and practical ideas to grow your business online.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#articles"
                className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 py-3.5 font-semibold text-[#071b36] transition hover:bg-sky-300"
              >
                Explore articles
                <ArrowRight size={18} />
              </a>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Talk to our team
                <ArrowUpRight size={17} />
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-7 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <BookOpen size={17} className="text-sky-300" />
                Practical guides
              </span>
              <span className="flex items-center gap-2">
                <TrendingUp size={17} className="text-sky-300" />
                Growth insights
              </span>
              <span className="flex items-center gap-2">
                <Code2 size={17} className="text-sky-300" />
                Tech & innovation
              </span>
            </div>
          </div>
        </div>

        <div className="h-2 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />
      </section>

      {/* Featured Article */}
      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-20">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-sky-500" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
              Editor&apos;s pick
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Featured article
            </h2>
          </div>
        </div>

        <article className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl lg:grid-cols-2">
          <Link
            href={`/blog/${featuredArticle.slug}`}
            aria-label={`Read ${featuredArticle.title}`}
            className="relative block min-h-[260px] overflow-hidden sm:min-h-[350px]"
          >
            <img
              src={featuredArticle.image}
              alt="Website design displayed on a computer"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold text-sky-700 shadow-sm">
              FEATURED
            </span>
          </Link>

          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <span className="w-fit rounded-full bg-sky-50 px-3.5 py-1.5 text-xs font-semibold text-sky-700">
              {featuredArticle.category}
            </span>

            <h3 className="mt-5 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
              <Link
                href={`/blog/${featuredArticle.slug}`}
                className="transition hover:text-sky-700"
              >
                {featuredArticle.title}
              </Link>
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              {featuredArticle.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={15} />
                {featuredArticle.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 size={15} />
                {featuredArticle.readTime}
              </span>
            </div>

            <Link
              href={`/blog/${featuredArticle.slug}`}
              className="mt-8 inline-flex w-fit items-center gap-2 font-semibold text-sky-700 transition hover:gap-3"
            >
              Read article
              <ArrowRight size={18} />
            </Link>
          </div>
        </article>
      </section>

      {/* Article Listing */}
      <section id="articles" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
              Explore our insights
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Ideas worth your time.
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-slate-600">
              Fresh perspectives and practical knowledge for your digital
              journey.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles"
              className="h-12 w-full rounded-full border border-slate-200 bg-white pl-11 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-[#0871ae] text-white shadow-md shadow-sky-900/10"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="mb-6 mt-8 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredArticles.length}
            </span>{" "}
            {filteredArticles.length === 1 ? "article" : "articles"}
          </p>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => {
              const Icon = categoryIcons[article.category] ?? BookOpen;

              return (
                <article
                  key={article.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-200/60"
                >
                  <Link
                    href={`/blog/${article.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
                    aria-label={`Read ${article.title}`}
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
                      <Icon size={13} className="text-sky-600" />
                      {article.category}
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <CalendarDays size={14} />
                      {article.date}
                      <span className="text-slate-300">•</span>
                      <Clock3 size={14} />
                      {article.readTime}
                    </div>

                    <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight transition group-hover:text-sky-700">
                      <Link href={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                      {article.excerpt}
                    </p>

                    <Link
                      href={`/blog/${article.slug}`}
                      className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-sky-700 transition hover:gap-3"
                    >
                      Read more
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
            <Search size={30} className="mx-auto text-slate-400" />
            <h3 className="mt-4 text-lg font-bold">No articles found</h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another search term or choose a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All Articles");
              }}
              className="mt-5 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#071b36] px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
          <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300">
                <Sparkles size={16} />
                Ready to grow?
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Turn your next big idea into digital impact.
              </h2>
              <p className="mt-4 leading-7 text-slate-300">
                Let&apos;s talk about your website, marketing strategy, or next
                digital project.
              </p>
            </div>

            <Link
              href="/#contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-sky-400 px-7 py-4 font-bold text-[#071b36] transition hover:bg-sky-300"
            >
              Let&apos;s talk
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
