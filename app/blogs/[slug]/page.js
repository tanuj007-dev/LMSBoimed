"use client";

import { useState, useEffect } from "react";
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
import about1 from "../../components/assets/about1.png";
import about2 from "../../components/assets/about2.png";
import about3 from "../../components/assets/about3.png";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback images
  const fallbackImages = [about1, about2, about3];

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all blogs
        const response = await fetch('http://localhost:5000/api/v1/blogs', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch blog: ${response.status}`);
        }

        const data = await response.json();
        console.log('Blog Detail API Response:', data);

        // Get blogs array
        let blogsArray = [];
        if (Array.isArray(data)) {
          blogsArray = data;
        } else if (data && Array.isArray(data.blogs)) {
          blogsArray = data.blogs;
        } else if (data && Array.isArray(data.data)) {
          blogsArray = data.data;
        }

        // Map blogs to component format
        const mappedBlogs = blogsArray.map((blog, index) => {
          // Handle dynamic author info from joined User table
          const authorInfo = blog.User || blog.author || {};
          const authorName = typeof authorInfo === 'string' 
            ? authorInfo 
            : (authorInfo.first_name ? `${authorInfo.first_name} ${authorInfo.last_name || ''}` : 'BioMed Canada');

          return {
            slug: blog.slug || blog._id || blog.id || `blog-${index}`,
            title: blog.title || 'Untitled Post',
            excerpt: blog.excerpt || blog.short_description || blog.description || blog.summary || '',
            content: blog.content || blog.body || '',
            category: blog.category || blog.category_name || 'General',
            date: blog.date || blog.publishedDate || blog.createdAt || new Date().toLocaleDateString(),
            readTime: blog.readTime || blog.readingTime || '5 min read',
            image: blog.banner_url || blog.thumbnail_url || blog.image || blog.thumbnail || blog.coverImage || fallbackImages[index % fallbackImages.length],
            author: authorName,
            authorImage: authorInfo.profile_image_url || null,
            authorRole: authorInfo.title || blog.authorRole || blog.authorTitle || 'Author'
          };
        });

        // Find current post
        const currentPost = mappedBlogs.find((p) => p.slug === slug);
        
        if (!currentPost) {
          setError('Post not found');
          setPost(null);
        } else {
          setPost(currentPost);
          // Get related posts (excluding current)
          const related = mappedBlogs.filter(p => p.slug !== slug).slice(0, 6);
          setRelatedPosts(related);
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogData();
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0088ff] mb-4"></div>
        <p className="text-slate-600">Loading article...</p>
      </div>
    );
  }

  // Error or not found state
  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          {error ? 'Error Loading Article' : 'Post Not Found'}
        </h1>
        <p className="text-slate-600 mb-8 text-center max-w-md">
          {error || "The article you're looking for doesn't exist or has been moved."}
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
          <Link 
            href="/blogs"
            className="bg-slate-200 text-slate-700 px-8 py-3 rounded-full font-bold hover:bg-slate-300 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Article Header - Simplified to just the banner image */}
      <header className="relative w-full h-[40vh] min-h-[300px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          unoptimized={typeof post.image === 'string'}
          priority
        />
        {/* Breadcrumb - Overlaid on image bottom left */}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent pt-12 pb-6">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <Link 
              href="/blogs"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-bold"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Insights
            </Link>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
            {/* Main Content Area */}
            <div className="space-y-8">
              {/* Heading and Meta Information moved here */}
              <div className="space-y-6 pb-8 border-b border-slate-100">
                <div className="flex flex-wrap gap-3">
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                    {post.category}
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-slate-200">
                    {post.readTime}
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                  {post.title}
                </h1>

                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md overflow-hidden border-2 border-white">
                      {post.authorImage ? (
                        <img src={post.authorImage} alt={post.author} className="h-full w-full object-cover" />
                      ) : (
                        <span>{post.author.split(' ').map(n => n[0]).join('')}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold">{post.author}</p>
                      <p className="text-slate-500 text-xs font-medium">{post.authorRole}</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm font-medium">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                </div>
              </div>

              {/* Article Text Content */}
              <article className="prose prose-slate prose-lg max-w-none">
                <div 
                  className="text-slate-700 leading-relaxed quill-content"
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
            </div>

            {/* Sidebar */}
            <aside className="space-y-12">
              {/* About Author */}
             

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
                  Related Reading
                  <Link href="/blogs" className="text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:underline">
                    View All
                  </Link>
                </h3>
                <div className="space-y-6">
                  {relatedPosts.slice(0, 3).map((rel) => (
                    <Link key={rel.slug} href={`/blogs/${rel.slug}`} className="group block">
                      <div className="flex gap-4 items-start">
                        <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
                          <Image
                            src={rel.image}
                            alt={rel.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                            unoptimized={typeof rel.image === 'string'}
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
              )}
              
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
      {relatedPosts.length > 0 && (
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Recommended for you</h2>
            <Link href="/blogs" className="flex items-center gap-2 text-blue-600 font-bold group">
              View all insights <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.slice(0, 3).map((p) => (
              <Link key={`${p.slug}-recommended`} href={`/blogs/${p.slug}`}>
                <article className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized={typeof p.image === 'string'}
                    />
                  </div>
                  <div className="p-6 flex flex-col grow space-y-3">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{p.category}</span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50">
                       <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-blue-600 overflow-hidden border border-slate-200">
                          {p.authorImage ? (
                            <img src={p.authorImage} alt={p.author} className="h-full w-full object-cover" />
                          ) : (
                            p.author.split(' ').map(n => n[0]).join('')
                          )}
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
      )}
    </main>
  );
}
