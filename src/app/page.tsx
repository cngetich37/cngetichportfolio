"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FiUser,
  FiMail,
  FiMessageCircle,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiDownload,
  FiExternalLink,
} from "react-icons/fi";
import ThemeSwitcher from "./ThemeSwitcher";

const EMAIL = "cngetich37@gmail.com";
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`;
const GITHUB_URL = "https://github.com/cngetich37";
const LINKEDIN_URL = "https://www.linkedin.com/in/cngetich/";
const CV_URL = "/Collins_Ngetich_CV.pdf";

const navLinks = [
  { label: "Home", to: "#hero" },
  { label: "Projects", to: "#projects" },
  { label: "Skills", to: "#skills" },
  { label: "About", to: "#about" },
  { label: "Contact", to: "#contact" },
];

const projects = [
  {
    title: "UBPMadeEasy",
    summary:
      "A web app for searching business activities and seeing the licence and finance-act fees that apply, with fee calculation from user-entered dimensions and shareable PDF summaries.",
    stack: ["React", "Node.js", "react-select", "jsPDF", "Vercel"],
    highlights: [
      "Debounced API search with loading states",
      "Fee calculation based on advertisement type and size",
      "PDF generation in the browser",
    ],
    live: "https://ubp-easy.vercel.app/",
    repo: "https://github.com/cngetich37/ubpmadeeasy",
  },
  {
    title: "Tenderpoa",
    summary:
      "A full-stack tender management platform with authenticated users, validated forms and a MongoDB data layer.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    highlights: [
      "JWT authentication",
      "Schema validation with Yup and Formik",
      "Mongoose-backed data models",
    ],
  },
  {
    title: "NairobiPay (client project)",
    summary:
      "Supported a government financial tracking platform integrated with Dynamics 365 Business Central, improving revenue reconciliation and reporting.",
    stack: ["Business Central", "OData", "REST APIs"],
    highlights: [
      "OData and REST API integration",
      "Revenue reconciliation and reporting",
    ],
  },
];

const skills = [
  "Claude API & MCP",
  "REST & OData APIs",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "SQL & PostgreSQL",
  "MongoDB",
  "Dynamics 365 F&O",
  "X++",
  "Azure & Azure DevOps",
  "Git & GitHub",
];

const journey = [
  {
    period: "Jun 2024 – Present",
    role: "D365 F&O Technical Consultant",
    org: "Impax Business Solutions Limited",
    text: "Remote role building X++ customisations, API integrations and finance and HR reports for client teams, and supporting UAT and go-live.",
  },
  {
    period: "Jan 2024 – May 2024",
    role: "ICT Officer",
    org: "Nairobi City County Government",
    text: "SQL reports, Power BI dashboards and remote Dynamics 365 Business Central support for end-users.",
  },
  {
    period: "Jul 2023 – Dec 2023",
    role: "Pre-Sales Engineer",
    org: "Intracom Africa Ltd.",
    text: "Built ERP integration prototypes, solution architecture diagrams and technical documentation for prospective clients.",
  },
  {
    period: "Jan 2023 – Jun 2023",
    role: "System Support Officer",
    org: "Nairobi City County Government",
    text: "Technical support on a county revenue platform using REST APIs and Dynamics ERP.",
  },
  {
    period: "Jan 2022 – Dec 2022",
    role: "Business Application Support, CRD",
    org: "Kenya Revenue Authority",
    text: "Application support and problem solving using REST APIs, Dynamics ERP and Python.",
  },
  {
    period: "Mar 2018 – Aug 2018",
    role: "Junior Software Engineer (internship)",
    org: "FarmDrive",
    text: "Python, Flask, PostgreSQL, REST APIs and Git.",
  },
];

function useSectionReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible] as const;
}

const contactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup
    .string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    "#hero": heroRef,
    "#projects": projectsRef,
    "#skills": skillsRef,
    "#about": aboutRef,
    "#contact": contactRef,
  };

  const handleNav = (to: string) => {
    sectionRefs[to]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);
  const [formLoading, setFormLoading] = useState(false);

  const onSubmit = async (data: { name: string; email: string; message: string }) => {
    setFormLoading(true);
    setFormStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setFormStatus("success");
        reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
    setFormLoading(false);
  };

  const [projectsSectionRef, projectsVisible] = useSectionReveal();
  const [skillsSectionRef, skillsVisible] = useSectionReveal();
  const [aboutSectionRef, aboutVisible] = useSectionReveal();
  const [contactSectionRef, contactVisible] = useSectionReveal();

  const linkBtn =
    "inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm font-medium hover:bg-[var(--primary)]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]";

  return (
    <div className="relative min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)] flex flex-col items-center px-2 sm:px-4 md:px-8 overflow-x-hidden">
      <header className="fixed top-0 left-0 w-full z-30 bg-[var(--card)]/80 backdrop-blur border-b border-[var(--border)] shadow-sm transition-all">
        <nav className="w-full max-w-7xl flex items-center justify-between px-2 sm:px-4 py-2 mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/cngetichlogo.svg"
              alt="Collins Ngetich Logo"
              width={32}
              height={32}
              className="rounded min-w-8 min-h-8"
            />
            <span className="font-extrabold text-base sm:text-lg md:text-xl tracking-tight bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent select-none whitespace-nowrap">
              Collins Ngetich
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 sm:gap-2 md:gap-4 overflow-x-auto scrollbar-hide">
            <ul className="flex gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <button
                    className="px-2 sm:px-3 py-1 rounded hover:bg-[var(--primary)]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    onClick={() => handleNav(link.to)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <ThemeSwitcher />
        </nav>
      </header>

      <section
        id="hero"
        ref={heroRef}
        className="w-full max-w-3xl flex flex-col items-center text-center pt-28 sm:pt-36 pb-10 sm:pb-16 relative px-2 sm:px-0"
      >
        <div className="absolute -z-10 left-1/2 top-0 -translate-x-1/2 blur-2xl opacity-40 w-[260px] h-[180px] sm:w-[420px] sm:h-[320px] bg-gradient-to-tr from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] animate-pulse rounded-full" />
        <div className="relative w-24 h-24 sm:w-36 sm:h-36 mb-4 sm:mb-6 group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] blur-xl opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-transform duration-500" />
          <Image
            src="/cngetichlogo.svg"
            alt="Collins Ngetich Logo"
            fill
            className="rounded-full border-4 border-white shadow-xl object-contain group-hover:scale-105 transition-transform duration-500 bg-white"
            priority
          />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 tracking-tight bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent drop-shadow-lg">
          Collins Ngetich
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[var(--foreground-secondary)] mb-3 sm:mb-4">
          Software Developer &middot; AI &amp; Automation
          <br className="hidden sm:block" />
          Dynamics 365 F&amp;O Technical Consultant
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[var(--foreground-muted)] max-w-xl mx-auto mb-6">
          I build and integrate business systems: REST and OData APIs, SQL data pipelines, workflow automation and web apps. I work with Claude and other AI tools, and I review everything I ship.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={CV_URL} download className={linkBtn}>
            <FiDownload /> Download CV
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={linkBtn}>
            <FiGithub /> GitHub
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkBtn}>
            <FiLinkedin /> LinkedIn
          </a>
          <a href={GMAIL_COMPOSE_URL} target="_blank" rel="noopener noreferrer" className={linkBtn}>
            <FiMail /> Email
          </a>
        </div>
      </section>

      <section
        id="projects"
        ref={projectsRef}
        className={`w-full max-w-3xl py-8 flex flex-col items-center transition-all duration-700 ${projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--primary)] self-center text-center">
          Projects
        </h3>
        <div ref={projectsSectionRef} className="w-full grid grid-cols-1 gap-6">
          {projects.map((p) => (
            <article
              key={p.title}
              className="bg-[var(--card)] rounded-2xl shadow-lg p-6 border border-[var(--border)] flex flex-col gap-3"
            >
              <h4 className="font-semibold text-lg text-[var(--foreground-secondary)]">{p.title}</h4>
              <p className="text-sm sm:text-base text-[var(--foreground)]">{p.summary}</p>
              <ul className="list-disc list-inside text-sm text-[var(--foreground-muted)] space-y-1">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="bg-[var(--primary)]/10 text-[var(--foreground-secondary)] px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              {(p.live || p.repo) && (
                <div className="flex flex-wrap gap-3 pt-1">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                      <FiExternalLink /> Live demo
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                      <FiGithub /> Source code
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section
        id="skills"
        ref={skillsRef}
        className={`w-full max-w-3xl py-6 sm:py-8 flex flex-col items-center transition-all duration-700 ${skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} px-2 sm:px-0`}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[var(--primary)] self-center text-center">
          Skills
        </h3>
        <div ref={skillsSectionRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
          {skills.map((label) => (
            <div
              key={label}
              className="rounded-xl shadow-md bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 border border-[var(--border)] px-3 sm:px-4 py-2 sm:py-3 text-center font-semibold text-xs sm:text-base text-[var(--foreground)] transition-transform hover:scale-105 hover:shadow-lg"
            >
              {label}
            </div>
          ))}
        </div>
      </section>

      <section
        id="about"
        ref={aboutRef}
        className={`w-full max-w-3xl py-8 flex flex-col items-center transition-all duration-700 ${aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h3 className="text-2xl font-bold mb-6 text-[var(--primary)] self-center text-center">About Me</h3>
        <div
          ref={aboutSectionRef}
          className="w-full bg-[var(--card)] rounded-2xl shadow-lg p-6 sm:p-8 border border-[var(--border)]"
        >
          <p className="text-base sm:text-lg text-[var(--foreground)] leading-relaxed mb-6">
            I&apos;m a software developer with 4+ years of hands-on experience in ERP customisation, API integrations, SQL data work and reporting. By day I build on Dynamics 365 Finance &amp; Operations; on my own time I build full-stack web apps with React, TypeScript and Node.js. I work remotely, agree scope up front and deliver through testing and go-live.
          </p>
          <div className="mb-6">
            <h4 className="font-semibold text-[var(--primary)] mb-2">How I work</h4>
            <p className="text-[var(--foreground-muted)] text-sm sm:text-base">
              I use Claude and other AI coding tools in my daily development, and I review and test everything before it ships. I keep secrets in environment variables, write READMEs that explain setup and known limits, and tell clients plainly what is done and what still needs attention.
            </p>
          </div>
          <div className="mb-6">
            <h4 className="font-semibold text-[var(--primary)] mb-3">Experience</h4>
            <ul className="space-y-4">
              {journey.map((j) => (
                <li key={`${j.period}-${j.org}`} className="text-sm sm:text-base">
                  <span className="font-medium text-[var(--foreground-secondary)]">{j.period}</span>
                  <div>
                    <strong>{j.role}</strong>, {j.org}
                  </div>
                  <p className="text-[var(--foreground-muted)]">{j.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--primary)] mb-2">Education &amp; certifications</h4>
            <ul className="list-disc list-inside text-sm sm:text-base text-[var(--foreground)] space-y-1">
              <li>B.Sc. Informatics, Moi University (2020)</li>
              <li>MB-500: Dynamics 365 Finance &amp; Operations Developer</li>
              <li>AI Automation with Anthropic Claude API&apos;s Agentic Computer Use</li>
              <li>Model Context Protocol (MCP): Hands-On with Agentic AI</li>
              <li>AI Coding Agents with GitHub Copilot and Cursor</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="contact"
        ref={contactRef}
        className={`w-full max-w-3xl py-8 flex flex-col items-center transition-all duration-700 ${contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--primary)] self-center text-center">Contact</h3>
        <div
          ref={contactSectionRef}
          className="w-full max-w-lg mx-auto bg-gradient-to-br from-white to-blue-50 dark:from-[#23272f] dark:to-[#181c24] rounded-2xl shadow-2xl p-8 border border-[var(--border)]"
        >
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label className="block text-sm font-semibold text-[var(--foreground-secondary)] mb-1" htmlFor="name">
                Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className={`pl-10 pr-4 py-2 w-full rounded border ${errors.name ? "border-red-400" : "border-[var(--border)]"} bg-[var(--card)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]`}
                  placeholder="Your Name"
                  autoComplete="off"
                />
              </div>
              {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message as string}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--foreground-secondary)] mb-1" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`pl-10 pr-4 py-2 w-full rounded border ${errors.email ? "border-red-400" : "border-[var(--border)]"} bg-[var(--card)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]`}
                  placeholder="Your Email"
                  autoComplete="off"
                />
              </div>
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message as string}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--foreground-secondary)] mb-1" htmlFor="message">
                Message
              </label>
              <div className="relative">
                <FiMessageCircle className="absolute left-3 top-4 text-[var(--primary)]" />
                <textarea
                  id="message"
                  {...register("message")}
                  className={`pl-10 pr-4 py-2 w-full rounded border ${errors.message ? "border-red-400" : "border-[var(--border)]"} bg-[var(--card)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] min-h-[100px]`}
                  placeholder="Your Message"
                />
              </div>
              {errors.message && (
                <span className="text-red-500 text-xs mt-1">{errors.message.message as string}</span>
              )}
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-semibold py-2 rounded transition-colors disabled:opacity-60 shadow-lg"
              disabled={formLoading || isSubmitting}
            >
              <FiSend className="text-lg" />
              {formLoading || isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {formStatus === "success" && (
              <span className="text-green-600 dark:text-green-400 font-medium">
                Thank you! Your message has been sent.
              </span>
            )}
            {formStatus === "error" && (
              <span className="text-red-600 dark:text-red-400 font-medium">
                Something went wrong. Please try again, or email me directly at{" "}
                <a
                  className="underline"
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {EMAIL}
                </a>
                .
              </span>
            )}
          </form>
        </div>
      </section>

      <footer className="w-full max-w-3xl py-8 text-center text-[var(--foreground-muted)] text-sm mt-auto">
        &copy; {new Date().getFullYear()} Collins Ngetich.
      </footer>
    </div>
  );
}
