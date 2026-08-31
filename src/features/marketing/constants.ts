export const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
] as const

export const brands = [
  "Stellar",
  "Solana",
  "Adobe",
  "Discord",
  "Merck",
  "Meta",
  "Aperture",
  "Treecard",
  "Creative Studio",
] as const

export const featurePills = [
  { label: "Shorten links", className: "bg-primary-fixed text-on-primary-fixed" },
  {
    label: "Understand your audience",
    className: "bg-secondary-container text-on-secondary-container",
  },
  { label: "Manage your links", className: "bg-tertiary-fixed text-on-tertiary-fixed" },
] as const

export const benefits = [
  {
    title: "Share links",
    description: "Create clean, memorable URLs for every channel.",
    icon: "share",
    well: "bg-primary-fixed text-primary",
  },
  {
    title: "Drive conversions",
    description: "Understand which campaigns bring the most engagement.",
    icon: "trending",
    well: "bg-secondary-container text-secondary",
  },
  {
    title: "Track results",
    description: "Monitor link performance and improve what works.",
    icon: "monitor",
    well: "bg-tertiary-fixed text-tertiary",
  },
] as const

export const testimonials = [
  {
    quote:
      "This tool completely changed how I track my freelance marketing campaigns. Highly recommended!",
    name: "Maya Carter",
    role: "Digital Marketer",
    avatar: "bg-primary-fixed",
  },
  {
    quote:
      "The analytics are so straightforward and the branded links look super professional to my clients.",
    name: "Liam Wong",
    role: "Freelance Designer",
    avatar: "bg-secondary-container",
  },
  {
    quote:
      "I use it for every single post. It's fast, reliable, and gives me the data I need.",
    name: "Kerry Wells",
    role: "Content Creator",
    avatar: "bg-tertiary-fixed",
  },
  {
    quote:
      "Finally, a link shortener that doesn't feel clunky. Love the clean interface.",
    name: "Annie Foster",
    role: "Social Media Manager",
    avatar: "bg-primary-fixed",
  },
  {
    quote:
      "The best decision I made for my online business this year. Essential tool.",
    name: "Daniel Nicholson",
    role: "E-commerce Founder",
    avatar: "bg-secondary-container",
  },
  {
    quote:
      "It just works. No fuss, great analytics, and my links look trustworthy.",
    name: "Shannon Taylor",
    role: "Blogger",
    avatar: "bg-tertiary-fixed",
  },
] as const

export const faqs = [
  {
    question: "What is a URL shortener?",
    answer:
      "A URL shortener is a tool that takes a long, unwieldy link and turns it into a shorter, more manageable one that redirects to the original destination.",
  },
  {
    question: "What is a QR Code?",
    answer:
      "A QR Code is a scannable barcode that typically links to a website, app, or specific digital content when scanned with a smartphone camera.",
  },
  {
    question: "What are the benefits of a short URL?",
    answer:
      "Short URLs are easier to share, read, and remember. They also save space in character-limited posts and can be tracked for analytics.",
  },
  {
    question: "What can a QR Code do?",
    answer:
      "QR codes can direct users to websites, download apps, display text, connect to Wi-Fi networks, or process payments quickly.",
  },
  {
    question: "What is a custom URL shortener?",
    answer:
      "A custom URL shortener allows you to use your own domain name for shortened links, reinforcing your brand identity with every link shared.",
  },
  {
    question: "What is a Link-in-bio?",
    answer:
      "A Link-in-bio is a landing page that hosts multiple links, commonly used on social media platforms that only allow one link in a user's profile.",
  },
] as const

export const footerColumns = [
  {
    title: "Products",
    links: [
      { href: "#", label: "Link Management" },
      { href: "#", label: "QR Code Generator" },
      { href: "#", label: "Link-in-bio" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#", label: "Support" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Media Kit" },
      { href: "#", label: "About" },
      { href: "#", label: "Developers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Cookie Policy" },
      { href: "#", label: "Terms of Service" },
      { href: "#", label: "Code of Conduct" },
      { href: "#", label: "Sitemap" },
    ],
  },
] as const
