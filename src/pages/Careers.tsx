import React, { useState } from 'react';
import { Link } from '../components/Router';
import { useSEO } from '../components/SEO';
import {
  GraduationCap, Users2, ShieldCheck, ArrowRight, CheckCircle2,
  ChevronDown, ChevronUp, AlertCircle, Sparkles, Send, Clock, Globe2, Award, FileText
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Program data
// ---------------------------------------------------------------------------

interface AgeTier {
  name: string;
  ageRange: string;
  purpose: string;
  learningAreas: string[];
  restrictions: string[];
  deliverables: string[];
}

const AGE_TIERS: AgeTier[] = [
  {
    name: 'Young Innovators Program',
    ageRange: 'Ages 12-13',
    purpose: 'A first look at how computers and AI work, built entirely around learning.',
    learningAreas: [
      'Block-based coding with Scratch',
      'Introduction to basic Python',
      'How everyday AI tools work and where they are used',
      'Digital safety and responsible technology use',
    ],
    restrictions: [
      'No commercial or client work of any kind',
      'Requires written consent from a parent or guardian',
      'Fully supervised sessions only',
    ],
    deliverables: [
      'Participation certificate',
      'A small personal project to keep',
      'Written progress notes for parents',
    ],
  },
  {
    name: 'Student Technology Fellowship',
    ageRange: 'Ages 14-17',
    purpose: 'Supervised, educational projects that build real technical foundations without client involvement.',
    learningAreas: [
      'Python fundamentals and simple scripts',
      'Introduction to how AI models and chatbots behave',
      'Building small practice projects end to end',
      'Version control and working with code',
    ],
    restrictions: [
      'No client or production work',
      'Parent or guardian consent required for anyone under 18',
      'All work reviewed and guided by a mentor',
    ],
    deliverables: [
      'Completion certificate',
      'A documented practice project for a portfolio',
      'Mentor feedback summary',
    ],
  },
  {
    name: 'Professional Internship',
    ageRange: 'Ages 18+',
    purpose: 'Real, supervised project work for those ready to build alongside our team.',
    learningAreas: [
      'Contributing to supervised AI voice, WhatsApp, or multi-agent projects',
      'Working with real tools, APIs, and codebases',
      'Prompt design and testing for agent behavior',
      'Collaborating through weekly reviews',
    ],
    restrictions: [
      'Educational and unpaid; not an offer of employment',
      'No guarantee of a job or pre-placement offer',
      'Open to students, graduates, and career switchers of any background',
    ],
    deliverables: [
      'Internship certificate',
      'A portfolio of supervised project work',
      'A reference from your mentor on request',
    ],
  },
];

interface ProgramCategory {
  name: string;
  whoItsFor: string;
}

const PROGRAM_CATEGORIES: ProgramCategory[] = [
  { name: 'Learning Program', whoItsFor: 'The Young Innovators Program (ages 12-13). Pure exposure to how technology works, no deliverables, no pressure, just guided learning.' },
  { name: 'Fellowship', whoItsFor: 'The Student Technology Fellowship (ages 14-17). Supervised educational projects that build a real portfolio, with no client or production work involved.' },
  { name: 'Professional Internship', whoItsFor: 'The 18+ track. Real, supervised project contribution across our learning tracks. This is also what satisfies a college industrial training or internship requirement.' },
  { name: 'Research Fellowship', whoItsFor: 'The Emerging Tech Research track specifically. Self-directed reading and research on frontier topics, not hands-on production work.' },
];

const JOURNEY_STEPS = [
  { step: 'Application', description: 'Tell us who you are and what you want to learn.' },
  { step: 'Eligibility Review', description: 'We confirm your tier, age requirements, and any consent needed.' },
  { step: 'Orientation', description: 'Get set up with your tools, mentor, and first goals.' },
  { step: 'Weekly Tasks & Reviews', description: 'Work through guided tasks with regular feedback.' },
  { step: 'Project Work', description: 'Apply what you have learned to a real, supervised project.' },
  { step: 'Final Evaluation', description: 'Review your progress and project with your mentor.' },
  { step: 'Certificate', description: 'Receive a certificate recognizing what you completed.' },
];

const PROGRAM_LEVELS = [
  { name: 'Foundation', description: 'Learn the basics of coding and how AI tools work through small guided exercises. Suits complete beginners.' },
  { name: 'Intermediate', description: 'Build small projects end to end and get comfortable with real tools and code.' },
  { name: 'Advanced', description: 'Take on more involved practice projects with less hand-holding and deeper technical work.' },
  { name: 'Professional', description: 'Contribute to real supervised project work alongside the team over a longer commitment.' },
];

interface Track {
  id: string;
  title: string;
  overview: string;
  skillsLearned: string[];
  prerequisites: string;
  sampleProjects: string[];
  tools: string[];
  difficulty: 'Beginner-friendly' | 'Intermediate' | 'Some experience helpful';
  featured?: boolean;
  researchOnly?: boolean;
}

const TRACKS: Track[] = [
  {
    id: 'ai-agent-engineering',
    title: 'AI & Agent Engineering',
    overview: 'Work alongside our engineers building and refining LangGraph agent pipelines and RAG workflows that power real client deployments.',
    skillsLearned: [
      'Designing multi-step agent flows with LangGraph',
      'Building and evaluating RAG pipelines end to end',
      'Prompt engineering and systematic prompt evaluation',
      'Writing Python services and endpoints with FastAPI',
    ],
    prerequisites: 'Basic Python and genuine curiosity about how LLM agents work; no degree required.',
    sampleProjects: [
      'Build a small tool-using agent that answers questions over a document set',
      'Add and test a new node in an existing LangGraph pipeline',
      'Create a prompt evaluation harness to compare responses across variants',
    ],
    tools: ['Python', 'LangGraph', 'FastAPI', 'Qdrant'],
    difficulty: 'Some experience helpful',
    featured: true,
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    overview: 'Help build the interfaces and backend services that clients and our team use every day, across frontend and API work.',
    skillsLearned: [
      'Building components with React and TypeScript',
      'Writing and consuming REST APIs',
      'Working in a real Git-based team workflow',
      'Debugging across the frontend and backend',
    ],
    prerequisites: 'Some familiarity with JavaScript or Python; no degree required.',
    sampleProjects: [
      'Build a small dashboard view against an existing API',
      'Add a new endpoint and wire it into the frontend',
      'Fix and test bugs reported from real usage',
    ],
    tools: ['React', 'TypeScript', 'Python', 'Git'],
    difficulty: 'Beginner-friendly',
    featured: true,
  },
  {
    id: 'voice-conversational-ai',
    title: 'Voice & Conversational AI',
    overview: 'Help build and test voice agent conversation flows and basic WhatsApp automation for client use cases.',
    skillsLearned: [
      'Designing conversation flows for voice and chat agents',
      'Working with speech-to-text and text-to-speech pipelines',
      'Basics of the WhatsApp Business API and message handling',
      'Testing and iterating on real conversation transcripts',
    ],
    prerequisites: 'Curiosity about conversational AI and clear written communication; no degree required.',
    sampleProjects: [
      'Map and refine the conversation flow for a booking or FAQ voice agent',
      'Build a simple WhatsApp auto-reply flow for a sample scenario',
      'Review call transcripts and propose prompt or flow improvements',
    ],
    tools: ['Python', 'LangGraph', 'WhatsApp Business API', 'Redis'],
    difficulty: 'Beginner-friendly',
  },
  {
    id: 'data-retrieval-systems',
    title: 'Data & Retrieval Systems',
    overview: 'Help build the retrieval layer behind our agents, working with vector databases and the pipelines that feed them.',
    skillsLearned: [
      'Fundamentals of embeddings and vector search',
      'Loading, chunking, and indexing documents into Qdrant',
      'Measuring and improving retrieval quality',
      'Basic caching patterns with Redis',
    ],
    prerequisites: 'Basic Python and interest in how search and data pipelines work; no degree required.',
    sampleProjects: [
      'Build an ingestion script that chunks and indexes a document set',
      'Compare retrieval quality across different chunking strategies',
      'Add caching to a repeated retrieval query',
    ],
    tools: ['Python', 'Qdrant', 'Redis', 'FastAPI'],
    difficulty: 'Intermediate',
  },
  {
    id: 'business-operations-growth',
    title: 'Business Operations & Growth',
    overview: 'Help keep projects and clients moving, improving the internal processes a small, fast-moving team runs on.',
    skillsLearned: [
      'Structuring and documenting internal processes',
      'Coordinating tasks and timelines across a project',
      'Basics of client onboarding and communication',
      'Tracking simple growth and operations metrics',
    ],
    prerequisites: 'Organized, dependable, and a clear communicator; no degree required.',
    sampleProjects: [
      'Document and streamline our client onboarding checklist',
      'Set up a lightweight project tracker for ongoing work',
      'Prepare a weekly operations summary from project data',
    ],
    tools: ['Notion', 'Google Workspace', 'Slack', 'Spreadsheets'],
    difficulty: 'Beginner-friendly',
  },
  {
    id: 'marketing-content',
    title: 'Marketing & Content',
    overview: 'Help shape how Mashnu explains its work, writing content and running social channels with a clear, honest voice.',
    skillsLearned: [
      'Writing clear technical and marketing content',
      'Planning and scheduling social posts',
      'Positioning technical products for non-technical readers',
      'Reading basic content and engagement metrics',
    ],
    prerequisites: 'Strong writing and curiosity about AI products; no degree required.',
    sampleProjects: [
      'Write a short case study on a client project',
      'Plan and draft a two-week social content calendar',
      'Rewrite a product page section for clarity',
    ],
    tools: ['Notion', 'LinkedIn', 'Canva', 'Google Docs'],
    difficulty: 'Beginner-friendly',
  },
  {
    id: 'sales-client-relations',
    title: 'Sales & Client Relations',
    overview: "Help find and qualify potential clients and support clear, honest communication through the early sales conversations.",
    skillsLearned: [
      'Researching and qualifying leads',
      'Writing clear, personalized outreach',
      'Basics of a sales pipeline and follow-up',
      'Preparing notes and summaries for client calls',
    ],
    prerequisites: 'Confident communicator who enjoys talking to people; no degree required.',
    sampleProjects: [
      'Build a small qualified lead list for a target segment',
      'Draft and test an outreach message sequence',
      'Keep a simple CRM pipeline up to date',
    ],
    tools: ['CRM', 'LinkedIn', 'Google Sheets', 'Email'],
    difficulty: 'Beginner-friendly',
  },
  {
    id: 'design-product',
    title: 'Design & Product',
    overview: 'Help design and refine the interfaces across our product suite, turning rough ideas into clean, usable screens.',
    skillsLearned: [
      'UI design fundamentals and layout',
      'Building interactive prototypes in Figma',
      'Basics of UX research and usability feedback',
      'Working with engineers to ship a design',
    ],
    prerequisites: 'An eye for clean design and willingness to iterate; no degree required.',
    sampleProjects: [
      'Redesign a single screen in one of our product dashboards',
      'Prototype a new feature flow in Figma',
      'Run a small usability review and summarize findings',
    ],
    tools: ['Figma', 'FigJam', 'Notion'],
    difficulty: 'Beginner-friendly',
  },
  {
    id: 'cloud-devops-foundations',
    title: 'Cloud & DevOps Foundations',
    overview: "Learn the basics of deploying and running our services in the cloud, working under supervision on the tooling that keeps a small team's projects shipping.",
    skillsLearned: [
      'Containerizing a service with Docker',
      'Reading and editing CI pipelines and deployment configs',
      'Core concepts of a major cloud provider (compute, storage, environments)',
      'Working with logs, environment variables, and basic monitoring',
    ],
    prerequisites: 'Comfortable in a terminal and curious about how software gets deployed; no degree required.',
    sampleProjects: [
      'Write a Dockerfile for one of our internal services and run it locally',
      'Add a step to an existing CI pipeline and see it run on a real push',
      'Set up basic logging and alerts for a small internal tool',
    ],
    tools: ['Docker', 'GitHub Actions', 'AWS or GCP (guided)', 'Linux CLI'],
    difficulty: 'Intermediate',
  },
  {
    id: 'security-fundamentals',
    title: 'Security Fundamentals',
    overview: 'Build a practical, awareness-level understanding of how to keep applications and client data safe, focused on good habits rather than production security operations.',
    skillsLearned: [
      'Common web and API vulnerabilities and how to avoid them',
      'Secrets management and safe handling of API keys and credentials',
      'Basics of authentication, access control, and data privacy',
      'Security awareness for cloud and third-party integrations',
    ],
    prerequisites: 'Careful, detail-oriented, and interested in how systems break; no degree required.',
    sampleProjects: [
      'Review a small codebase against a common vulnerability checklist and write up findings',
      'Audit how secrets are stored across an internal project and suggest fixes',
      'Put together a short internal guide on safe API key handling',
    ],
    tools: ['OWASP guides', 'Git', 'Secret managers', 'Dependency scanners'],
    difficulty: 'Beginner-friendly',
  },
  {
    id: 'data-engineering-analytics',
    title: 'Data Engineering & Analytics',
    overview: 'Help move, clean, and make sense of data, learning the concepts behind larger data systems while working on realistically sized datasets.',
    skillsLearned: [
      'Building simple ETL scripts to clean and reshape data',
      'Writing queries and turning raw data into clear summaries',
      'Conceptual understanding of streaming and big-data tools like Kafka and Spark',
      'Presenting findings in readable charts and short reports',
    ],
    prerequisites: 'Basic Python or SQL and comfort working with spreadsheets; no degree required.',
    sampleProjects: [
      'Build a script that cleans and merges a messy dataset for analysis',
      'Create a small dashboard summarizing usage data from an internal tool',
      'Write a short primer on how streaming pipelines work, based on guided reading',
    ],
    tools: ['Python', 'SQL', 'Pandas', 'Jupyter'],
    difficulty: 'Intermediate',
  },
  {
    id: 'computer-vision-basics',
    title: 'Computer Vision & Sensing Basics',
    overview: 'Get hands-on with the fundamentals of image-based AI and connected devices at a learning scale, using off-the-shelf models and small experiments.',
    skillsLearned: [
      'Running and evaluating pre-trained vision models',
      'Basics of image processing and annotation',
      'Conceptual exposure to IoT and embedded/edge devices',
      'Understanding where vision and sensing fit into real products',
    ],
    prerequisites: 'Basic Python and interest in images, cameras, or devices; no degree required.',
    sampleProjects: [
      'Use a pre-trained model to detect objects in a small sample image set',
      'Build a simple image classification demo and measure its accuracy',
      'Prototype a small script that reacts to input from a webcam or sensor',
    ],
    tools: ['Python', 'OpenCV', 'Pre-trained vision models', 'Jupyter'],
    difficulty: 'Intermediate',
  },
  {
    id: 'applied-ai-industry-research',
    title: 'Applied AI for Industry',
    overview: 'Study how AI is used across sectors like healthcare, finance, retail, and education, producing case-study research rather than deploying into regulated industries.',
    skillsLearned: [
      'Researching real-world AI use cases across different industries',
      'Mapping a business problem to a plausible AI solution',
      'Understanding constraints like regulation, data sensitivity, and cost',
      'Communicating findings clearly to non-technical readers',
    ],
    prerequisites: 'Strong reading and writing and curiosity about how businesses adopt AI; no degree required.',
    sampleProjects: [
      'Write a case-study breakdown of how AI is applied in one chosen industry',
      'Draft a concept proposal for an AI use case in retail or education',
      'Compare two industry approaches and summarize trade-offs and risks',
    ],
    tools: ['Notion', 'Google Docs', 'Research databases', 'Spreadsheets'],
    difficulty: 'Beginner-friendly',
  },
  {
    id: 'emerging-tech-research',
    title: 'Emerging Tech Research',
    overview: 'A self-directed reading and research track for frontier topics like quantum computing, blockchain, AR/VR, and space and climate tech, focused on understanding rather than production builds.',
    skillsLearned: [
      'Reading and summarizing technical material on emerging fields',
      'Separating genuine capability from hype in new technologies',
      'Writing clear explainers for a general audience',
      'Tracking where a technology realistically stands today',
    ],
    prerequisites: 'Genuine curiosity and the discipline to work through dense reading on your own; no degree required.',
    sampleProjects: [
      'Write a plain-language explainer on where quantum computing actually stands',
      'Research a blockchain or AR/VR use case and assess whether it holds up',
      'Produce a short internal briefing on an emerging tech topic of your choice',
    ],
    tools: ['Notion', 'Research papers', 'Google Docs', 'Public documentation'],
    difficulty: 'Beginner-friendly',
    researchOnly: true,
  },
  {
    id: 'product-management-innovation',
    title: 'Product Management & Innovation',
    overview: 'Learn how ideas become shipped features by helping scope, prioritize, and track real work across a small, fast-moving team.',
    skillsLearned: [
      'Turning rough ideas into clear, scoped requirements',
      'Prioritizing work and writing simple product specs',
      'Gathering and organizing user and client feedback',
      'Coordinating between design, engineering, and clients',
    ],
    prerequisites: 'Organized, curious, and a clear communicator; no degree required.',
    sampleProjects: [
      'Write a short spec for a small feature and track it to completion',
      'Run a lightweight feedback round and summarize what to build next',
      "Map a product's current flow and propose one concrete improvement",
    ],
    tools: ['Notion', 'Figma', 'Slack', 'Spreadsheets'],
    difficulty: 'Beginner-friendly',
  },
  {
    id: 'technical-writing-documentation',
    title: 'Technical Writing & Documentation',
    overview: 'Make our products and code easier to understand by writing clear documentation, guides, and internal references for real projects.',
    skillsLearned: [
      'Writing clear docs, guides, and API references',
      'Explaining technical concepts to different audiences',
      'Structuring information so it is easy to find and follow',
      'Keeping documentation accurate as products change',
    ],
    prerequisites: 'Strong, clear writing and patience for detail; no degree required.',
    sampleProjects: [
      'Write setup and usage docs for one of our internal tools',
      "Turn a rough engineer's note into a clean how-to guide",
      'Review existing docs for gaps and rewrite the weakest sections',
    ],
    tools: ['Markdown', 'Notion', 'Git', 'Google Docs'],
    difficulty: 'Beginner-friendly',
  },
];

const POLICIES = [
  {
    name: 'Attendance & Discipline',
    summary: "We ask for a minimum of five hours a day, and we care more about consistency than volume. Show up when you say you will, and keep your mentor in the loop if life gets in the way. If someone goes quiet for long stretches without any explanation, the internship may be discontinued so the spot can go to someone ready to use it.",
  },
  {
    name: 'Code of Conduct',
    summary: "Treat everyone here with respect, in every message and every call. Harassment, discrimination, and disrespect have no place in the program. Do your own honest work, give credit where it's due, and be straight with your team about what you have and haven't done.",
  },
  {
    name: 'Confidentiality',
    summary: "As an intern, you may come across internal projects, tools, and client information that isn't public. Keep it private, during the program and after it ends. Don't share, post, or reuse anything you learn about our clients or our work without permission.",
  },
  {
    name: 'AI Usage',
    summary: "You are welcome to use AI tools to help you build and learn, the same way our team does. The one rule is that you must understand what you submit and be able to explain how it works.",
  },
  {
    name: 'Certificate Eligibility',
    summary: "A certificate reflects work, not sign-up. To be eligible, you need to complete the minimum program duration and finish the deliverables agreed with your mentor.",
  },
];

const FAQ_ITEMS = [
  { question: 'Is this internship paid?', answer: "No. This is an unpaid, learning-focused program. You won't receive a stipend or salary for taking part." },
  { question: 'Why is it unpaid?', answer: "We're a small agency, and this program is built around teaching and hands-on learning rather than staffing paid roles. Instead of a stipend, we invest our time in mentorship, real project exposure, and feedback. We'd rather be honest about that up front than dress it up as something it isn't." },
  { question: 'Is there a minimum age or education requirement?', answer: 'No degree is required, and there is no formal education background you need to have. The program is open to people of any age and any qualification. What matters is curiosity, effort, and a willingness to learn.' },
  { question: 'Can school students join?', answer: 'Yes. School students are welcome to apply. If you are a minor, we require consent from a parent or guardian before you can take part.' },
  { question: 'How many hours per day are expected?', answer: 'A minimum of five hours per day. You can do more if you want to, but consistency matters more than long bursts.' },
  { question: 'Is this fully remote?', answer: 'Yes, the program is fully remote. You can take part from anywhere with a reliable internet connection. Most collaboration happens over chat and video calls.' },
  { question: 'Will I get a certificate?', answer: "Yes, if you earn it. A certificate is issued once you complete the minimum program duration and finish the deliverables you agree on with your mentor. It's a record of work done, not just attendance." },
  { question: 'Will I get mentorship?', answer: "Yes. You'll work alongside our team and get direct guidance, feedback, and reviews on real projects." },
  { question: "What happens if I can't keep up with attendance?", answer: 'Life happens, and a quiet week now and then is understandable if you let your mentor know. The issue is longer, unexplained absence. If someone consistently goes missing without any communication, the internship may be discontinued so the place can go to someone else.' },
  { question: 'Can international applicants apply?', answer: 'Yes. Because the program is fully remote, applicants from outside India are welcome. Do keep time zone differences in mind, since some coordination and calls happen in Indian Standard Time.' },
  { question: 'Is there a job offer after the internship?', answer: "No, there is no guaranteed job or pre-placement offer. This is a learning program, not a hiring pipeline. That said, strong performers may be considered for future paid opportunities if and when we have openings, but we can't promise that and you shouldn't join expecting it." },
];

const DOCUMENTS_INTRO = "We keep our paperwork deliberately simple. Mashnu is a small company running a learning program, not a large corporate hiring process, so the documents you'll encounter are short, written in plain language, and proportionate to what this is. There's no dense legal contract to wade through and nothing designed to intimidate you. Each one exists only to make expectations clear and protect the trust between us, so you can focus on learning rather than on paperwork.";

const DOCUMENTS = [
  { name: 'Internship Offer Letter', oneLineSummary: "A short letter confirming you've been accepted into the program, along with your track and start date.", whenIssued: 'Sent by email once your application is reviewed and accepted, before the program begins.' },
  { name: 'Learning Agreement', oneLineSummary: 'A plain outline of what you and Mashnu each commit to over the three months, including time expectations, mentorship, and the fact that the program is unpaid and educational.', whenIssued: 'Shared with your offer and signed before your first day, so everyone starts on the same page.' },
  { name: 'Parent/Guardian Consent Form', oneLineSummary: "A short form where a parent or guardian confirms they're okay with you joining the program. Required only for applicants under 18.", whenIssued: "Requested alongside your offer if you're a minor, and returned before you start." },
  { name: 'Code of Conduct', oneLineSummary: 'The document version of the conduct policy you agreed to when applying, covering how we work together respectfully and responsibly.', whenIssued: 'Provided at the start of the program for your reference and acknowledgment.' },
  { name: 'Confidentiality Undertaking', oneLineSummary: "A simple, one-page confirmation that you'll keep internal work and any client information private. It's proportionate to a learning program, not a heavy corporate contract.", whenIssued: 'Signed at the start, before you get access to internal projects or client work.' },
  { name: 'Certificate of Completion', oneLineSummary: 'A certificate stating the track you completed and how long the program ran, marking that you finished successfully.', whenIssued: 'Issued at the end of the program to interns who complete it.' },
  { name: 'Letter of Recommendation', oneLineSummary: "A personal reference describing your work and strengths. It's optional and reserved for interns who performed exceptionally well.", whenIssued: 'Written on request after the program ends, for standout interns.' },
];

const DISCLAIMER = "This program is educational in nature and is intended to provide learning and practical experience. Participation does not create an employment relationship, and it is not an offer of paid work. Selection is based on eligibility and the capacity available at the time of applying, so applying does not guarantee a place. Completing the program does not guarantee employment, a job offer, or any future paid engagement with Mashnu AI. Applicants who are minors must have consent from a parent or guardian before taking part. All participants are expected to follow Mashnu's program policies, including those covering attendance, conduct, confidentiality, and AI usage.";

const CAREERS_FAQ_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Careers() {
  useSEO({
    title: 'Careers and Internships',
    description: 'A remote, unpaid, 3-month internship open to any age and any education background. Learn by building real AI voice, WhatsApp, and automation systems.',
    path: '/careers',
    structuredData: CAREERS_FAQ_STRUCTURED_DATA,
  });

  const [expandedTrackId, setExpandedTrackId] = useState<string | null>('ai-agent-engineering');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [expandedPolicyIdx, setExpandedPolicyIdx] = useState<number | null>(null);

  const [selectedTrack, setSelectedTrack] = useState<string>('ai-agent-engineering');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantAge, setApplicantAge] = useState('');
  const [applicantNote, setApplicantNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const toggleTrack = (id: string) => setExpandedTrackId(expandedTrackId === id ? null : id);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: applicantName,
          email: applicantEmail,
          company: `Internship applicant, age: ${applicantAge || 'not specified'}`,
          useCase: `Internship application for track "${selectedTrack}". Note: ${applicantNote || '(none)'}`,
          source: 'careers_internship',
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to submit application.');
      }
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen text-[#0F172A] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB] py-16 animate-fade-in">

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Page Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/15 text-[10px] font-mono uppercase tracking-widest text-[#2563EB] mx-auto">
            <Sparkles className="w-3 h-3" />
            <span>Internship & Learning Program</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.02em] text-[#0F172A]">
            Learn by building real AI systems
          </h1>
          <p className="text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            A remote, unpaid, 3-month internship open to any age and any education background: school students, college students, graduates, and career switchers. No degree required. Curiosity is.
          </p>
        </section>

        {/* SECTION: Program category distinctions */}
        <section className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROGRAM_CATEGORIES.map((cat) => (
              <div key={cat.name} className="border border-[#E2E8F0] rounded-xl bg-white p-4 space-y-1">
                <h4 className="text-xs font-semibold text-[#0F172A]">{cat.name}</h4>
                <p className="text-[11px] text-[#64748B] leading-relaxed">{cat.whoItsFor}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick facts strip */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Clock, label: 'Duration', value: '3 months' },
            { icon: Globe2, label: 'Format', value: 'Remote' },
            { icon: Users2, label: 'Commitment', value: '5+ hrs/day' },
            { icon: Award, label: 'Stipend', value: 'Unpaid' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="border border-[#E2E8F0] rounded-2xl bg-white p-4 text-center space-y-1.5 shadow-xs">
              <Icon className="w-4 h-4 text-[#2563EB] mx-auto" />
              <div className="text-sm font-semibold text-[#0F172A]">{value}</div>
              <div className="text-[10px] text-[#64748B] uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </section>

        {/* SECTION: Age tiers */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A]">Who this is for</h2>
            <p className="text-xs text-[#64748B]">The program is structured by age, so the scope of work always matches what's appropriate.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AGE_TIERS.map((tier) => (
              <div key={tier.name} className="border border-[#E2E8F0] rounded-2xl bg-white p-6 space-y-4 shadow-xs flex flex-col">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-[#2563EB] uppercase tracking-wider block">{tier.ageRange}</span>
                  <h3 className="text-base font-semibold text-[#0F172A]">{tier.name}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{tier.purpose}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#E2E8F0]">
                  <span className="text-[9px] font-semibold text-[#64748B] uppercase tracking-wider block">Learning areas</span>
                  <ul className="space-y-1.5">
                    {tier.learningAreas.map((item) => (
                      <li key={item} className="flex gap-2 items-start text-[11px] text-[#334155] leading-relaxed">
                        <CheckCircle2 className="w-3 h-3 text-[#2563EB] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#E2E8F0]">
                  <span className="text-[9px] font-semibold text-[#64748B] uppercase tracking-wider block">Restrictions</span>
                  <ul className="space-y-1.5">
                    {tier.restrictions.map((item) => (
                      <li key={item} className="flex gap-2 items-start text-[11px] text-[#64748B] leading-relaxed">
                        <AlertCircle className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] mt-auto">
                  <span className="text-[9px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1.5">You'll receive</span>
                  <div className="flex flex-wrap gap-1.5">
                    {tier.deliverables.map((d) => (
                      <span key={d} className="px-2 py-0.5 bg-[#F1F5F9] border border-[#E2E8F0] text-[9.5px] rounded-full text-[#334155]">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: Program levels */}
        <section className="border border-[#E2E8F0] rounded-3xl bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2.5 border-b border-[#E2E8F0] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight text-[#0F172A]">Program levels</h3>
              <span className="text-[9px] font-semibold text-[#64748B] uppercase tracking-wider block mt-0.5">Not tied to age, based on where you're starting from</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROGRAM_LEVELS.map((level, idx) => (
              <div key={level.name} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[10px] font-semibold text-[#2563EB]">{idx + 1}</span>
                  <h4 className="text-sm font-semibold text-[#0F172A]">{level.name}</h4>
                </div>
                <p className="text-[11px] text-[#64748B] leading-relaxed">{level.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: Learning tracks */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <h2 className="text-2xl font-semibold tracking-tight text-[#0F172A]">Choose a track</h2>
            <p className="text-xs text-[#64748B]">Open to CS, MBA, BBA, MCom, or no formal degree at all, pick what matches your interest, not your major.</p>
          </div>

          <div className="space-y-4">
            {TRACKS.map((track) => {
              const isExpanded = expandedTrackId === track.id;
              return (
                <div
                  key={track.id}
                  className={`border rounded-2xl bg-white transition-all overflow-hidden shadow-xs ${
                    isExpanded ? 'ring-1 ring-[#2563EB]/20 border-[#2563EB]' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  <button
                    onClick={() => toggleTrack(track.id)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none text-left"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        {track.featured && (
                          <span className="px-2 py-0.5 text-[9px] font-semibold uppercase rounded-full tracking-wider bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">
                            Core focus
                          </span>
                        )}
                        {track.researchOnly && (
                          <span className="px-2 py-0.5 text-[9px] font-semibold uppercase rounded-full tracking-wider bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20">
                            Research track
                          </span>
                        )}
                        <span className="px-2 py-0.5 text-[9px] font-semibold uppercase rounded-full tracking-wider bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                          {track.difficulty}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#0F172A]">{track.title}</h3>
                      <p className="text-xs text-[#64748B] line-clamp-1 max-w-xl">{track.overview}</p>
                    </div>
                    <div className="shrink-0">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-[#64748B]" /> : <ChevronDown className="w-5 h-5 text-[#64748B]" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6 space-y-6 animate-fade-in">
                      <p className="text-xs text-[#334155] leading-relaxed">{track.overview}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">Skills you'll learn</h4>
                          <ul className="space-y-2">
                            {track.skillsLearned.map((s) => (
                              <li key={s} className="flex gap-2.5 items-start text-xs text-[#64748B] leading-relaxed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">Sample projects</h4>
                          <ul className="space-y-2">
                            {track.sampleProjects.map((p) => (
                              <li key={p} className="flex gap-2.5 items-start text-xs text-[#64748B] leading-relaxed">
                                <ArrowRight className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-[#E2E8F0] pt-4 flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider mr-2">Tools:</span>
                        {track.tools.map((tool) => (
                          <span key={tool} className="px-2.5 py-1 bg-white border border-[#E2E8F0] text-[10px] font-mono rounded-md text-[#0F172A] font-semibold shadow-xs">{tool}</span>
                        ))}
                      </div>

                      <div className="border-t border-[#E2E8F0] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-xs text-[#64748B]"><strong className="text-[#0F172A]">Prerequisites:</strong> {track.prerequisites}</span>
                        <a
                          href="#apply"
                          onClick={() => setSelectedTrack(track.id)}
                          className="px-4 py-1.5 rounded-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-xs font-medium tracking-tight transition-all shadow-xs shrink-0 text-center"
                        >
                          Apply for this track
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION: Journey */}
        <section className="border border-[#E2E8F0] rounded-3xl bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A]">How it works</h3>
            <p className="text-xs text-[#64748B]">Seven steps from application to certificate.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {JOURNEY_STEPS.map((s, idx) => (
              <div key={s.step} className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[9px] font-semibold text-[#2563EB]">{idx + 1}</span>
                  {idx < JOURNEY_STEPS.length - 1 && <span className="hidden lg:block h-px flex-1 bg-[#E2E8F0]" />}
                </div>
                <h4 className="text-[11px] font-semibold text-[#0F172A]">{s.step}</h4>
                <p className="text-[10px] text-[#64748B] leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: Policies */}
        <section className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A]">Program policies</h3>
            <p className="text-xs text-[#64748B]">Plain-language rules, not legal fine print, just what we actually expect.</p>
          </div>
          <div className="border border-[#E2E8F0] rounded-2xl bg-white overflow-hidden divide-y divide-[#E2E8F0] shadow-xs">
            {POLICIES.map((policy, idx) => {
              const isActive = expandedPolicyIdx === idx;
              return (
                <div key={policy.name}>
                  <button
                    onClick={() => setExpandedPolicyIdx(isActive ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#0F172A] hover:bg-[#F8FAFC] select-none cursor-pointer"
                  >
                    <span>{policy.name}</span>
                    {isActive ? <ChevronUp className="w-4 h-4 text-[#2563EB]" /> : <ChevronDown className="w-4 h-4 text-[#64748B]" />}
                  </button>
                  {isActive && (
                    <div className="p-5 bg-[#F8FAFC] text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0] animate-fade-in">
                      {policy.summary}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION: Application form */}
        <section id="apply" className="border border-[#E2E8F0] rounded-[28px] bg-[#F1F5F9] p-6 sm:p-10 relative overflow-hidden shadow-sm scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono text-[#2563EB] uppercase tracking-widest font-bold block">Apply</span>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A]">Start your application</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Tell us your name, email, and which track interests you. A real person reviews every application, no automated scoring, no bots.
              </p>
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] text-xs space-y-2">
                <span className="text-[8px] font-semibold uppercase text-[#2563EB] block">Reminder</span>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  This is an unpaid, remote, 3-month program. If you're under 18, we'll ask for parent or guardian consent before you begin.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs">
              {!submitted ? (
                <form onSubmit={handleApply} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Track</label>
                    <select
                      value={selectedTrack}
                      onChange={(e) => setSelectedTrack(e.target.value)}
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    >
                      {TRACKS.map((t) => (
                        <option key={t.id} value={t.id}>{t.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Full Name</label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Crispy"
                        className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Email</label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="crispy@gmail.com"
                        className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Age (optional)</label>
                    <input
                      type="text"
                      value={applicantAge}
                      onChange={(e) => setApplicantAge(e.target.value)}
                      placeholder="e.g. 16, or 21"
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Anything you'd like us to know</label>
                    <textarea
                      rows={3}
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                      placeholder="Background, what you want to learn, availability, whatever's useful."
                      className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors placeholder-[#94A3B8] resize-none"
                    />
                  </div>

                  {submitError && <p className="text-xs text-red-600">{submitError}</p>}

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-[#64748B] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                      Your details stay private
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting || !applicantName.trim() || !applicantEmail.trim()}
                      className={`px-5 py-2 rounded-full text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                        isSubmitting
                          ? 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] cursor-not-allowed'
                          : 'bg-[#0F172A] hover:bg-[#334155] text-white'
                      }`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send application'}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center space-y-4 py-10">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-semibold text-[#0F172A]">Application sent</h4>
                    <p className="text-xs text-[#64748B] leading-relaxed max-w-sm">
                      Thanks, we've got it. We'll email you about next steps, usually within a few business days.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION: Documents */}
        <section className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A]">Documents you may encounter</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">{DOCUMENTS_INTRO}</p>
          </div>
          <div className="border border-[#E2E8F0] rounded-2xl bg-white overflow-hidden divide-y divide-[#E2E8F0] shadow-xs">
            {DOCUMENTS.map((doc) => (
              <div key={doc.name} className="p-5 flex items-start gap-3">
                <FileText className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#0F172A]">{doc.name}</h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">{doc.oneLineSummary}</p>
                  <p className="text-[10.5px] text-[#94A3B8]"><strong className="text-[#64748B]">When:</strong> {doc.whenIssued}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: FAQ */}
        <section className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center max-w-md mx-auto space-y-1">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A]">Frequently asked questions</h3>
          </div>
          <div className="border border-[#E2E8F0] rounded-2xl bg-white overflow-hidden divide-y divide-[#E2E8F0] shadow-xs">
            {FAQ_ITEMS.map((item, idx) => {
              const isActive = activeFaq === idx;
              return (
                <div key={item.question}>
                  <button
                    onClick={() => setActiveFaq(isActive ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#0F172A] hover:bg-[#F8FAFC] select-none cursor-pointer"
                  >
                    <span>{item.question}</span>
                    {isActive ? <ChevronUp className="w-4 h-4 text-[#2563EB]" /> : <ChevronDown className="w-4 h-4 text-[#64748B]" />}
                  </button>
                  {isActive && (
                    <div className="p-5 bg-[#F8FAFC] text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#E2E8F0] animate-fade-in">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="max-w-3xl mx-auto text-center space-y-3 pb-8">
          <p className="text-[10.5px] text-[#94A3B8] leading-relaxed">{DISCLAIMER}</p>
          <p className="text-[10.5px] text-[#94A3B8]">
            Questions before applying? <Link to="/contact" className="text-[#2563EB] hover:underline">Contact us</Link>.
          </p>
        </section>

      </main>
    </div>
  );
}
