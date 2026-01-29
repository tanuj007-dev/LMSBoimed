import about1 from "../components/assets/about1.png";
import about2 from "../components/assets/about2.png";
import about3 from "../components/assets/about3.png";

export const allPosts = [
  {
    slug: "new-standard-clinical-trial-readiness",
    title: "The New Standard for Clinical Trial Readiness",
    excerpt: "A practical roadmap for sponsors and coordinators to build resilient, audit-ready trial operations.",
    content: `
      <p>In the rapidly evolving landscape of clinical research, maintaining "audit-ready" status isn't just a goal—it's a necessity. This guide explores the essential components of modern trial readiness.</p>
      <h2>The Shift Toward Proactive Compliance</h2>
      <p>Traditional clinical trial operations often relied on reactive measures, addressing issues only when they were flagged during audits. Today, the standard has shifted toward proactive, continuous monitoring.</p>
      <h3>Key Pillars of Readiness:</h3>
      <ul>
        <li><strong>Continuous Personnel Training:</strong> Ensuring every team member is up-to-date with the latest GCP guidelines.</li>
        <li><strong>Digital First Documentation:</strong> Moving away from paper-heavy processes to secure, cloud-based eTMF systems.</li>
        <li><strong>Real-time Data Oversight:</strong> Utilizing dashboards to identify signal deviations before they become critical errors.</li>
      </ul>
      <p>By implementing these standards, sponsors can reduce site activation timelines by up to 30% while significantly lowering the risk of regulatory findings.</p>
    `,
    category: "Clinical Operations",
    date: "Jan 14, 2026",
    readTime: "6 min read",
    image: about1,
    author: "Dr. Sarah Mitchell",
    authorRole: "Head of Clinical Operations"
  },
  {
    slug: "data-integrity-2026-inspectors-expect",
    title: "Data Integrity in 2026: What Inspectors Expect",
    excerpt: "Key controls, documentation patterns, and training habits that keep your data defensible.",
    content: `
      <p>Data integrity is the cornerstone of clinical research. As we move into 2026, regulatory bodies are increasing their focus on the ALCOA+ principles in digital environments.</p>
      <h2>The ALCOA+ Evolution</h2>
      <p>Attributable, Legible, Contemporaneous, Original, and Accurate—these principles are more critical than ever as trials become increasingly decentralized.</p>
      <blockquote>"Integrity is not just about the final data point; it's about the entire lifecycle of the information."</blockquote>
      <p>Inspectors are now looking deeper into audit trails, seeking evidence of data entry timing and system access patterns that verify the authenticity of every record.</p>
    `,
    category: "Quality & Compliance",
    date: "Jan 05, 2026",
    readTime: "8 min read",
    image: about2,
    author: "Michael Chen",
    authorRole: "Senior Quality Auditor"
  },
  {
    slug: "future-of-patient-recruitment-digital-strategies",
    title: "Digital Strategies for Patient Recruitment in 2026",
    excerpt: "How decentralized trials and social targeting are redefining enrollment timelines.",
    content: `
      <p>The landscape of patient recruitment has shifted dramatically. In 2026, the focus is on meeting patients where they are—online and in their communities.</p>
      <h2>The Power of Precision Targeting</h2>
      <p>Gone are the days of generic radio ads and billboards. Modern recruitment leverages precision targeting to find patients with specific conditions, ensuring higher qualification rates from the start.</p>
      <p>Decentralized elements like e-Consent and remote screening have lowered the barrier to entry, making participation possible for a much wider demographic.</p>
    `,
    category: "Patient Experience",
    date: "Jan 18, 2026",
    readTime: "5 min read",
    image: about3,
    author: "James Wilson",
    authorRole: "Digital Recruitment Specialist"
  },
  {
    slug: "from-protocol-to-patient-human-centered-trials",
    title: "From Protocol to Patient: Human-Centered Trials",
    excerpt: "Designing patient journeys that boost retention while honoring ethical commitments.",
    content: `
      <p>Patient centricity is often discussed, but rarely fully implemented. Human-centered design in clinical trials means looking at the protocol through the eyes of the participant.</p>
      <h2>Reducing Participant Burden</h2>
      <p>High dropout rates often stem from logistical challenges rather than clinical issues. By streamlining visits and utilizing home-nursing options, we can significantly improve the patient experience.</p>
      <p>Future trials will prioritize flexibility, allowing patients to contribute data in ways that fit their daily lives, rather than forcing them to adapt to rigid site schedules.</p>
    `,
    category: "Patient Experience",
    date: "Dec 22, 2025",
    readTime: "5 min read",
    image: about3,
    author: "Elena Rodriguez",
    authorRole: "Patient Advocacy Lead"
  },
  {
    slug: "ai-pharmacovigilance-early-signal-detection",
    title: "AI in Pharmacovigilance: Early Signal Detection",
    excerpt: "How emerging models help safety teams prioritize cases without losing transparency.",
    content: `
      <p>Artificial Intelligence is transforming how we monitor drug safety. Early signal detection is no longer just about pattern matching—it's about predictive analytics.</p>
      <p>By leveraging machine learning, safety teams can process vast amounts of adverse event data in real-time, identifying potential risks weeks or months earlier than traditional methods.</p>
    `,
    category: "Safety",
    date: "Jan 20, 2026",
    readTime: "7 min read",
    image: about2,
    author: "David Wu",
    authorRole: "Director of Safety Science"
  },
  {
    slug: "clinical-ops-playbook-site-start-up-excellence",
    title: "Clinical Ops Playbook: Site Start-Up Excellence",
    excerpt: "A step-by-step checklist for activation, delegation, and site engagement.",
    content: `
      <p>Site start-up is often the biggest bottleneck in clinical trials. A modular, standardized approach can shave weeks off the timeline.</p>
      <p>This playbook details the essential steps for rapid site activation, from regulatory submissions to the first patient in.</p>
    `,
    category: "Operations",
    date: "Jan 10, 2026",
    readTime: "6 min read",
    image: about1,
    author: "Janice Thompson",
    authorRole: "Clinical Operations Manager"
  },
  {
    slug: "leadership-notes-building-future-ready-teams",
    title: "Leadership Notes: Building Future-Ready Teams",
    excerpt: "Culture systems that keep clinical teams aligned across global studies.",
    content: `
      <p>Managing global clinical teams requires more than just project management software—it requires a culture of transparency and shared goals.</p>
      <p>Learn how to build resilient teams that can handle the complexities of multi-national, multi-center trials.</p>
    `,
    category: "Leadership",
    date: "Dec 29, 2025",
    readTime: "4 min read",
    image: about3,
    author: "Robert Vance",
    authorRole: "VP of Research & Development"
  }
];

export const featuredPosts = allPosts.slice(0, 4);
export const latestPosts = allPosts.slice(3);
