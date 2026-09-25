import React from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
const AnimatedLoader = ({ isLoading, onComplete }) => {
  const fadeOut = useSpring({
    opacity: isLoading ? 1 : 0,
    transform: isLoading ? "scale(1)" : "scale(0.8)",
    config: { tension: 200, friction: 25 },
    onRest: () => {
      if (!isLoading && onComplete) {
        onComplete();
      }
    },
  });
  if (!isLoading) {
    return null;
  }
  return (
    <animated.div
      style={fadeOut}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50"
    >
      {/* Background animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-200 rounded-full opacity-30"
            animate={{
              x: [
                Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 800),
                Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 800),
              ],
              y: [
                Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 600),
                Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 600),
              ],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      {/* Main logo container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with 3D effect */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            rotate: [-180, 0, 0],
            opacity: [0, 1, 1],
          }}
          transition={{
            duration: 2,
            times: [0, 0.7, 1],
          }}
        >
          {/* 3D Shadow effect */}
          <motion.div
            className="absolute -bottom-2 -right-2 w-32 h-32 bg-green-300 rounded-full opacity-20 blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Logo circle using actual SVG */}
          <motion.div
            className="w-32 h-32 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden bg-white"
            animate={{
              boxShadow: [
                "0 10px 30px rgba(0, 166, 81, 0.3)",
                "0 15px 40px rgba(0, 166, 81, 0.5)",
                "0 10px 30px rgba(0, 166, 81, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <img
              src="/bionature-logo.svg"
              alt="BioNature Logo"
              className="w-full h-full object-contain p-2"
            />
          </motion.div>

          {/* Animated leaves */}
          <motion.div
            className="absolute -top-2 -right-2 text-green-300"
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: [50, -10, 0],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              times: [0, 0.7, 1],
            }}
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <path d="M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z" />
            </motion.svg>
          </motion.div>

          <motion.div
            className="absolute -bottom-2 -left-2 text-green-400"
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: [50, -10, 0],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 1.5,
              delay: 0.8,
              times: [0, 0.7, 1],
            }}
          >
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              <path d="M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z" />
            </motion.svg>
          </motion.div>
        </motion.div>

        {/* Company name with typewriter effect */}
        <motion.div
          className="text-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 1.2,
          }}
        >
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-2"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            BioNature
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            Make crop easier
          </motion.p>
        </motion.div>

        {/* Loading progress bar */}
        <motion.div
          className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: "100%",
            }}
            transition={{
              duration: 3,
            }}
          />
        </motion.div>

        {/* Loading dots */}
        <motion.div
          className="flex space-x-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </animated.div>
  );
};
export default AnimatedLoader;
