import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import Header from "../Components/Header";
import { blogPosts } from "../data/blog";
import ReactMarkdown from "react-markdown";

interface Props {
  languageState: boolean;
  setLanguageState: (val: boolean) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export default function BlogPost({ languageState, setLanguageState, scrollRef }: Props) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const l = languageState;
  
  const post = blogPosts.find((p) => p.slug === slug);

  // If we scroll the ref to 0 on mount, it simulates a fresh page load
  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [scrollRef, slug]);

  if (!post || post.status !== "published") {
    return (
      <>
        <Header scrollRef={scrollRef} languageState={languageState} setLanguageState={setLanguageState} />
        <div ref={scrollRef} className="min-h-screen bg-black flex flex-col items-center justify-center page_scroll">
          <h1 className="text-white text-3xl font-light mb-4 text-center">
            {l ? "Article not found" : "Artículo no encontrado"}
          </h1>
          <button
            onClick={() => navigate("/blog")}
            className="text-[#10dffd] border border-[#10dffd]/50 px-6 py-2 rounded-xl hover:bg-[#10dffd]/10 transition-colors"
          >
            {l ? "Back to blog" : "Volver al blog"}
          </button>
        </div>
      </>
    );
  }

  const title = l ? post.title.en : post.title.es;
  const content = l ? post.content.en : post.content.es;

  return (
    <>
      <Header scrollRef={scrollRef} languageState={languageState} setLanguageState={setLanguageState} />
      <div ref={scrollRef} className="min-h-screen bg-black overflow-y-auto page_scroll scrollbar_exp pb-32">
        <div className="max-w-3xl mx-auto px-6 pt-16">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-gray-500 hover:text-[#10dffd] transition-colors mb-10 group text-sm"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {l ? "Back to entries" : "Volver a las entradas"}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs text-[#10dffd] uppercase tracking-wider bg-[#10dffd]/10 border border-[#10dffd]/38 px-3 py-1 rounded-md">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">{post.date}</span>
              {post.reads > 0 && (
                <span className="text-gray-500 text-sm flex items-center gap-1.5 ml-auto">
                  <EyeIcon className="w-4 h-4 text-gray-400" />
                  {post.reads} {l ? "reads" : "lecturas"}
                </span>
              )}
            </div>

            <h1 className="text-white text-4xl md:text-5xl font-light leading-tight mb-12">
              {title}
            </h1>

            <div className="prose prose-invert prose-lg max-w-none text-gray-300 font-light prose-headings:font-light prose-headings:text-white prose-a:text-[#10dffd] hover:prose-a:text-white prose-strong:text-white prose-strong:font-medium prose-p:leading-relaxed">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
