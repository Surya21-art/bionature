import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
export const PageTransition = ({ children }) => {
  const [location] = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const variants = {
    fadeIn: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
    fadeOut: {
      opacity: 0,
      scale: 0.99,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };
  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setDisplayLocation(location);
      }}
    >
      <motion.div
        key={displayLocation}
        variants={variants}
        initial="fadeOut"
        animate="fadeIn"
        exit="fadeOut"
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
// Scroll-based animation hook
export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const previousScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(
        currentScrollY > previousScrollY.current ? "down" : "up",
      );
      setScrollY(currentScrollY);
      previousScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return { scrollY, scrollDirection };
};
export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 50,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);
  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);
  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0, rotateX: 5 };
      case "down":
        return { y: -distance, opacity: 0, rotateX: -5 };
      case "left":
        return { x: distance, opacity: 0, rotateY: 5 };
      case "right":
        return { x: -distance, opacity: 0, rotateY: -5 };
      default:
        return { y: distance, opacity: 0 };
    }
  };
  const getAnimateTransform = () => {
    return {
      x: 0,
      y: 0,
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        delay: delay,
      },
    };
  };
  return (
    <motion.div
      ref={setRef}
      className={className}
      initial={getInitialTransform()}
      animate={isVisible ? getAnimateTransform() : getInitialTransform()}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};
export const Parallax = ({ children, speed = 0.5, className = "" }) => {
  const { scrollY } = useScrollAnimation();
  return (
    <motion.div
      className={className}
      style={{
        transform: `translateY(${scrollY * speed}px) translateZ(0)`,
      }}
    >
      {children}
    </motion.div>
  );
};
export const FloatingElement = ({
  children,
  intensity = 10,
  speed = 2,
  className = "",
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -intensity, 0],
        x: [0, intensity / 2, 0],
        rotateZ: [0, 1, 0],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};
