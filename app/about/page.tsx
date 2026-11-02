"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Target,
  Eye,
  Lightbulb,
  TrendingUp,
  Headset,
  Code2,
  Trophy,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
Zap,
  ChevronDown,
  MessageCircle,
  Globe2,
  HeartHandshake,
} from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "Our Mission",
    icon: Target,
    description:
      "To empower brands with modern websites, high-performance applications, and result-driven digital marketing strategies that support sustainable growth.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    number: "02",
    title: "Our Vision",
    icon: Eye,
    description:
      "To become a trusted global digital partner, recognized for outstanding user experiences, scalable technology, transparency, and lasting client relationships.",
    color: "bg-sky-50 text-sky-700",
  },
  {
    number: "03",
    title: "Our Values",
    icon: Lightbulb,
    description:
      "We believe in innovation, integrity, open communication, and excellence in every project. Your success is the standard we work toward.",
    color: "bg-violet-50 text-violet-700",
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "ROI Focused",
    description:
      "We build practical strategies around measurable outcomes, qualified leads, and business growth.",
  },
  {
    icon: Headset,
    title: "Expert Support",
    description:
      "Get guidance, clear communication, and dependable support throughout your digital journey.",
  },
  {
    icon: Code2,
    title: "Expert Team",
    description:
      "Our designers, developers, and marketing specialists bring creative thinking and technical expertise together.",
  },
  {
    icon: Trophy,
    title: "Quality Driven",
    description:
      "We focus on thoughtful execution, careful testing, and solutions tailored to your business goals.",
  },
];

const faqs = [
  {
    question: "What services does Ananya Hi Solutions provide?",
    answer:
      "We offer website design and development, digital marketing, SEO, mobile application development, eCommerce solutions, video production, and software development.",
  },
  {
    question: "How do you approach a new project?",
    answer:
      "We begin by understanding your business, audience, and goals. We then plan the strategy, develop the solution, test it carefully, and support you through launch and ongoing improvements.",
  },
  {
    question: "Do you work with small businesses and startups?",
    answer:
      "Yes. Our solutions can be tailored to startups, growing businesses, and established organizations according to their requirements, objectives, and budget.",
  },
  {
    question: "How do you maintain quality?",
    answer:
      "We focus on clear requirements, structured project planning, responsive design, development best practices, testing, and continuous communication throughout the project.",
  },
  {
    question: "How can I get started?",
    answer:
      "Contact our team with your project idea or business challenge. We can discuss your requirements and recommend a suitable next step.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="overflow-hidden" style={{ background: "var(--page)", color: "var(--text-body)" }}>
      {/* HERO */}
      <section
        className="relative isolate overflow-hidden"
        style={{ background: "linear-gradient(145deg, var(--brand-900), var(--brand-700))" }}
      >
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: "var(--brand-400)" }} />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full opacity-10 blur-3xl" style={{ background: "var(--brand-300)" }} />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:gap-16 lg:py-32">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80" style={{ borderRadius: "var(--radius-control)" }}>
              <Sparkles size={16} style={{ color: "var(--brand-300)" }} />
              About Deepara Solutions
            </div>

            <h1 className="max-w-2xl font-serif text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ fontWeight: 400 }}>
              Your Vision.
              <span className="block" style={{ color: "var(--brand-200)" }}>Our Digital Expertise.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              We help businesses build a stronger digital presence through
              thoughtful web experiences, smart technology, and results-driven
              marketing strategies.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#f5790c] px-7 py-4 font-semibold text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-1 hover:bg-orange-600"
              >
                Lets Talk About Your Project
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/#about"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Our Process
                <ArrowUpRight size={18} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-sky-300" />
                Client-focused approach
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-sky-300" />
                Tailored solutions
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sky-400/20 to-orange-400/20 blur-xl" />

            <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-sm sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm text-slate-300">
                    The digital growth journey
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-white">
                    Ideas into impact
                  </h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                  <Zap size={25} />
                </div>
              </div>

              <div className="space-y-4 py-6">
                {[
                  {
                    n: "01",
                    title: "Discover",
                    desc: "Understand your goals",
                    color: "bg-sky-400",
                  },
                  {
                    n: "02",
                    title: "Strategize",
                    desc: "Plan the right approach",
                    color: "bg-orange-400",
                  },
                  {
                    n: "03",
                    title: "Create",
                    desc: "Build your digital solution",
                    color: "bg-violet-400",
                  },
                  {
                    n: "04",
                    title: "Grow",
                    desc: "Improve and move forward",
                    color: "bg-emerald-400",
                  },
                ].map((step) => (
                  <div
                    key={step.n}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${step.color} text-sm font-extrabold text-slate-950`}
                    >
                      {step.n}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{step.title}</h3>
                      <p className="mt-1 text-sm text-slate-300">{step.desc}</p>
                    </div>
                    <ArrowUpRight
                      className="ml-auto text-slate-400"
                      size={19}
                    />
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-sky-300/10 p-4">
                <p className="text-sm leading-6 text-sky-100">
                  Every project starts with understanding your business and
                  finding the right way forward.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-sky-400 via-orange-400 to-sky-400" />
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-28 w-28 rounded-tl-[2rem] border-l-4 border-t-4 border-orange-400" />

            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-50 via-white to-orange-50 p-7 sm:p-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex min-h-44 flex-col justify-between rounded-2xl bg-[#082f49] p-5 text-white">
                  <Globe2 size={32} className="text-sky-300" />
                  <div>
                    <p className="text-2xl font-extrabold">Digital</p>
                    <p className="mt-1 text-sm text-slate-300">
                      Experiences that connect
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex min-h-44 flex-col justify-between rounded-2xl bg-orange-500 p-5 text-white">
                  <TrendingUp size={32} />
                  <div>
                    <p className="text-2xl font-extrabold">Growth</p>
                    <p className="mt-1 text-sm text-orange-50">
                      Strategies built around goals
                    </p>
                  </div>
                </div>

                <div className="flex min-h-36 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5">
                  <ShieldCheck size={29} className="text-sky-700" />
                  <p className="font-bold text-[#082f49]">Quality & trust</p>
                </div>

                <div className="mt-[-2rem] flex min-h-36 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5">
                  <HeartHandshake size={29} className="text-orange-500" />
                  <p className="font-bold text-[#082f49]">
                    Lasting partnerships
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-3 h-20 w-20 rounded-br-[2rem] border-b-4 border-r-4 border-sky-500" />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              Who We Are
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#082f49] sm:text-4xl">
              A digital partner invested in your success
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Ananya Hi Solutions helps businesses use digital technology to
              strengthen their brands, reach their audiences, and create better
              online experiences.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Our work brings together creative design, development, and digital
              marketing. We take time to understand your needs and collaborate
              with you to build solutions that fit your goals.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              We believe successful projects are built on clear communication,
              thoughtful planning, and a shared commitment to quality.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Transparent communication",
                "Tailored digital solutions",
                "Collaborative execution",
                "Continuous improvement",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-sky-700"
                  />
                  <span className="text-sm font-semibold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              Our Core Pillars
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#082f49] sm:text-4xl">
              What guides everything we do
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              The principles behind our approach to building meaningful digital
              experiences and strong client relationships.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <article
                  key={pillar.number}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-sky-200 hover:shadow-xl sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${pillar.color}`}
                    >
                      <Icon size={28} />
                    </div>
                    <span className="text-4xl font-extrabold text-slate-100 transition group-hover:text-sky-100">
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#082f49]">
                    {pillar.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {pillar.description}
                  </p>

                  <div className="mt-6 h-1 w-12 rounded-full bg-orange-400 transition-all duration-300 group-hover:w-20" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative overflow-hidden bg-[#062c46] py-20 text-white sm:py-24">
        <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
              Why Choose Us
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              More than a service provider
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              A collaborative digital partner focused on understanding your
              needs and delivering work that supports your business goals.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                    <Icon size={27} />
                  </div>
                  <h3 className="mt-6 text-lg font-bold">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
                How We Work
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#082f49] sm:text-4xl">
                A clear process from idea to launch
              </h2>
              <p className="mt-5 leading-8 text-slate-600">
                Every business is different. Our collaborative process helps us
                understand your priorities, agree on a direction, and develop a
                solution with purpose.
              </p>

              <Link
                href="/#about"
                className="mt-7 inline-flex items-center gap-2 font-bold text-sky-800 transition hover:text-orange-600"
              >
                Explore our onboarding process
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="space-y-4">
              {[
                [
                  "01",
                  "Discovery & analysis",
                  "Understand your business, audience, and objectives.",
                ],
                [
                  "02",
                  "Strategy & planning",
                  "Define the scope, direction, and priorities.",
                ],
                [
                  "03",
                  "Design & development",
                  "Create a solution aligned with your brand and needs.",
                ],
                [
                  "04",
                  "Testing & optimization",
                  "Review quality, usability, and performance.",
                ],
                [
                  "05",
                  "Launch & support",
                  "Help you launch and plan the next improvements.",
                ],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="flex gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-sky-200 hover:bg-sky-50/50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#082f49] font-bold text-white">
                    {number}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#082f49]">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              FAQs
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#082f49] sm:text-4xl">
              Have questions?
              <span className="block text-sky-700">We are here to help.</span>
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Learn more about our services, how we work, and how to start your
              next digital project.
            </p>

            <div className="mt-8 rounded-3xl bg-[#082f49] p-6 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500">
                <MessageCircle size={24} />
              </div>
              <h3 className="mt-5 text-xl font-bold">Still have questions?</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Tell us about your requirements and we all help you identify the
                next step.
              </p>
              <Link
                href="/#contact"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-sky-300 hover:text-white"
              >
                Contact our team
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border bg-white transition ${
                    isOpen ? "border-sky-200 shadow-sm" : "border-slate-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="font-bold leading-6 text-[#082f49]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-sky-700 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6">
                      <p className="border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#062c46] to-[#0b5278] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[40px] border-white/5" />
          <div className="absolute -bottom-28 -left-12 h-64 w-64 rounded-full border-[40px] border-orange-400/10" />

          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
              Let us Build Something Great
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Ready to take your business forward?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-200">
              Let us discuss your goals and explore the right digital solution
              for your business.
            </p>

            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f5790c] px-8 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600"
            >
              Start a Conversation
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
