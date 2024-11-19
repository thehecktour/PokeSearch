import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="h-8 w-8 rounded-full border-4 border-zinc-700 border-t-zinc-200"
      />
    </div>
  );
}
