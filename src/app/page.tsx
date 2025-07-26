"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiUser, FiMail, FiMessageCircle, FiSend } from "react-icons/fi";

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
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs = {
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
    <div className="relative min-h-screen bg-gradient-to-br from-[#e0e7ef] to-[#f8fafc] dark:from-[#181c24] dark:to-[#23272f] font-sans text-foreground flex flex-col items-center px-2 sm:px-0 overflow-x-hidden">
      {/* Floating Header */}
      <header className="fixed top-0 left-0 w-full z-30 bg-white/80 dark:bg-[#181c24]/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all">
        <nav className="w-full max-w-7xl flex items-center justify-between px-4 py-2 mx-auto">
          <div className="flex items-center gap-3">
            <Image
              src="/cngetichlogo.svg"
              alt="Collins Ngetich Logo"
              width={40}
              height={40}
              className="rounded"
            />
            <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none whitespace-nowrap">
              Collins Ngetich
            </span>
          </div>
          <ul className="flex gap-2 sm:gap-4 text-sm sm:text-base font-medium">
            {navLinks.map((link) => (
              <li key={link.to}>
                <button
                  className="px-3 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() => handleNav(link.to)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="w-full max-w-3xl flex flex-col items-center text-center pt-36 pb-16 relative"
      >
        {/* Animated Gradient Background Blob */}
        <div className="absolute -z-10 left-1/2 top-0 -translate-x-1/2 blur-2xl opacity-40 w-[420px] h-[320px] bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 animate-pulse rounded-full" />
        <div className="relative w-36 h-36 mb-6 group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 blur-xl opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-transform duration-500" />
          <Image
            src="/cngetichlogo.svg"
            alt="Collins Ngetich Logo"
            fill
            className="rounded-full border-4 border-white shadow-xl object-contain group-hover:scale-105 transition-transform duration-500 bg-white"
            priority
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          Collins Ngetich
        </h1>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Dynamics 365 Finance & Operations Technical Consultant<br />
          Full Stack Software Engineer
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          I build robust business solutions and modern web applications, blending deep ERP expertise with full stack engineering. Passionate about digital transformation, automation, and elegant user experiences.
        </p>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={skillsRef}
        className={`w-full max-w-3xl py-8 flex flex-col items-center transition-all duration-700 ${skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h3 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400 self-start">Skills</h3>
        <div ref={skillsSectionRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
          {[
            { label: "Dynamics 365 F&O", color: "from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700 text-blue-800 dark:text-blue-200" },
            { label: "X++", color: "from-purple-100 to-purple-300 dark:from-purple-900 dark:to-purple-700 text-purple-800 dark:text-purple-200" },
            { label: "Power Platform", color: "from-pink-100 to-pink-300 dark:from-pink-900 dark:to-pink-700 text-pink-800 dark:text-pink-200" },
            { label: "C#/.NET", color: "from-green-100 to-green-300 dark:from-green-900 dark:to-green-700 text-green-800 dark:text-green-200" },
            { label: "React", color: "from-yellow-100 to-yellow-300 dark:from-yellow-900 dark:to-yellow-700 text-yellow-800 dark:text-yellow-200" },
            { label: "Node.js", color: "from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200" },
            { label: "TypeScript", color: "from-indigo-100 to-indigo-300 dark:from-indigo-900 dark:to-indigo-700 text-indigo-800 dark:text-indigo-200" },
            { label: "SQL", color: "from-red-100 to-red-300 dark:from-red-900 dark:to-red-700 text-red-800 dark:text-red-200" },
            { label: "Azure", color: "from-teal-100 to-teal-300 dark:from-teal-900 dark:to-teal-700 text-teal-800 dark:text-teal-200" },
          ].map((skill) => (
            <div
              key={skill.label}
              className={`rounded-xl shadow-md bg-gradient-to-br ${skill.color} px-4 py-3 text-center font-semibold text-base transition-transform hover:scale-105 hover:shadow-lg`}
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
        <h3 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400 self-start">About Me</h3>
        <div ref={aboutSectionRef} className="w-full bg-gradient-to-br from-white to-blue-50 dark:from-[#23272f] dark:to-[#181c24] rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-gray-800">
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            With a strong background in ERP implementations and custom software development, I help organizations streamline operations and unlock new business value. My journey spans consulting, solution architecture, and hands-on coding—delivering scalable, maintainable, and user-friendly systems. I thrive at the intersection of business and technology, always eager to learn and innovate.
          </p>
          <div className="mb-6">
            <h4 className="font-semibold text-blue-600 dark:text-blue-300 mb-2">Professional Timeline</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm sm:text-base space-y-1">
              <li><span className="font-medium">2023–Present:</span> Senior Dynamics 365 F&O Technical Consultant, leading digital transformation projects for enterprise clients.</li>
              <li><span className="font-medium">2020–2023:</span> Full Stack Software Engineer, building scalable web applications and custom ERP integrations.</li>
              <li><span className="font-medium">2018–2020:</span> ERP Implementation Specialist, focusing on process automation and user training.</li>
            </ul>
          </div>
          <div className="mb-6">
            <h4 className="font-semibold text-blue-600 dark:text-blue-300 mb-2">Core Values</h4>
            <ul className="flex flex-wrap gap-3">
              <li className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-semibold">Integrity</li>
              <li className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-xs font-semibold">Continuous Learning</li>
              <li className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs font-semibold">Collaboration</li>
              <li className="bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 px-3 py-1 rounded-full text-xs font-semibold">Innovation</li>
              <li className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-xs font-semibold">Empathy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-600 dark:text-blue-300 mb-2">Beyond Work</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
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
        <h3 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400 self-start">Projects & Experience</h3>
        <div ref={projectsSectionRef} className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Placeholder cards */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-800 flex flex-col gap-2 animate-pulse">
            <span className="font-semibold text-lg text-gray-700 dark:text-gray-200">Showcase coming soon</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">Real-world ERP customizations, web apps, and automation projects will be featured here. Stay tuned!</span>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-800 flex flex-col gap-2">
            <span className="font-semibold text-lg text-blue-700 dark:text-blue-200">Want to collaborate?</span>
            <span className="text-gray-600 dark:text-gray-300 text-sm">Contact me for ERP, web, or automation projects!</span>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        ref={testimonialsRef}
        className={`w-full max-w-3xl py-8 flex flex-col items-center transition-all duration-700 ${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h3 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400 self-start">Testimonials</h3>
        <div ref={testimonialsSectionRef} className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800 flex flex-col items-center transition-all duration-500">
              <p className="text-lg italic text-gray-700 dark:text-gray-200 mb-4 text-center min-h-[72px]">
                "{testimonials[testimonialIdx].quote}"
              </p>
              <span className="font-semibold text-blue-700 dark:text-blue-300">{testimonials[testimonialIdx].name}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">{testimonials[testimonialIdx].title}</span>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full border-2 border-blue-400 dark:border-blue-600 transition-all ${idx === testimonialIdx ? 'bg-blue-500 dark:bg-blue-400 scale-110' : 'bg-transparent'}`}
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
        <h3 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400 self-start">Contact</h3>
        <div ref={contactSectionRef} className="w-full max-w-lg mx-auto bg-gradient-to-br from-white to-blue-50 dark:from-[#23272f] dark:to-[#181c24] rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-800">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className={`pl-10 pr-4 py-2 w-full rounded border ${errors.name ? 'border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="Your Name"
                  autoComplete="off"
                />
              </div>
              {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message as string}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`pl-10 pr-4 py-2 w-full rounded border ${errors.email ? 'border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="Your Email"
                  autoComplete="off"
                />
              </div>
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message as string}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1" htmlFor="message">Message</label>
              <div className="relative">
                <FiMessageCircle className="absolute left-3 top-4 text-blue-400" />
                <textarea
                  id="message"
                  {...register("message")}
                  className={`pl-10 pr-4 py-2 w-full rounded border ${errors.message ? 'border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]`}
                  placeholder="Your Message"
                />
              </div>
              {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message.message as string}</span>}
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors disabled:opacity-60 shadow-lg"
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
      <footer className="w-full max-w-3xl py-8 text-center text-gray-500 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Collins Ngetich.
      </footer>
    </div>
  );
}