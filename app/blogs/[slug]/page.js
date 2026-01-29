"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  User,
  Facebook,
  Twitter,
  Linkedin,
  ChevronRight
} from "lucide-react";
import { allPosts } from "../blogData";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1>
        <p className="text-slate-600 mb-8 text-center max-w-md">
          The article you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/blogs"
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  // Get related posts (excluding current)
  const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <main className="bg-white min-h-screen">
      {/* Article Header */}
      <header className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover brightness-[0.5]"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-4xl mx-auto w-full px-4 md:px-8 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Link 
                href="/blogs"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium mb-4"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Insights
              </Link>
              
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                  {post.category}
                </span>
                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white font-bold">{post.author}</p>
                    <p className="text-white/60 text-xs">{post.authorRole}</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-white/60 text-sm">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
            {/* Main Content */}
            <article className="prose prose-slate prose-lg max-w-none">
              <div 
                className="text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Share this:</span>
                  <div className="flex gap-2">
                    <button className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100">
                      <Facebook className="h-4 w-4" />
                    </button>
                    <button className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100">
                      <Twitter className="h-4 w-4" />
                    </button>
                    <button className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                  <Bookmark className="h-4 w-4" /> Save Article
                </button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-12">
              {/* About Author */}
             

              {/* Related Posts */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
                  Related Reading
                  <Link href="/blogs" className="text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:underline">
                    View All
                  </Link>
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map((rel) => (
                    <Link key={rel.slug} href={`/blogs/${rel.slug}`} className="group block">
                      <div className="flex gap-4 items-start">
                        <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
                          <Image
                            src={rel.image}
                            alt={rel.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{rel.category}</span>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                            {rel.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{rel.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-6">About the Author</h3>
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl mb-4 border-4 border-white shadow-sm">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="font-bold text-slate-900">{post.author}</h4>
                  <p className="text-blue-600 text-xs font-semibold mb-4">{post.authorRole}</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    Expert in {post.category.toLowerCase()} with over 15 years of experience in the clinical research industry.
                  </p>
                  <button className="w-full py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-white hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm">
                    View Profile
                  </button>
                </div>
              </div>
              {/* Newsletter */}
              <div className="bg-[#0088ff] rounded-3xl p-8 text-white shadow-lg shadow-blue-200">
                <h3 className="text-xl font-bold mb-4">Insights to your inbox</h3>
                <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                  Join our weekly newsletter for the latest in clinical research.
                </p>
                <form className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Work email" 
                    className="w-full bg-white/10 border text-white border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-blue-200"
                  />
                  <button className="w-full bg-white text-blue-600 py-3 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors shadow-md">
                    Subscribe
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Recommended for you banner */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Recommended for you</h2>
            <Link href="/blogs" className="flex items-center gap-2 text-blue-600 font-bold group">
              View all insights <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allPosts.slice(0, 3).map((p) => (
              <Link key={`${p.slug}-recommended`} href={`/blogs/${p.slug}`}>
                <article className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col grow space-y-3">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{p.category}</span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50">
                       <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                          {p.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs font-semibold text-slate-500">{p.author}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
