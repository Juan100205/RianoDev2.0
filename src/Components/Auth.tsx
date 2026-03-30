import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'

const PORTAL_DOMAIN = 'portal.rianodevz.com'

function toEmail(input: string): string {
  return input.includes('@') ? input : `${input}@${PORTAL_DOMAIN}`
}

const loginStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const loginItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const email = toEmail(username.trim())

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
          console.error('[Supabase Auth Error - SignIn]: ', error);
          throw error
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } }
        })
        if (error) {
          console.error('[Supabase Auth Error - SignUp]: ', error);
          throw error
        }
        setMessage({ type: 'success', text: '¡Registro exitoso! Ya puedes ingresar con tu usuario y contraseña.' })
      }
    } catch (error: any) {
      console.error('[Auth Catch Block]:', error)
      setMessage({ type: 'error', text: error.message || 'Ocurrió un error inesperado al intentar acceder.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="w-full max-w-md mx-auto px-6"
      variants={loginStagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={loginItem} className="flex flex-col items-center mb-10">
        <motion.div
          className="w-14 bg-[#10dffd]/10 text-[#10dffd] rounded-full outline-2 outline-[#10dffd] p-3 mb-6 flex items-center justify-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        >
          <LockClosedIcon className="w-6 h-6" />
        </motion.div>
        <h1 className="md:text-3xl text-2xl font-light text-white text-center mb-2">
          {isLogin ? 'Portal de Clientes' : 'Crea tu acceso exclusivo'}
        </h1>
        <p className="text-gray-400 text-sm text-center">
          {isLogin ? 'Acceso exclusivo para clientes activos de RIANODEVZ.' : 'Regístrate para comenzar a gestionar tus servicios de RIANODEVZ.'}
        </p>
      </motion.div>

      <motion.form
        variants={loginItem}
        onSubmit={handleAuth}
        className="border border-[#10dffd]/20 rounded-2xl p-8 bg-black flex flex-col gap-5 relative overflow-hidden"
      >
        <AnimatePresence mode="popLayout">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0, scaleY: 0.8 }}
              animate={{ opacity: 1, height: 'auto', scaleY: 1 }}
              exit={{ opacity: 0, height: 0, scaleY: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex flex-col gap-2 origin-top"
            >
              <label className="text-xs text-gray-400 font-light ml-1">
                Nombre completo
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10dffd]/60" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-transparent border border-[#10dffd]/20 rounded-xl text-white text-sm outline-none focus:border-[#10dffd] transition-colors duration-200 placeholder-neutral-600"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400 font-light ml-1">
            Usuario
          </label>
          <div className="relative">
            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10dffd]/60" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full pl-11 pr-4 py-3 bg-transparent border border-[#10dffd]/20 rounded-xl text-white text-sm outline-none focus:border-[#10dffd] transition-colors duration-200 placeholder-neutral-600"
              placeholder="tu usuario"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400 font-light ml-1">
            Contraseña
          </label>
          <div className="relative">
            <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10dffd]/60" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3 bg-transparent border border-[#10dffd]/20 rounded-xl text-white text-sm outline-none focus:border-[#10dffd] transition-colors duration-200 placeholder-neutral-600"
              placeholder="••••••••"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          className="bg-[#10dffd] text-black font-medium px-6 py-3.5 rounded-xl hover:bg-[#10dffd]/90 transition-colors mt-2 leading-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-[0_4px_14px_0_rgba(16,223,253,0.39)] hover:shadow-[0_6px_20px_rgba(16,223,253,0.23)] hover:-translate-y-0.5"
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'Cargando...' : isLogin ? 'Ingresar a mi portal' : 'Crear mi cuenta'}
        </motion.button>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs text-center font-light px-2 ${message.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}
          >
            {message.text}
          </motion.div>
        )}
      </motion.form>

      <motion.div variants={loginItem} className="mt-8 text-center text-xs font-light text-gray-500">
        {isLogin ? (
          <p>
            ¿Aún no tienes acceso?{' '}
            <button
              onClick={() => { setIsLogin(false); setMessage(null); }}
              className="text-[#10dffd] hover:text-white transition-colors cursor-pointer ml-1 underline underline-offset-2"
            >
              Regístrate aquí
            </button>
          </p>
        ) : (
          <p>
            ¿Ya eres cliente?{' '}
            <button
              onClick={() => { setIsLogin(true); setMessage(null); }}
              className="text-[#10dffd] hover:text-white transition-colors cursor-pointer ml-1 underline underline-offset-2"
            >
              Ingresa a tu portal
            </button>
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}
