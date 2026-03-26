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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h1 className="text-white text-3xl font-light mb-2">
                {l ? "Our Blog" : "Nuestro Blog"}
              </h1>
              <p className="text-gray-400 text-sm">
                {l ? "Insights, strategies, and updates from RIANODEVZ." : "Descubrimientos, estrategias y novedades de RIANODEVZ."}
              </p>
            </div>
            
            <motion.a
              href="/portal"
              className="text-xs bg-[#10dffd]/10 border border-[#10dffd]/30 text-[#10dffd] px-5 py-2.5 rounded-xl hover:bg-[#10dffd] hover:text-black transition-colors cursor-pointer hidden md:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
                className="border border-[#10dffd]/10 hover:border-[#10dffd]/30 transition-colors rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#10dffd]/[0.01] cursor-pointer"
                whileHover={{ borderColor: "rgba(16,223,253,0.3)", x: 4 }}
              >
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <h3 className="text-white text-lg font-light leading-tight">
                    {l ? post.title.en : post.title.es}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-[#10dffd] uppercase tracking-wider bg-[#10dffd]/10 px-2 py-0.5 rounded-md">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs">{post.date}</span>
                    {post.reads > 0 && (
                      <span className="text-gray-500 text-xs flex items-center gap-1.5">
                        <EyeIcon className="w-3.5 h-3.5 text-gray-400" />
                        {post.reads}
                      </span>
                    )}
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-[#10dffd] opacity-0 group-hover:opacity-100 transition-opacity">
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
