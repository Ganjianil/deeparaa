
export type ServicePageData = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  services: { title: string; description: string }[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
};

export const servicePages: ServicePageData[] = [
  {
    slug: "web-design",
    title: "Website Design & Development",
    subtitle: "Professional Website Design Services",
    description:
      "Build a professional online presence with responsive, user-friendly websites designed to communicate your brand, attract visitors, and generate business enquiries.",
    services: [
      { title: "Business Websites", description: "Professional websites that showcase your business, services, and brand identity." },
      { title: "Responsive Web Design", description: "Mobile-friendly layouts that adapt to desktops, tablets, and smartphones." },
      { title: "Landing Pages", description: "Focused landing pages designed to communicate offers and encourage enquiries." },
      { title: "Website Redesign", description: "Refresh your existing website with improved usability and a modern visual style." },
    ],
    benefits: [
      "Responsive design across screen sizes",
      "Clear navigation and user experience",
      "SEO-friendly page structure",
      "Performance-focused development",
    ],
    faqs: [
      { question: "How long does website development take?", answer: "A typical business website may take around 4–6 weeks, depending on its features, content, and approval process." },
      { question: "Will my website work on mobile devices?", answer: "Yes. We design responsive websites for mobile phones, tablets, laptops, and desktop screens." },
      { question: "Can you redesign my existing website?", answer: "Yes. A redesign can improve your website's visual appearance, navigation, usability, and technical foundation." },
    ],
  },
  {
    slug: "mobile-app",
    title: "Mobile Application Development",
    subtitle: "Android & iOS App Development",
    description:
      "Develop intuitive mobile applications that help your business connect with customers, streamline processes, and deliver useful digital experiences.",
    services: [
      { title: "Android App Development", description: "Applications designed for Android devices and their diverse screen sizes." },
      { title: "iOS App Development", description: "iPhone and iPad applications with polished interfaces and reliable functionality." },
      { title: "Cross-Platform Apps", description: "Shared-codebase applications for businesses targeting multiple platforms." },
      { title: "App Maintenance", description: "Updates, troubleshooting, and improvements to support your application after launch." },
    ],
    benefits: ["User-friendly mobile experiences", "Scalable application architecture", "Secure data handling", "Ongoing improvement and support"],
    faqs: [
      { question: "Can you build Android and iOS apps?", answer: "Yes. The appropriate native or cross-platform approach depends on your requirements, budget, and target audience." },
      { question: "How long does app development take?", answer: "Timelines vary with complexity, integrations, platform requirements, and testing. A project plan can be prepared after discovery." },
      { question: "Can you maintain an app after launch?", answer: "Yes. Maintenance can include bug fixes, compatibility updates, monitoring, and feature improvements." },
    ],
  },
  {
    slug: "video-production",
    title: "Professional Video Production",
    subtitle: "Creative Videos That Tell Your Story",
    description:
      "Communicate your brand message through engaging video content created for websites, advertising campaigns, social media, and customer education.",
    services: [
      { title: "Corporate Videos", description: "Introduce your company, team, services, and business values." },
      { title: "Promotional Videos", description: "Present products, services, and offers through focused visual storytelling." },
      { title: "Social Media Videos", description: "Create content suited to short-form and platform-specific viewing." },
      { title: "Video Editing", description: "Improve footage with editing, transitions, titles, sound, and motion graphics." },
    ],
    benefits: ["Consistent brand messaging", "Platform-appropriate formats", "Clear visual storytelling", "Content tailored to campaign goals"],
    faqs: [
      { question: "What types of videos can you create?", answer: "Projects can include corporate videos, product videos, promotional content, explainers, testimonials, and social media videos." },
      { question: "Can videos be made for social media?", answer: "Yes. Videos can be adapted to suitable durations, aspect ratios, and formats for different platforms." },
      { question: "Do you offer video editing?", answer: "Yes. Editing requirements can include trimming, sound, titles, transitions, color correction, and graphics." },
    ],
  },
  {
    slug: "aeo",
    title: "Answer Engine Optimization (AEO)",
    subtitle: "Make Your Content Easier to Discover",
    description:
      "Structure helpful content around customer questions so search engines and answer platforms can better understand your expertise and information.",
    services: [
      { title: "Question Research", description: "Identify common questions and information needs within your target audience." },
      { title: "Answer-Focused Content", description: "Create clear, useful responses supported by relevant context." },
      { title: "FAQ Optimization", description: "Organize frequently asked questions to improve content clarity and navigation." },
      { title: "Content Structure", description: "Use descriptive headings and appropriate structured data where relevant." },
    ],
    benefits: ["Clearer answers to customer questions", "Better organized website content", "Improved topical relevance", "Support for broader search visibility"],
    faqs: [
      { question: "What is Answer Engine Optimization?", answer: "AEO focuses on making content useful and understandable for systems that provide direct answers to user questions." },
      { question: "Is AEO different from SEO?", answer: "AEO emphasizes answer-focused content, while SEO covers a broader set of practices for search visibility. They can work together." },
      { question: "Can AEO guarantee featured answers?", answer: "No. Search and answer platforms control what they display, so specific placements cannot be guaranteed." },
    ],
  },
  {
    slug: "youtube-seo",
    title: "YouTube SEO Services",
    subtitle: "Improve Your Video Discoverability",
    description:
      "Optimize your YouTube videos and channel with relevant keywords, descriptive metadata, organized content, and audience-focused improvements.",
    services: [
      { title: "Keyword Research", description: "Discover relevant topics and search terms for your audience." },
      { title: "Video Metadata", description: "Improve titles, descriptions, and other relevant video information." },
      { title: "Channel Optimization", description: "Organize channel information, playlists, and content presentation." },
      { title: "Performance Review", description: "Use available analytics to understand viewer engagement and opportunities." },
    ],
    benefits: ["Better organized video content", "Stronger relevance to search intent", "Improved channel presentation", "Data-informed optimization"],
    faqs: [
      { question: "What does YouTube SEO include?", answer: "It can include keyword research, metadata optimization, channel organization, thumbnail recommendations, and analytics reviews." },
      { question: "Can you guarantee video rankings?", answer: "No. Rankings depend on many factors, including relevance, competition, and viewer behavior." },
      { question: "Can you optimize an existing channel?", answer: "Yes. Existing videos and channel information can be reviewed for relevant improvement opportunities." },
    ],
  },
  {
    slug: "aio",
    title: "AI Optimization (AIO)",
    subtitle: "Prepare Your Digital Presence for AI Discovery",
    description:
      "Improve the clarity, structure, and usefulness of your digital content for evolving AI-powered discovery and search experiences.",
    services: [
      { title: "Content Clarity", description: "Make important information clear, consistent, and easy to interpret." },
      { title: "Entity & Brand Information", description: "Improve consistency across relevant business information and content." },
      { title: "Technical Foundations", description: "Review accessibility, crawlability, and website structure." },
      { title: "Content Strategy", description: "Build useful, authoritative content around your audience's needs." },
    ],
    benefits: ["Clearer brand information", "Useful and well-structured content", "Stronger technical foundations", "Support for evolving discovery channels"],
    faqs: [
      { question: "What is AI Optimization?", answer: "AIO is a broad term for improving digital content and information so AI-powered systems can better interpret it." },
      { question: "Does AIO replace traditional SEO?", answer: "No. Technical SEO, helpful content, and a strong website remain important foundations." },
      { question: "Can AI visibility be guaranteed?", answer: "No. AI platforms use their own systems, and inclusion or mentions cannot be guaranteed." },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing Services",
    subtitle: "Reach the Right Audience Online",
    description:
      "Build a coordinated digital marketing strategy to increase brand awareness, attract relevant visitors, and support measurable business goals.",
    services: [
      { title: "Search Engine Optimization", description: "Improve website content and technical foundations for organic search." },
      { title: "Paid Advertising", description: "Plan and manage campaigns around defined audiences and objectives." },
      { title: "Social Media Marketing", description: "Develop consistent content and campaigns for relevant social platforms." },
      { title: "Analytics & Reporting", description: "Track meaningful metrics and identify opportunities for improvement." },
    ],
    benefits: ["Campaigns aligned with business goals", "Audience-focused strategy", "Performance tracking", "Ongoing optimization opportunities"],
    faqs: [
      { question: "What does digital marketing include?", answer: "It can include SEO, paid ads, social media, content marketing, email campaigns, and analytics." },
      { question: "How soon can marketing results appear?", answer: "Timing varies by channel, competition, budget, and starting point. Paid campaigns may generate early data, while organic growth often takes longer." },
      { question: "Do you provide campaign reports?", answer: "Reporting can be tailored to agreed objectives, channels, and performance indicators." },
    ],
  },
  {
    slug: "ecommerce-app",
    title: "Ecommerce Application Development",
    subtitle: "Build a Better Online Shopping Experience",
    description:
      "Create a streamlined online shopping experience with product catalogs, secure checkout integrations, order workflows, and store management tools.",
    services: [
      { title: "Online Store Development", description: "Build a storefront suited to your products, customers, and business model." },
      { title: "Payment Integration", description: "Connect appropriate payment providers to support checkout." },
      { title: "Inventory & Orders", description: "Organize product availability, order processing, and store operations." },
      { title: "Marketplace Development", description: "Plan multi-vendor functionality where your business model requires it." },
    ],
    benefits: ["Convenient shopping journeys", "Mobile-friendly storefronts", "Integrated store workflows", "Room to scale as needs grow"],
    faqs: [
      { question: "Can you build a custom online store?", answer: "Yes. The solution can use a suitable ecommerce platform or a custom application depending on requirements." },
      { question: "Can you integrate payment gateways?", answer: "Payment integration options depend on your provider, location, and business requirements." },
      { question: "Can I manage products and orders?", answer: "Store management features can be included to support product, inventory, and order workflows." },
    ],
  },
  {
    slug: "software-development",
    title: "Custom Software Development",
    subtitle: "Software Designed Around Your Business",
    description:
      "Build tailored software that supports your business processes, connects existing tools, and helps teams manage their work more efficiently.",
    services: [
      { title: "Business Management Systems", description: "Organize operational workflows in applications tailored to your needs." },
      { title: "CRM Development", description: "Manage customer information, sales activities, and follow-ups." },
      { title: "Dashboard & Portal Development", description: "Present relevant data and workflows through purpose-built interfaces." },
      { title: "API Integrations", description: "Connect systems and services where suitable integrations are available." },
    ],
    benefits: ["Workflows tailored to your team", "Integration opportunities", "Scalable architecture planning", "Reduced dependence on manual processes"],
    faqs: [
      { question: "What kind of software can you build?", answer: "Projects can include internal tools, dashboards, CRM systems, portals, and workflow applications." },
      { question: "Can custom software integrate with existing systems?", answer: "Yes, where suitable APIs or integration methods are available." },
      { question: "Will the software be scalable?", answer: "Architecture can be planned around your expected usage, functionality, and future growth." },
    ],
  },
  {
    slug: "geo",
    title: "Generative Engine Optimization (GEO)",
    subtitle: "Strengthen Your Brand's AI Search Presence",
    description:
      "Improve the structure, relevance, and credibility of your website content to support discoverability across generative search experiences.",
    services: [
      { title: "Content & Topic Strategy", description: "Create useful content around relevant customer questions and subject areas." },
      { title: "Brand Consistency", description: "Review the clarity and consistency of important business information." },
      { title: "Website Structure", description: "Improve headings, internal links, and information organization." },
      { title: "Visibility Monitoring", description: "Review available search and referral data to inform ongoing improvements." },
    ],
    benefits: ["Stronger topical organization", "Clearer brand information", "Helpful content for audiences", "Complementary support for SEO"],
    faqs: [
      { question: "What is GEO?", answer: "GEO focuses on improving content and brand information for potential discovery in generative AI search experiences." },
      { question: "Is GEO the same as AEO?", answer: "They overlap. AEO emphasizes answering questions, while GEO often focuses more broadly on visibility in generative search." },
      { question: "Can GEO guarantee AI mentions?", answer: "No. Mentions and citations depend on each platform and cannot be guaranteed." },
    ],
  },
  {
    slug: "youtube-ads",
    title: "YouTube Advertising Services",
    subtitle: "Connect Your Brand with Video Audiences",
    description:
      "Plan targeted YouTube advertising campaigns with clear objectives, relevant creative, audience settings, and ongoing performance evaluation.",
    services: [
      { title: "Campaign Planning", description: "Choose campaign goals, audiences, and budget priorities." },
      { title: "Video Ad Strategy", description: "Match creative messages and formats to your campaign objectives." },
      { title: "Audience Targeting", description: "Configure suitable audience and placement settings." },
      { title: "Campaign Optimization", description: "Review performance metrics and make informed adjustments." },
    ],
    benefits: ["Campaigns built around clear goals", "Audience-focused planning", "Performance measurement", "Ongoing improvement opportunities"],
    faqs: [
      { question: "What are YouTube Ads?", answer: "YouTube Ads are paid video and other advertising formats delivered through YouTube and its advertising ecosystem." },
      { question: "What budget do I need?", answer: "Budget depends on your audience, campaign goals, competition, and desired testing period." },
      { question: "Can you guarantee leads or sales?", answer: "No. Results depend on factors including targeting, creative, offer, landing page, and market conditions." },
    ],
  },
  {
    slug: "sxo",
    title: "Search Experience Optimization (SXO)",
    subtitle: "Turn Search Visitors into Engaged Customers",
    description:
      "Combine search optimization with usability improvements to help visitors find relevant information and take the next step with confidence.",
    services: [
      { title: "Search Intent Review", description: "Align page content with what visitors are trying to find." },
      { title: "User Experience Improvements", description: "Make navigation, page structure, and content easier to use." },
      { title: "Conversion Journey Review", description: "Identify friction in enquiry forms, calls to action, and key journeys." },
      { title: "Performance Review", description: "Evaluate relevant usability and website performance signals." },
    ],
    benefits: ["More intuitive navigation", "Content aligned with visitor needs", "Clearer conversion paths", "Combined search and usability focus"],
    faqs: [
      { question: "What is SXO?", answer: "SXO combines search optimization with user experience to make websites useful for both discovery and visitors." },
      { question: "How is SXO different from SEO?", answer: "SEO focuses on search visibility, while SXO also considers what happens after a visitor reaches your website." },
      { question: "Can SXO improve enquiries?", answer: "Usability and conversion improvements can help, but actual results depend on your audience, offer, and website." },
    ],
  },
];
