import { ArrowRight, ChevronDown } from "lucide-react";
import { GithubIcon } from "./icons";
import { motion } from "framer-motion";
import CodeVisual from "./CodeVisual";
import { social } from "../data/links";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-1px)] items-center px-6 pt-24 pb-16 sm:px-10 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-5 font-mono text-xs tracking-widest text-accent uppercase"
          >
            MERN Stack Developer
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
          >
            I build web applications, backend systems, and cloud
            infrastructure.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-lg text-base text-muted sm:text-lg"
          >
            I enjoy turning complex problems into simple, reliable, and
            scalable solutions.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              View My Work
              <ArrowRight size={16} strokeWidth={2} />
            </a>
            <a
              href={social.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-border-hover hover:bg-surface"
            >
              <GithubIcon size={16} strokeWidth={1.75} />
              GitHub
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <CodeVisual />
        </motion.div>
      </div>

      <a
        href="#work"
        aria-label="Scroll to work section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-dim transition-colors hover:text-muted sm:flex"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
