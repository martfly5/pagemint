/* ============================================================
   PageMint — book & category data
   Edit this file to add, remove, or change ebooks.
   Each book needs: id, title, author, category, price, mrp,
   rating, pages, blurb, format, isNew, isBestseller
   ============================================================ */

const CATEGORIES = [
  {
    slug: "study",
    name: "Study",
    color: "#3A5A78",
    tagline: "Notes, guides & exam-ready reading",
  },
  {
    slug: "earning",
    name: "Earning",
    color: "#B8862E",
    tagline: "Skills and playbooks to build income",
  },
  {
    slug: "story",
    name: "Story",
    color: "#7A4E6B",
    tagline: "Fiction to lose an evening in",
  },
  {
    slug: "comics",
    name: "Comics",
    color: "#C4482E",
    tagline: "Panels, pages & pulp",
  },
];

const BOOKS = [
  { id: "st-01", title: "The Focused Semester", author: "Aditi Rao", category: "study", price: 149, mrp: 249, rating: 4.7, pages: 132, format: "PDF + EPUB", blurb: "A term-by-term system for planning revision, tracking topics, and walking into exams without last-minute panic.", isNew: true, isBestseller: true },
  { id: "st-02", title: "Mathematics, Untangled", author: "Rohan Mehta", category: "study", price: 199, mrp: 299, rating: 4.6, pages: 210, format: "PDF", blurb: "Core concepts from algebra to calculus rebuilt from first principles, with worked examples over shortcuts.", isNew: false, isBestseller: true },
  { id: "st-03", title: "Notes That Actually Stick", author: "Kavya Iyer", category: "study", price: 99, mrp: 149, rating: 4.5, pages: 88, format: "EPUB", blurb: "Cornell notes, spaced repetition and active recall, explained simply enough to start using today.", isNew: false, isBestseller: false },
  { id: "st-04", title: "The Board Exam Companion", author: "Sanjay Verma", category: "study", price: 179, mrp: 229, rating: 4.4, pages: 164, format: "PDF", blurb: "Chapter-wise summaries and previous-year question patterns for the last sixty days before exams.", isNew: true, isBestseller: false },
  { id: "st-05", title: "English for Every Interview", author: "Meera Nair", category: "study", price: 129, mrp: 179, rating: 4.3, pages: 96, format: "PDF + EPUB", blurb: "Grammar, vocabulary and mock conversations built around real interview questions.", isNew: false, isBestseller: false },

  { id: "ea-01", title: "Freelance, From Zero", author: "Arjun Kapoor", category: "earning", price: 249, mrp: 399, rating: 4.8, pages: 176, format: "PDF + EPUB", blurb: "Finding your first client, pricing your time, and turning one gig into a steady freelance income.", isNew: true, isBestseller: true },
  { id: "ea-02", title: "The Side Income Playbook", author: "Priya Sharma", category: "earning", price: 199, mrp: 299, rating: 4.6, pages: 148, format: "PDF", blurb: "Twelve low-investment income ideas, tested and ranked by effort versus payout.", isNew: false, isBestseller: true },
  { id: "ea-03", title: "Selling Online, Simply", author: "Vikram Desai", category: "earning", price: 229, mrp: 329, rating: 4.5, pages: 158, format: "EPUB", blurb: "A plain-language guide to listing, pricing and shipping your first product online.", isNew: false, isBestseller: false },
  { id: "ea-04", title: "Money Basics for Beginners", author: "Ananya Gupta", category: "earning", price: 149, mrp: 199, rating: 4.4, pages: 112, format: "PDF + EPUB", blurb: "Budgeting, saving and simple investing, written for someone earning their first salary.", isNew: true, isBestseller: false },
  { id: "ea-05", title: "Build a Personal Brand", author: "Rahul Singh", category: "earning", price: 179, mrp: 249, rating: 4.3, pages: 120, format: "PDF", blurb: "A practical framework for showing your work online and turning attention into opportunity.", isNew: false, isBestseller: false },

  { id: "sy-01", title: "Monsoon Over Kanpur", author: "Neha Chatterjee", category: "story", price: 179, mrp: 249, rating: 4.7, pages: 224, format: "EPUB", blurb: "A slow-burn family drama set across three monsoons in a house that keeps its secrets.", isNew: true, isBestseller: true },
  { id: "sy-02", title: "The Last Train to Almora", author: "Imran Qureshi", category: "story", price: 199, mrp: 279, rating: 4.6, pages: 256, format: "PDF + EPUB", blurb: "Two strangers, one overnight train, and a conversation that unravels both their lives.", isNew: false, isBestseller: true },
  { id: "sy-03", title: "Letters Nobody Sent", author: "Divya Menon", category: "story", price: 149, mrp: 199, rating: 4.5, pages: 168, format: "EPUB", blurb: "A collection of short stories told entirely through letters that were never mailed.", isNew: false, isBestseller: false },
  { id: "sy-04", title: "The Cartographer's Daughter", author: "Farhan Ali", category: "story", price: 219, mrp: 299, rating: 4.4, pages: 288, format: "PDF", blurb: "A historical mystery about a mapmaker's daughter chasing a border that keeps moving.", isNew: true, isBestseller: false },

  { id: "co-01", title: "Rooftop Runners: Issue 1", author: "Studio Kalam", category: "comics", price: 99, mrp: 149, rating: 4.6, pages: 40, format: "PDF", blurb: "Three kids, one rooftop city, and a chase that opens a series about finding home.", isNew: true, isBestseller: true },
  { id: "co-02", title: "Chai & Other Catastrophes", author: "Studio Kalam", category: "comics", price: 89, mrp: 129, rating: 4.5, pages: 36, format: "PDF", blurb: "A gag-a-page comic about a chai stall that has seen everything and judges accordingly.", isNew: false, isBestseller: true },
  { id: "co-03", title: "The Iron Peacock", author: "Devansh Rao", category: "comics", price: 129, mrp: 179, rating: 4.4, pages: 52, format: "PDF + EPUB", blurb: "A steampunk adventure through a Lucknow that never was, and the machine that guards it.", isNew: false, isBestseller: false },
  { id: "co-04", title: "Small Gods of the Colony", author: "Studio Kalam", category: "comics", price: 109, mrp: 159, rating: 4.7, pages: 44, format: "PDF", blurb: "The minor deities of an apartment colony argue over whose job it was to stop the leak.", isNew: true, isBestseller: false },
];

function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}
