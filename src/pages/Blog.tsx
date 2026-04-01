import { motion, type Variants } from "framer-motion";
import { EyeIcon } from "@heroicons/react/24/solid";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blog";

interface Props {
  languageState: boolean;
  setLanguageState: (val: boolean) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export default function Blog({ languageState, setLanguageState, scrollRef }: Props) {
  const navigate = useNavigate();
  const l = languageState;

  const contentStagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const contentItem: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  const publishedPosts = blogPosts.filter((post) => post.status === "published");

  return (
    <>
      <Header scrollRef={scrollRef} languageState={languageState} setLanguageState={setLanguageState} />
      <div
        ref={scrollRef}
        className="min-h-screen bg-black overflow-y-auto page_scroll scrollbar_exp"
      >
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start justify-between mb-14 gap-6"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-px bg-[#10dffd]" />
                <span className="text-[#10dffd]/60 text-[10px] tracking-[0.35em] uppercase font-display">
                  {l ? "Knowledge base" : "Base de conocimiento"}
                </span>
              </div>
              <h1 className="text-white text-3xl font-light leading-tight">
                {l ? "Blog" : "Blog"}
              </h1>
              <p className="text-white/35 text-sm leading-relaxed max-w-sm">
                {l ? "Insights, strategies, and updates from RIANODEVZ." : "Descubrimientos, estrategias y novedades de RIANODEVZ."}
              </p>
            </div>

            <motion.a
              href="/portal"
              className="text-[10px] bg-[#10dffd]/8 border border-[#10dffd]/38 text-[#10dffd]
                px-5 py-2.5 rounded-full hover:bg-[#10dffd] hover:text-black transition-all
                cursor-pointer hidden md:block tracking-[0.2em] uppercase font-display shrink-0"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {l ? "Log in to Portal" : "Acceder al Portal"}
            </motion.a>
          </motion.div>

          {/* Posts */}
          <motion.div
            className="flex flex-col gap-4"
            variants={contentStagger}
            initial="hidden"
            animate="show"
          >
            {publishedPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={contentItem}
                onClick={() => navigate("/blog/" + post.slug)}
                className="group relative border border-[#10dffd]/22 hover:border-[#10dffd]/50
                  transition-all duration-300 rounded-2xl p-6 flex flex-col md:flex-row
                  md:items-center justify-between gap-4 cursor-pointer
                  hover:shadow-[0_0_24px_rgba(16,223,253,0.04)]"
                whileHover={{ x: 3 }}
              >
                {/* Corner decorators */}
                <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[#10dffd]/30 rounded-tl-2xl group-hover:border-[#10dffd]/60 transition-colors" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-[#10dffd]/30 rounded-br-2xl group-hover:border-[#10dffd]/60 transition-colors" />

                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <h3 className="text-white text-base md:text-lg font-light leading-tight">
                    {l ? post.title.en : post.title.es}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-[10px] text-[#10dffd]/70 uppercase tracking-wider bg-[#10dffd]/8 px-2.5 py-1 rounded-full border border-[#10dffd]/30">
                      {post.category}
                    </span>
                    <span className="text-white/25 text-xs">{post.date}</span>
                    {post.reads > 0 && (
                      <span className="text-white/25 text-xs flex items-center gap-1.5">
                        <EyeIcon className="w-3 h-3 text-white/20" />
                        {post.reads}
                      </span>
                    )}
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-[#10dffd]/30 text-[#10dffd]/40 group-hover:border-[#10dffd]/60 group-hover:text-[#10dffd] transition-all duration-300 shrink-0">
                  →
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {publishedPosts.length === 0 && (
            <div className="text-center py-20 text-gray-500 font-light border border-white/5 rounded-2xl mt-4">
              {l ? "No blog posts published yet." : "Aún no hay entradas publicadas en el blog."}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
