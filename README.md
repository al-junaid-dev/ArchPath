# [ArchPath AI: The Intelligent Career Architect](https://archpath.vercel.app)

![ArchPath Logo](public/logo.svg)

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?logo=vercel&style=flat-square)](https://archpath.vercel.app)
[![Next.js 15+](https://img.shields.io/badge/Next.js-15+-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![AI Powered](https://img.shields.io/badge/AI-Llama_3.1-blueviolet?logo=meta&style=flat-square)](https://groq.com/)
[![Database](https://img.shields.io/badge/Database-Supabase-green?logo=supabase&style=flat-square)](https://supabase.com/)

**ArchPath AI** is a high-performance, AI-driven career guidance platform designed to bridge the gap between academic learning and industry demands. Leveraging the speed of the **Groq LPU Engine** and the intelligence of **Llama 3.1**, ArchPath generates precision, real-time career roadmaps for students and professionals in milliseconds.

---

## 🚀 Key Features

- **Precision Roadmap Generation:** Instantly creates step-by-step career masterplans based on field of study, interests, and current academic level.
- **Context-Aware AI Mentor:** A side-by-side interactive chat interface where users can ask for specific resources, course links, and clarifications on their roadmap.
- **Emotionally Intelligent UI:** An AI avatar that dynamically responds to the user's input with specific emotional states (Analyzing, Celebrating, Empathetic).
- **Enterprise-Grade Dashboard:** A centralized "Command Center" to manage user profiles and save generated career trajectories.
- **Programmatic SEO Engine:** Built-in SEO architecture to rank for thousands of long-tail career queries automatically.

---

## 🛠️ The Tech Stack

ArchPath is built with a focus on **Speed (Core Web Vitals)** and **Scalability**:

- **Frontend:** [Next.js 15+](https://nextjs.org/) (App Router, Server Components)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **AI Infrastructure:** [Groq Cloud SDK](https://groq.com/) (Llama 3.1 70B & 8B)
- **Backend/Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security)
- **Deployment:** [Vercel Edge Network](https://vercel.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📈 SEO Strategy (Analyst Overview)

This repository is optimized to serve as the "Source of Truth" for the ArchPath entity. We utilize:

1.  **Semantic HTML5:** Strict adherence to heading hierarchies (`h1` through `h3`) for optimal crawler indexing.
2.  **Schema Readiness:** Structured data preparation for "How-to" and "Education" rich snippets.
3.  **Entity Linking:** Direct, high-authority backlinks to the production environment to boost Domain Rating (DR).
4.  **Programmatic Directories:** Automated generation of career-specific landing pages to capture "How to become a..." search intent.

---

## ⚙️ Installation & Setup

To run a local instance of ArchPath:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/al-junaid-dev/archpath.git](https://github.com/al-junaid-dev/archpath.git)
    cd archpath
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    GROQ_API_KEY=your_groq_api_key
    ```

4.  **Launch Development Server:**
    ```bash
    npm run dev
    ```

---

## 🗺️ Roadmap

- [x] v1.0 Launch: Core Roadmap Generation & AI Chat
- [x] v1.1 Update: Dynamic SEO Engine & Responsive UI
- [ ] v1.2 Planned: PDF Roadmap Export & Portfolio Integration
- [ ] v2.0 Planned: Multi-user Collaboration & Mentor Verified Links

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

### Built by [al-junaid-dev](https://github.com/al-junaid-dev)
**Architecting the Future, One Roadmap at a Time.**

[Website](https://archpath.vercel.app) • [GitHub](https://github.com/al-junaid-dev)
