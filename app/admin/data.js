export const blogCategories = [
  "Marketing",
  "Product",
  "Design",
  "Engineering",
  "Culture",
];

export const blogStatuses = ["Draft", "Published"];

export const blogsSeed = [
  {
    id: "b1",
    title: "Scaling content ops for multi-brand teams",
    slug: "scaling-content-ops",
    category: "Marketing",
    status: "Published",
    date: "2026-01-12",
    comments: 12,
    excerpt:
      "A playbook for building consistent, multi-channel editorial engines.",
    tags: ["SaaS", "Growth"],
    seoTitle: "Scaling content ops in 2026",
    seoDescription:
      "Frameworks to help marketing teams scale content production.",
    content:
      "Outline your editorial calendar, create reusable templates, and align with cross-functional teams.",
  },
  {
    id: "b2",
    title: "Designing UX for knowledge-heavy products",
    slug: "designing-ux-for-knowledge-products",
    category: "Design",
    status: "Draft",
    date: "2026-01-18",
    comments: 5,
    excerpt: "Patterns for clarity, structure, and learning retention.",
    tags: ["UX", "Research"],
    seoTitle: "Designing UX for knowledge products",
    seoDescription:
      "A guide to creating interfaces that make learning effortless.",
    content: "Lean on hierarchy, progressive disclosure, and smart templates.",
  },
  {
    id: "b3",
    title: "Shipping faster with modular content blocks",
    slug: "shipping-faster-with-modular-blocks",
    category: "Product",
    status: "Published",
    date: "2026-01-20",
    comments: 8,
    excerpt: "Reduce time to publish by using modular, reusable sections.",
    tags: ["Product Ops", "Workflow"],
    seoTitle: "Ship content faster with modules",
    seoDescription:
      "Reusable templates and blocks help teams keep quality high.",
    content:
      "Break content into atomic sections and create reusable outlines.",
  },
  {
    id: "b4",
    title: "Editorial QA checklist for regulated teams",
    slug: "editorial-qa-checklist",
    category: "Culture",
    status: "Draft",
    date: "2026-01-22",
    comments: 3,
    excerpt: "Stay compliant while moving quickly.",
    tags: ["Compliance", "Quality"],
    seoTitle: "Editorial QA checklist",
    seoDescription: "Keep compliance and quality in sync.",
    content:
      "Standardize QA across legal, clinical, and marketing stakeholders.",
  },
  {
    id: "b5",
    title: "Engineering workflows for multimedia publishing",
    slug: "engineering-workflows-for-multimedia",
    category: "Engineering",
    status: "Published",
    date: "2026-01-24",
    comments: 9,
    excerpt: "Align product, design, and engineering around content launches.",
    tags: ["Engineering", "Pipeline"],
    seoTitle: "Multimedia publishing workflows",
    seoDescription: "How to keep creative teams shipping without friction.",
    content:
      "Automate pipeline tasks and keep assets organized with metadata.",
  },
  {
    id: "b6",
    title: "How to keep blog categories healthy",
    slug: "keep-blog-categories-healthy",
    category: "Marketing",
    status: "Published",
    date: "2026-01-25",
    comments: 4,
    excerpt: "Make your taxonomy work for search and discovery.",
    tags: ["SEO", "Information Architecture"],
    seoTitle: "Healthy blog categories",
    seoDescription: "Build a taxonomy that grows with your content.",
    content: "Audit regularly and merge overlapping categories.",
  },
];

export const categoriesSeed = [
  { id: "c1", name: "Marketing", slug: "marketing", blogs: 12 },
  { id: "c2", name: "Product", slug: "product", blogs: 8 },
  { id: "c3", name: "Design", slug: "design", blogs: 5 },
  { id: "c4", name: "Engineering", slug: "engineering", blogs: 9 },
  { id: "c5", name: "Culture", slug: "culture", blogs: 4 },
];

export const usersSeed = [
  {
    id: "u1",
    name: "Avery Hammond",
    email: "avery@lms.dev",
    role: "Admin",
    status: "Active",
  },
  {
    id: "u2",
    name: "Jordan Lee",
    email: "jordan@lms.dev",
    role: "Editor",
    status: "Active",
  },
  {
    id: "u3",
    name: "Priya Singh",
    email: "priya@lms.dev",
    role: "Editor",
    status: "Pending",
  },
  {
    id: "u4",
    name: "Noah Brooks",
    email: "noah@lms.dev",
    role: "Admin",
    status: "Active",
  },
];

export const commentsSeed = [
  {
    id: "cm1",
    user: "Jamie Chen",
    comment: "Loved the modular block approach.",
    blog: "Shipping faster with modular content blocks",
    status: "Approved",
  },
  {
    id: "cm2",
    user: "Taylor Fox",
    comment: "Can you share templates for editorial QA?",
    blog: "Editorial QA checklist for regulated teams",
    status: "Pending",
  },
  {
    id: "cm3",
    user: "Chris Park",
    comment: "Great taxonomy ideas!",
    blog: "How to keep blog categories healthy",
    status: "Approved",
  },
];
