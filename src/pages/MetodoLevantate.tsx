import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Navbar from "../MetodoLevantate/src/components/Navbar";
import Hero from "../MetodoLevantate/src/components/HeroSection";
import Identificacion from "../MetodoLevantate/src/components/Identificacion";
import Solucion from "../MetodoLevantate/src/components/Solucion";
import LoQueRecibes from "../MetodoLevantate/src/components/LoQueRecibes";
import Testimonios from "../MetodoLevantate/src/components/Testimonios";
import Oferta from "../MetodoLevantate/src/components/Oferta";
import Preguntas from "../MetodoLevantate/src/components/Preguntas";
import FinalCTA from "../MetodoLevantate/src/components/FinalCTA";
import "../MetodoLevantate/src/index.css";

export default function MetodoLevantate() {
  const navigate = useNavigate();

  return (
    <div className="ml-root">
      <Navbar />

      {/* Back button — visible sobre el navbar del Método */}
      <motion.button
        onClick={() => navigate("/portal")}
        className="fixed top-3 left-4 z-[100] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm text-[#1a1a1a] text-xs font-cormorant hover:bg-black/35 transition-colors cursor-pointer"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.96 }}
      >
        <ArrowLeftIcon className="w-3 h-3" />
        Portal
      </motion.button>

      <main className="w-full flex flex-col">
        <Hero />
        <Identificacion />
        <Solucion />
        <LoQueRecibes />
        <Testimonios />
        <Oferta />
        <Preguntas />
        <FinalCTA />
      </main>
    </div>
  );
}
