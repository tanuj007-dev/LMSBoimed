"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BookOpen, Users, Star, Search } from "lucide-react";

// Import fallback images
import course1 from "../components/assets/1a63f85c958481f88ea3a89bc4a5cbd3c62eef29.png";
import course2 from "../components/assets/614e2285b2709586bcaaeb1e0cd9a6121a2bdbd0 (1).png";
import course3 from "../components/assets/47d0f68276e03ec9c34a549997f05f626b69de92.png";
import badgeIcon from "../components/assets/d5646a1c-88dc-42d0-8241-cbf9a8cb6082.png";
import heroBackground from "../components/assets/medical_teaching_hero_1769843544953.png";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Course categories with IDs
const categories = [
  { id: null, name: "All Courses", color: "#0088ff" },
  { id: 1, name: "Clinical Skills", color: "#e11d48" },
  { id: 2, name: "Research & Biopharma", color: "#0088ff" },
  { id: 3, name: "A-Level Subjects", color: "#8b5cf6" },
  { id: 4, name: "Professional Development", color: "#f59e0b" },
];

const CourseCard = ({ course, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="relative rounded-4xl p-[2px] bg-linear-to-br from-[#1d4ed8]/55 via-[#60a5fa]/45 to-[#bfdbfe]/35 shadow-[0_10px_30px_rgba(0,136,255,0.05)] hover:shadow-[0_15px_40px_rgba(0,136,255,0.1)] transition-all duration-500 group h-full"
  >
    <div className="bg-linear-to-br from-white via-[#f8fbff] to-[#eef6ff] rounded-[calc(2.5rem-1px)] p-4 flex flex-col h-full">
      {/* Course Image */}
      <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden mb-5">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          unoptimized={typeof course.image === 'string'}
        />
        {course.is_featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-yellow-500 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col grow px-1">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-[#f4faff] text-[#0088ff] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {course.code}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-[11px] font-medium">
              {course.oldPrice}
            </span>
            <span className="text-[#f43f5e] font-extrabold text-base">
              {course.newPrice}
            </span>
          </div>
        </div>

        <h3 className="text-[17px] md:text-[19px] font-bold text-[#1a2b4b] mb-4 leading-tight font-poppins line-clamp-2">
          {course.title}
        </h3>

        {/* Course Meta */}
        <div className="flex items-center gap-3 text-gray-500 text-[10px] md:text-[11px] mb-6 font-medium">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{course.duration}</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{course.lessons}</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{course.students}</span>
          </div>
        </div>

        {/* Rating */}
        {course.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(course.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {course.rating} ({course.reviews || 0} reviews)
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto flex items-center gap-3">
          <Link 
            href="https://academy-lms-exam.serverfacts.com/lms/Academy-LMS/home/courses"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#0088ff] text-white py-2.5 rounded-full text-xs font-bold shadow-[0_8px_15px_rgba(0,136,255,0.25)] hover:bg-[#0077ee] transition-all hover:-translate-y-0.5 active:translate-y-0 text-center"
          >
            Enroll Now
          </Link>
          <button className="flex-1 border border-[#0088ff] text-[#0088ff] py-2.5 rounded-full text-xs font-bold hover:bg-blue-50 transition-all text-center">
            View Details
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fallbackImages = [course1, course2, course3];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        // Determine which API endpoint to use
        const url = selectedCategory
          ? `http://localhost:5000/api/v1/courses/category/${selectedCategory}`
          : 'http://localhost:5000/api/v1/courses';

        console.log('Fetching courses from:', url);

        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.status}`);
        }

        const data = await response.json();
        console.log('Courses API Response:', data);

        // Ensure we have an array to work with
        let coursesArray = [];
        if (Array.isArray(data)) {
          coursesArray = data;
        } else if (data && Array.isArray(data.courses)) {
          coursesArray = data.courses;
        } else if (data && Array.isArray(data.data)) {
          coursesArray = data.data;
        } else {
          throw new Error('Invalid API response format - expected an array of courses');
        }

        // Map API data to component format
        const mappedCourses = coursesArray.map((course, index) => ({
          id: course.id || course._id || index,
          title: course.title || course.name || 'Untitled Course',
          code: course.code || course.courseCode || 'N/A',
          oldPrice: course.oldPrice || course.originalPrice || 'CA$150',
          newPrice: course.newPrice || course.price || 'CA$99.99',
          duration: course.duration || '90 Days',
          lessons: course.lessons || course.totalLessons || '20 lessons',
          students: course.students || course.enrolledStudents || 'All Participant',
          image: course.image || course.thumbnail || fallbackImages[index % fallbackImages.length],
          category: course.category || course.categoryName || 'General',
          categoryId: course.categoryId || course.category_id,
          rating: course.rating || 4.5,
          reviews: course.reviews || course.reviewCount || 0,
          is_featured: course.is_featured || course.isFeatured || false,
        }));

        setCourses(mappedCourses);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedCategory]);

  // Filter courses based on search query
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory) || categories[0];

  return (
    <main className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative text-white py-12 md:py-24 overflow-hidden bg-slate-900">
        <Image
          src={heroBackground}
          alt="Medical Teaching"
          fill
          className="object-cover opacity-85 brightness-[0.9] contrast-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/30 via-blue-950/15 to-slate-900/50"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative w-6 h-6">
                <Image src={badgeIcon} alt="Badge" fill className="object-contain" />
              </div>
              <span className="font-poppins text-blue-200 font-extrabold tracking-[0.3em] text-[10px] md:text-xs uppercase">
                Explore Our Courses
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-black mb-6 leading-[1.1] tracking-tight text-white drop-shadow-2xl">
              Transform Your Career with <br className="hidden md:block" />
              <span className="text-white block mt-2">Expert-Led Courses</span>
            </h1>
            <p className="font-poppins text-lg md:text-xl font-light text-blue-50/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Master clinical skills, research methodologies, and professional development with our comprehensive course catalog
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Bar */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 py-4">
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              {categories.map((category) => (
                <motion.button
                  key={category.id || 'all'}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'text-white shadow-lg'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category.id ? category.color : undefined,
                  }}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>

            {/* Search Bar in Category Bar */}
           
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              {selectedCategoryData.name}
            </h2>
            <p className="text-slate-600">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} available
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0088ff]"></div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-10">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
                <p className="text-red-600 font-semibold mb-2">Failed to load courses</p>
                <p className="text-gray-600 text-sm">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-[#0088ff] text-white rounded-full text-sm font-semibold hover:bg-[#0077ee] transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* No Results State */}
          {!loading && !error && filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-4">
                No courses found {searchQuery && `matching "${searchQuery}"`}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[#0088ff] font-semibold hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Courses Grid */}
          {!loading && !error && filteredCourses.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              >
                {filteredCourses.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </main>
  );
}
