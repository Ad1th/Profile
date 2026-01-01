"use client";

import { motion } from "framer-motion";
import { AnimatedGradientText } from "./text-effects";
import { ExpandingLine } from "./micro-interactions";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <motion.div
      className={`flex flex-col ${alignClasses[align]} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {badge && (
        <motion.span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          {badge}
        </motion.span>
      )}

      <AnimatedGradientText className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
        {title}
      </AnimatedGradientText>

      {subtitle && (
        <motion.p
          className="mt-4 text-muted-foreground max-w-2xl text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}

      <div className="mt-6 w-24">
        <ExpandingLine />
      </div>
    </motion.div>
  );
}

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <motion.div
      className="relative p-6 rounded-xl bg-card/50 border border-purple-500/20 backdrop-blur-sm"
      whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.4)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {icon && (
        <div className="absolute top-4 right-4 text-purple-500/30">{icon}</div>
      )}
      <motion.div
        className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {value}
      </motion.div>
      <div className="mt-2 text-muted-foreground text-sm">{label}</div>
    </motion.div>
  );
}

interface TimelineItemProps {
  year: string;
  title: string;
  subtitle: string;
  description?: string;
  isLeft?: boolean;
}

export function EnhancedTimelineItem({
  year,
  title,
  subtitle,
  description,
  isLeft = false,
}: TimelineItemProps) {
  return (
    <motion.div
      className={`flex items-center gap-8 ${isLeft ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={`flex-1 ${isLeft ? "text-left" : "text-right"}`}>
        <span className="text-sm text-purple-400 font-mono">{year}</span>
        <h4 className="text-xl font-bold mt-1">{title}</h4>
        <p className="text-muted-foreground">{subtitle}</p>
        {description && (
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        )}
      </div>

      <div className="relative">
        <motion.div
          className="w-4 h-4 rounded-full bg-purple-500"
          whileInView={{
            boxShadow: [
              "0 0 0 0 rgba(139, 92, 246, 0.4)",
              "0 0 0 10px rgba(139, 92, 246, 0)",
            ],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <div className="absolute top-4 left-1/2 w-px h-20 bg-gradient-to-b from-purple-500 to-transparent -translate-x-1/2" />
      </div>

      <div className="flex-1" />
    </motion.div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="group relative p-6 rounded-xl bg-card/50 border border-purple-500/20 backdrop-blur-sm overflow-hidden"
      whileHover={{ y: -5, borderColor: "rgba(139, 92, 246, 0.4)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <motion.div
          className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4"
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          {icon}
        </motion.div>

        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.div>
  );
}
