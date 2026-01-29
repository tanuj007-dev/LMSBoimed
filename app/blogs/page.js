"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Search, ArrowRight } from "lucide-react";

import heroImage from "../components/assets/hero.png";
import { featuredPosts, latestPosts, allPosts } from "./blogData";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function BlogPage() {
  const heroPrimary = featuredPosts[0];
  const heroSecondary = featuredPosts.slice(1, 4);
  const stories = allPosts;

  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen pb-20">
      {/* Blog Banner */}
      <section className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt="Blog Banner"
          fill
          className="object-cover brightness-[0.6]"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-400 font-semibold tracking-wider uppercase text-sm mb-4"
          >
            Our Blog & Insights
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Insights & Innovation in <br className="hidden md:block" /> Clinical Research
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl font-light"
          >
            Stay updated with the latest breakthroughs, regulatory updates, and expert perspectives in the biotech industry.
          </motion.p>
        </div>
      </section>

      <section className="py-12 md:py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Search and Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Latest Stories
              </h2>
              <p className="text-slate-500 mt-2">Explore our most recent articles and updates</p>
            </div>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#0088ff] group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full md:w-110 rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Featured Posts Grid */}
          <motion.div
            className="grid gap-8 lg:grid-cols-[1.8fr_1fr]"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {/* Main Featured Post */}
            <Link href={`/blogs/${heroPrimary.slug}`}>
              <motion.article
                variants={fadeUp}
                className="group cursor-pointer space-y-4"
              >
                <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-3xl shadow-xl">
                  <Image
                    src={heroPrimary.image}
                    alt={heroPrimary.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg uppercase tracking-wide">
                      {heroPrimary.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {heroPrimary.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {heroPrimary.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {heroPrimary.title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
                    {heroPrimary.excerpt}
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold gap-2 pt-2">
                    Read Full Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.article>
            </Link>

            {/* Side Featured Posts */}
            <motion.div variants={fadeUp} className="flex flex-col gap-8">
              {heroSecondary.map((post) => (
                <Link key={`${post.slug}-hero-side`} href={`/blogs/${post.slug}`}>
                  <article className="group cursor-pointer flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-5 items-start">
                    <div className="relative h-32 w-full sm:w-48 lg:w-full xl:w-48 shrink-0 overflow-hidden rounded-2xl shadow-md">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest">{post.category}</span>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}

              {/* Newsletter Callout or similar could go here */}
              <div className="bg-blue-600 rounded-3xl p-8 text-white mt-auto">
                <h4 className="text-xl font-bold mb-3">Never miss an update</h4>
                <p className="text-blue-100 text-sm mb-6">Join 5,000+ researchers and stay ahead of clinical research trends.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-blue-200"
                  />
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors whitespace-nowrap">
                    Join Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-slate-200 w-full my-16" />

          {/* All Posts Grid */}
          <motion.div
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.05 }}
          >
            {stories.map((post) => (
              <Link key={`${post.slug}-grid`} href={`/blogs/${post.slug}`}>
                <motion.article
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wide">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col grow space-y-3">
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">
                      {heroPrimary.excerpt}
                    </p>
                    <div className="pt-4 mt-auto flex items-center justify-between border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-blue-600">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{post.author}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </motion.div>

          <div className="mt-16 flex flex-col items-center gap-6">
            <button
              type="button"
              className="rounded-full border-2 border-slate-200 bg-white px-10 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Load more articles
            </button>
            <p className="text-slate-400 text-xs font-medium">Showing 6 of 24 articles</p>
          </div>
        </div>
      </section>
    </main>
  );
}
