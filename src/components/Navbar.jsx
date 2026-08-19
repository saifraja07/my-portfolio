import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "./icons";
import { navLinks, social } from "../data/links";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-bg/85 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <a href="#home" className="group flex flex-col leading-none">
          <span className="font-mono text-sm font-medium tracking-wide text-ink">
            SAIF ALI RAJA
          </span>
          <span className="mt-1 font-mono text-[10px] tracking-widest text-dim">
            MERN STACK DEVELOPER
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href={social.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-ink transition-colors hover:border-border-hover hover:bg-surface"
          >
            <GithubIcon size={16} strokeWidth={1.75} />
            GitHub
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md border border-border p-2 text-ink md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg px-6 py-6 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base text-ink transition-colors hover:bg-surface"
              >
                {link.label}
              </a>
            ))}
            <a
              href={social.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm text-ink"
            >
              <GithubIcon size={16} strokeWidth={1.75} />
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
