import React from "react";
import { Link } from "wouter";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Sprout,
  ArrowRight,
  Phone,
  Sparkles,
  Leaf,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
export const Hero3D = ({ onEnquire }) => {
  const { scrollY } = useScroll();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, {
    stiffness: 180,
    damping: 24,
    mass: 0.45,
  });
  const smoothPointerY = useSpring(pointerY, {
    stiffness: 180,
    damping: 24,
    mass: 0.45,
  });
  const headlineRotateX = useTransform(smoothPointerY, (value) => value * 0.02);
  const headlineRotateY = useTransform(smoothPointerX, (value) => value * 0.02);
  const floatingRotateX = useTransform(smoothPointerY, (value) => value * 0.1);
  const floatingRotateY = useTransform(smoothPointerX, (value) => value * 0.1);
  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -100]);
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left - rect.width / 2) / 20);
    pointerY.set((e.clientY - rect.top - rect.height / 2) / 20);
  };
  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <section
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ perspective: "1200px" }}
    >
      {/* Animated Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        {/* Base Image */}
        <motion.img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&auto=format&fit=crop&q=85"
          alt="Healthy lush green agricultural field"
          className="w-full h-full object-cover object-center scale-110"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 0.6 }}
          transition={{ duration: 2 }}
        />

        {/* Static overlay keeps the background cinematic without repainting every frame. */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(6,78,59,0.9)_0%,rgba(5,46,22,0.8)_50%,rgba(15,23,42,0.9)_100%)]" />

        {/* Animated Particles */}
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-300/30 rounded-full"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 61 + 13) % 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 5),
              repeat: Infinity,
              delay: (i % 7) * 0.25,
            }}
          />
        ))}

        {/* Floating Geometric Shapes */}
        <motion.div
          style={{
            x: smoothPointerX,
            y: smoothPointerY,
            rotateX: floatingRotateX,
            rotateY: floatingRotateY,
          }}
          className="absolute inset-0"
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div
                className={`w-8 h-8 ${i % 2 === 0 ? "bg-emerald-400/10" : "bg-green-300/10"} rounded-full border border-emerald-300/20`}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Main Hero Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ y: contentY }}
      >
        {/* Badge */}
        <motion.div
          initial={itemVariants.hidden}
          animate={itemVariants.visible}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-semibold px-6 py-2 rounded-full backdrop-blur-md mb-8"
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(16, 185, 129, 0.3)",
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
          </motion.div>
          <span>Next-Generation Bio-Agricultural Inputs</span>
        </motion.div>

        {/* Main Headline with 3D Text Effect */}
        <motion.h1
          initial={itemVariants.hidden}
          animate={itemVariants.visible}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-serif max-w-5xl mx-auto leading-tight mb-8"
          style={{
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            rotateX: headlineRotateX,
            rotateY: headlineRotateY,
          }}
        >
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-gradient-to-r from-white via-emerald-200 to-white bg-300% bg-clip-text text-transparent"
          >
            Sustainable Agricultural
          </motion.span>
          <br />
          <motion.span
            className="text-emerald-300"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
            }}
          >
            Solutions
          </motion.span>
          <span className="text-white"> for Better </span>
          <motion.span
            className="text-green-400"
            animate={{
              color: ["#4ade80", "#22c55e", "#16a34a", "#4ade80"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Crop Growth
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={itemVariants.hidden}
          animate={itemVariants.visible}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg sm:text-xl text-emerald-100/90 max-w-4xl mx-auto leading-relaxed font-normal mb-12"
        >
          BioNature develops high-potency bio-fertilizers, botanical crop
          protection, micronutrient cocktails, and organic soil enrichment
          formulations that help farmers grow healthier crops and achieve higher
          yields sustainably.
        </motion.p>

        {/* 3D Action Buttons */}
        <motion.div
          initial={itemVariants.hidden}
          animate={itemVariants.visible}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/products">
            <motion.div
              whileHover={{
                scale: 1.05,
                rotateX: 5,
                boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-6 text-base rounded-xl shadow-2xl shadow-emerald-600/30 backdrop-blur-sm"
              >
                <span>Explore Products</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.div>
              </Button>
            </motion.div>
          </Link>

          <motion.div
            whileHover={{
              scale: 1.05,
              rotateX: -5,
              backgroundColor: "rgba(255, 255, 255, 0.25)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <Button
              size="lg"
              variant="outline"
              onClick={() => onEnquire()}
              className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white border-white/30 font-semibold px-8 py-6 text-base rounded-xl backdrop-blur-md shadow-xl"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Phone className="w-5 h-5 mr-2 text-emerald-400" />
              </motion.div>
              <span>Talk to an Agriculture Expert</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* 3D Statistics Cards */}
        <motion.div
          initial={itemVariants.hidden}
          animate={itemVariants.visible}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {[
            {
              value: COMPANY_INFO.stats.farmersSupported,
              label: "Farmers Supported",
              icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
            },
            {
              value: `${COMPANY_INFO.stats.hectaresCovered}+`,
              label: "Hectares Treated",
              icon: <Leaf className="w-5 h-5 text-green-400" />,
            },
            {
              value: "100%",
              label: "Residue-Free",
              icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
            },
            {
              value: COMPANY_INFO.stats.satisfactionRate,
              label: "Satisfaction Rate",
              icon: <Sparkles className="w-5 h-5 text-amber-400" />,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="relative"
              style={{
                transformStyle: "preserve-3d",
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50,
              }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3 + index * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Card glow */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-2xl blur-lg opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Card content */}
              <div className="relative bg-emerald-950/60 border border-emerald-800/40 p-4 rounded-xl backdrop-blur-md">
                <div className="flex items-center gap-2 mb-2">
                  {stat.icon}
                  <div className="text-2xl font-black text-white font-serif">
                    {stat.value}
                  </div>
                </div>
                <div className="text-xs text-emerald-300 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Call-to-Action Elements */}
        <div className="absolute top-1/2 left-4 hidden lg:block">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4"
          >
            <Sprout className="w-8 h-8 text-emerald-400" />
          </motion.div>
        </div>

        <div className="absolute top-1/3 right-8 hidden lg:block">
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3"
          >
            <Leaf className="w-6 h-6 text-green-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-emerald-400 rounded-full mt-2"
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};
