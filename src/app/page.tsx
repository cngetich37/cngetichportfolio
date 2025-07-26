"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiUser, FiMail, FiMessageCircle, FiSend } from "react-icons/fi";
import ThemeSwitcher from "./ThemeSwitcher";

const navLinks = [
  { label: "Home", to: "#hero" },
  { label: "Skills", to: "#skills" },
  { label: "About", to: "#about" },
  { label: "Projects", to: "#projects" },
  { label: "Testimonials", to: "#testimonials" },
  { label: "Contact", to: "#contact" },
];

// Simple testimonials data
const testimonials = [
  {
    name: "Jane Doe",
    title: "ERP Project Manager",
    quote:
      "Collins is a rare blend of technical expertise and business acumen. He delivered our Dynamics 365 project on time and exceeded expectations!",
  },
  {
    name: "John Smith",
    title: "CTO, Tech Solutions Ltd.",
    quote:
      "His full stack skills and professionalism are top-notch. Highly recommended for any complex software project.",
  },
  {
    name: "Mary W.",
    title: "Business Analyst",
    quote:
      "Collins' ability to translate business needs into technical solutions is outstanding. A pleasure to work with!",
  },
];

function useSectionReveal() {
  // Custom hook for fade-in on scroll
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return; // Only run on client
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible] as const;
}

// Yup schema for contact form validation
const contactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
});

export default function Home() {
  // For smooth scroll navigation
  const heroRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const testimonialsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    "#hero": heroRef,
    "#skills": skillsRef,
    "#about": aboutRef,
    "#projects": projectsRef,
    "#testimonials": testimonialsRef,
    "#contact": contactRef,
  };

  const handleNav = (to: string) => {
    sectionRefs[to]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Testimonials carousel state
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((idx) => (idx + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  // Contact form state
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

  // Section reveal hooks
  const [skillsSectionRef, skillsVisible] = useSectionReveal();
  const [aboutSectionRef, aboutVisible] = useSectionReveal();
  const [projectsSectionRef, projectsVisible] = useSectionReveal();
  const [testimonialsSectionRef, testimonialsVisible] = useSectionReveal();
  const [contactSectionRef, contactVisible] = useSectionReveal();

  return (
    <div className="relative min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)] flex flex-col items-center px-2 sm:px-4 md:px-8 overflow-x-hidden">
      {/* Floating Header */}
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
            <ThemeSwitcher className="ml-1 sm:ml-2" />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="w-full max-w-3xl flex flex-col items-center text-center pt-28 sm:pt-36 pb-10 sm:pb-16 relative px-2 sm:px-0"
      >
        {/* Animated Gradient Background Blob */}
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
          Dynamics 365 Finance & Operations Technical Consultant<br className="hidden sm:block" />
          Full Stack Software Engineer
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
          I build robust business solutions and modern web applications, blending deep ERP expertise with full stack engineering. Passionate about digital transformation, automation, and elegant user experiences.
        </p>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={skillsRef}
        className={`w-full max-w-3xl py-6 sm:py-8 flex flex-col items-center transition-all duration-700 ${skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} px-2 sm:px-0`}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[var(--primary)] self-center text-center">Skills</h3>
        <div ref={skillsSectionRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
          {[
            { label: "Dynamics 365 F&O", color: "from-[var(--primary)] to-[var(--secondary)] text-[var(--foreground)]" },
            { label: "X++", color: "from-purple-200 to-purple-400 dark:from-purple-900 dark:to-purple-700 text-[var(--foreground)]" },
            { label: "Power Platform", color: "from-pink-200 to-pink-400 dark:from-pink-900 dark:to-pink-700 text-[var(--foreground)]" },
            { label: "C#/.NET", color: "from-green-200 to-green-400 dark:from-green-900 dark:to-green-700 text-[var(--foreground)]" },
            { label: "React", color: "from-yellow-200 to-yellow-400 dark:from-yellow-900 dark:to-yellow-700 text-[var(--foreground)]" },
            { label: "Node.js", color: "from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-700 text-[var(--foreground)]" },
            { label: "TypeScript", color: "from-indigo-200 to-indigo-400 dark:from-indigo-900 dark:to-indigo-700 text-[var(--foreground)]" },
            { label: "SQL", color: "from-red-200 to-red-400 dark:from-red-900 dark:to-red-700 text-[var(--foreground)]" },
            { label: "Azure", color: "from-teal-200 to-teal-400 dark:from-teal-900 dark:to-teal-700 text-[var(--foreground)]" },
          ].map((skill) => (
            <div
              key={skill.label}
              className={`rounded-xl shadow-md bg-gradient-to-br ${skill.color} px-3 sm:px-4 py-2 sm:py-3 text-center font-semibold text-xs sm:text-base transition-transform hover:scale-105 hover:shadow-lg`}
            >
              {skill.label}
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className={`w-full max-w-3xl py-8 flex flex-col items-center transition-all duration-700 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h3 className="text-2xl font-bold mb-6 text-[var(--primary)] self-center text-center">About Me</h3>
        <div ref={aboutSectionRef} className="w-full bg-[var(--card)] rounded-2xl shadow-lg p-6 sm:p-8 border border-[var(--border)]">
          <p className="text-base sm:text-lg text-[var(--foreground)] leading-relaxed mb-6">
            With a strong background in ERP implementations and custom software development, I help organizations streamline operations and unlock new business value. My journey spans consulting, solution architecture, and hands-on coding—delivering scalable, maintainable, and user-friendly systems. I thrive at the intersection of business and technology, always eager to learn and innovate.
          </p>
          <div className="mb-6">
            <h4 className="font-semibold text-[var(--primary)] mb-2">Professional Timeline</h4>
            <ul className="list-disc list-inside text-[var(--foreground)] text-sm sm:text-base space-y-1">
              <li><span className="font-medium text-[var(--foreground-secondary)]">2023–Present:</span> Senior Dynamics 365 F&O Technical Consultant, leading digital transformation projects for enterprise clients.</li>
              <li><span className="font-medium text-[var(--foreground-secondary)]">2020–2023:</span> Full Stack Software Engineer, building scalable web applications and custom ERP integrations.</li>
              <li><span className="font-medium text-[var(--foreground-secondary)]">2018–2020:</span> ERP Implementation Specialist, focusing on process automation and user training.</li>
            </ul>
          </div>
          <div className="mb-6">
            <h4 className="font-semibold text-[var(--primary)] mb-2">Core Values</h4>
            <ul className="flex flex-wrap gap-3">
              <li className="bg-[var(--primary)]/10 text-[var(--foreground-secondary)] px-3 py-1 rounded-full text-xs font-semibold">Integrity</li>
              <li className="bg-[var(--primary)]/10 text-[var(--foreground-secondary)] px-3 py-1 rounded-full text-xs font-semibold">Continuous Learning</li>
              <li className="bg-[var(--primary)]/10 text-[var(--foreground-secondary)] px-3 py-1 rounded-full text-xs font-semibold">Collaboration</li>
              <li className="bg-[var(--primary)]/10 text-[var(--foreground-secondary)] px-3 py-1 rounded-full text-xs font-semibold">Innovation</li>
              <li className="bg-[var(--primary)]/10 text-[var(--foreground-secondary)] px-3 py-1 rounded-full text-xs font-semibold">Empathy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--primary)] mb-2">Beyond Work</h4>
            <p className="text-[var(--foreground-muted)] text-sm sm:text-base">
              Outside of tech, I enjoy hiking, reading about emerging technologies, and mentoring aspiring developers. I believe in lifelong learning and the power of technology to make a positive impact.
            </p>
          </div>
        </div>
      </section>

      {/* Projects/Experience Section Placeholder */}
      <section
        id="projects"
        ref={projectsRef}
        className={`w-full max-w-3xl py-8 flex flex-col items-center transition-all duration-700 ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--primary)] self-center text-center">Projects & Experience</h3>
        <div ref={projectsSectionRef} className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Placeholder cards */}
          <div className="bg-[var(--card)] dark:bg-[var(--card)] rounded-2xl shadow-lg p-6 border border-[var(--border)] dark:border-[var(--border)] flex flex-col gap-2 animate-pulse">
            <span className="font-semibold text-lg text-[var(--foreground-secondary)] dark:text-[var(--foreground-secondary)]">Showcase coming soon</span>
            <span className="text-[var(--foreground-muted)] text-sm">Real-world ERP customizations, web apps, and automation projects will be featured here. Stay tuned!</span>
          </div>
          <div className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 dark:from-[var(--primary)]/90 dark:to-[var(--secondary)]/90 rounded-2xl shadow-lg p-6 border border-[var(--border)] dark:border-[var(--border)] flex flex-col gap-2">
            <span className="font-semibold text-lg text-[var(--primary)] dark:text-[var(--primary)]">Want to collaborate?</span>
            <span className="text-[var(--foreground-muted)] text-sm">Contact me for ERP, web, or automation projects!</span>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        ref={testimonialsRef}
        className={`w-full max-w-3xl py-8 flex flex-col items-center transition-all duration-700 ${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--primary)] self-center text-center">Testimonials</h3>
        <div ref={testimonialsSectionRef} className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-xl mx-auto">
            <div className="bg-[var(--card)] dark:bg-[var(--card)] rounded-2xl shadow-lg p-8 border border-[var(--border)] dark:border-[var(--border)] flex flex-col items-center transition-all duration-500">
              <p className="text-lg italic text-[var(--foreground-secondary)] mb-4 text-center min-h-[72px]">
                &quot;{testimonials[testimonialIdx].quote}&quot;
              </p>
              <span className="font-semibold text-[var(--foreground-secondary)]">{testimonials[testimonialIdx].name}</span>
              <span className="text-[var(--foreground-muted)] text-sm">{testimonials[testimonialIdx].title}</span>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full border-2 border-[var(--primary)] dark:border-[var(--primary)] transition-all ${idx === testimonialIdx ? 'bg-[var(--primary)] dark:bg-[var(--primary)] scale-110' : 'bg-transparent'}`}
                  onClick={() => setTestimonialIdx(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className={`w-full max-w-3xl py-8 flex flex-col items-center transition-all duration-700 ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--primary)] self-center text-center">Contact</h3>
        <div ref={contactSectionRef} className="w-full max-w-lg mx-auto bg-gradient-to-br from-white to-blue-50 dark:from-[#23272f] dark:to-[#181c24] rounded-2xl shadow-2xl p-8 border border-[var(--border)] dark:border-[var(--border)]">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label className="block text-sm font-semibold text-[var(--foreground-secondary)] mb-1" htmlFor="name">Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className={`pl-10 pr-4 py-2 w-full rounded border ${errors.name ? 'border-red-400' : 'border-[var(--border)] dark:border-[var(--border)]'} bg-[var(--card)] dark:bg-[var(--card)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]`}
                  placeholder="Your Name"
                  autoComplete="off"
                />
              </div>
              {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message as string}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--foreground-secondary)] mb-1" htmlFor="email">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`pl-10 pr-4 py-2 w-full rounded border ${errors.email ? 'border-red-400' : 'border-[var(--border)] dark:border-[var(--border)]'} bg-[var(--card)] dark:bg-[var(--card)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]`}
                  placeholder="Your Email"
                  autoComplete="off"
                />
              </div>
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message as string}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--foreground-secondary)] mb-1" htmlFor="message">Message</label>
              <div className="relative">
                <FiMessageCircle className="absolute left-3 top-4 text-[var(--primary)]" />
                <textarea
                  id="message"
                  {...register("message")}
                  className={`pl-10 pr-4 py-2 w-full rounded border ${errors.message ? 'border-red-400' : 'border-[var(--border)] dark:border-[var(--border)]'} bg-[var(--card)] dark:bg-[var(--card)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] min-h-[100px]`}
                  placeholder="Your Message"
                />
              </div>
              {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message.message as string}</span>}
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
              <span className="text-green-600 dark:text-green-400 font-medium">Thank you! Your message has been sent.</span>
            )}
            {formStatus === "error" && (
              <span className="text-red-600 dark:text-red-400 font-medium">Something went wrong. Please try again.</span>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-3xl py-8 text-center text-[var(--foreground-muted)] text-sm mt-auto">
        &copy; {new Date().getFullYear()} Collins Ngetich.
      </footer>
    </div>
  );
}