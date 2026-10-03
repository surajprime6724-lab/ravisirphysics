import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen,
  Bookmark,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  Zap,
  Filter,
  Search,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  BarChart3,
  HelpCircle,
  FileText,
  Eye,
  EyeOff,
  Flame,
  Layers,
  ArrowRight,
  Target,
  GraduationCap,
  Calculator,
  Compass,
  Check,
  Flag,
  Share2,
  SlidersHorizontal,
  FolderLock
} from 'lucide-react';

const INITIAL_PYQ_DATA = [
  {
    id: "pyq-jee-01",
    exam: "JEE Main",
    year: 2024,
    shift: "Jan 30 Shift 1",
    subject: "Physics",
    topic: "Electrostatics & Capacitance",
    difficulty: "Medium",
    statement: "A parallel plate capacitor having plate area A and plate separation d is filled with two dielectric slabs of dielectric constants K₁ = 3 and K₂ = 6, each of thickness d/2 as shown. If the capacitance of this arrangement is C, and the capacitance without dielectric was C₀, the ratio C/C₀ is equal to:",
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "2" },
      { id: "C", text: "4.5" },
      { id: "D", text: "3.2" }
    ],
    correctOption: "A",
    keyFormula: "Equivalent in series: 1/C = d₁/(ε₀·K₁·A) + d₂/(ε₀·K₂·A)",
    explanation: [
      "1. The two dielectric slabs form two capacitors connected in series, each having plate separation d' = d/2.",
      "2. Capacitance with first dielectric: C₁ = (K₁ · ε₀ · A) / (d/2) = (2 · 3 · ε₀ · A)/d = 6 · C₀.",
      "3. Capacitance with second dielectric: C₂ = (K₂ · ε₀ · A) / (d/2) = (2 · 6 · ε₀ · A)/d = 12 · C₀.",
      "4. Since they are in series: 1/C_eq = 1/C₁ + 1/C₂ = 1/(6C₀) + 1/(12C₀) = 3/(12C₀) = 1/(4C₀).",
      "5. Therefore, C_eq = 4 C₀ ⟹ C/C₀ = 4."
    ],
    takeaway: "Slabs placed parallel to plates (stacked in thickness) are treated as SERIES capacitors. Slabs dividing the area are treated as PARALLEL."
  },
  {
    id: "pyq-jee-02",
    exam: "JEE Advanced",
    year: 2023,
    shift: "Paper 1",
    subject: "Mathematics",
    topic: "Definite Integration & Properties",
    difficulty: "Hard",
    statement: "Evaluate the definite integral: I = ∫[0 to π] (x · sin(x)) / (1 + cos²(x)) dx.",
    options: [
      { id: "A", text: "π² / 2" },
      { id: "B", text: "π² / 4" },
      { id: "C", text: "π / 4" },
      { id: "D", text: "π² / 8" }
    ],
    correctOption: "B",
    keyFormula: "King's Rule: ∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx",
    explanation: [
      "1. Using King's property: I = ∫[0 to π] ((π - x) sin(π - x)) / (1 + cos²(π - x)) dx.",
      "2. Since sin(π - x) = sin(x) and cos(π - x) = -cos(x) ⟹ cos²(π - x) = cos²(x).",
      "3. I = ∫[0 to π] ((π - x) sin(x)) / (1 + cos²(x)) dx = π ∫[0 to π] sin(x)/(1+cos²(x)) dx - I.",
      "4. Adding both equations: 2I = π ∫[0 to π] sin(x)/(1+cos²(x)) dx.",
      "5. Substitute u = cos(x), du = -sin(x) dx. Limits: x=0 → u=1, x=π → u=-1.",
      "6. 2I = π ∫[-1 to 1] du / (1 + u²) = π [tan⁻¹(1) - tan⁻¹(-1)] = π [π/4 - (-π/4)] = π(π/2) = π²/2.",
      "7. Therefore, I = π² / 4."
    ],
    takeaway: "Whenever 'x' appears as a linear factor multiplying a symmetric trigonometric function over [0, π], apply King's rule to eliminate x."
  },
  {
    id: "pyq-neet-01",
    exam: "NEET",
    year: 2024,
    shift: "Code R1",
    subject: "Biology",
    topic: "Genetics & Molecular Basis",
    difficulty: "Easy",
    statement: "Which of the following nitrogenous bases is present exclusively in RNA and is absent in standard DNA double helices?",
    options: [
      { id: "A", text: "Thymine" },
      { id: "B", text: "Cytosine" },
      { id: "C", text: "Uracil" },
      { id: "D", text: "Adenine" }
    ],
    correctOption: "C",
    keyFormula: "Pyrimidine classification: Cytosine, Thymine (DNA), Uracil (RNA)",
    explanation: [
      "1. DNA contains four principal nitrogenous bases: Adenine (A), Guanine (G), Cytosine (C), and Thymine (T).",
      "2. RNA contains Adenine (A), Guanine (G), Cytosine (C), and Uracil (U).",
      "3. Uracil lacks the 5-methyl group present in Thymine (5-methyluracil), making RNA structurally less stable and prone to hydrolysis."
    ],
    takeaway: "Thymine is chemically 5-methyluracil. Methylation gives DNA higher evolutionary resistance against spontaneous deamination."
  },
  {
    id: "pyq-neet-02",
    exam: "NEET",
    year: 2023,
    shift: "Shift 1",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    statement: "According to Valence Shell Electron Pair Repulsion (VSEPR) theory, what is the geometric shape and hybridization of the central sulfur atom in sulfur tetrafluoride (SF₄)?",
    options: [
      { id: "A", text: "Square planar, sp³d" },
      { id: "B", text: "See-saw, sp³d" },
      { id: "C", text: "Tetrahedral, sp³" },
      { id: "D", text: "Trigonal bipyramidal, sp³d" }
    ],
    correctOption: "B",
    keyFormula: "Steric No. = 1/2 [Valence e⁻ + Monovalent atoms - cation + anion] = 1/2 [6 + 4] = 5",
    explanation: [
      "1. Total valence electrons on central S = 6.",
      "2. Number of bond pairs with fluorine atoms = 4.",
      "3. Remaining non-bonding electrons = 2 (1 lone pair).",
      "4. Total electron pairs (Steric Number) = 4 BP + 1 LP = 5 ⟹ sp³d hybridization.",
      "5. The electron geometry is trigonal bipyramidal. To minimize repulsions, the lone pair occupies an equatorial position.",
      "6. The resulting molecular shape is See-saw."
    ],
    takeaway: "In trigonal bipyramidal electronic geometries (Steric No. 5), bulky lone pairs always prefer equatorial sites (120° apart) to minimize 90° axial repulsions."
  },
  {
    id: "pyq-upsc-01",
    exam: "UPSC CSE",
    year: 2024,
    shift: "Prelims GS-1",
    subject: "Polity",
    topic: "Constitutional Framework & Fundamental Rights",
    difficulty: "Hard",
    statement: "With reference to the 'Writ of Habeas Corpus' under Article 32 of the Constitution of India, consider the following statements:\n1. It can be issued against both public authorities and private individuals.\n2. It can be issued even if the detention is executed pursuant to a valid order of a competent court.\nWhich of the statements given above is/are correct?",
    options: [
      { id: "A", text: "1 only" },
      { id: "B", text: "2 only" },
      { id: "C", text: "Both 1 and 2" },
      { id: "D", text: "Neither 1 nor 2" }
    ],
    correctOption: "A",
    keyFormula: "Article 32 & 226: Prerogative remedies; Habeas Corpus = 'to have the body of'",
    explanation: [
      "1. Statement 1 is CORRECT: Unlike Mandamus (which lies only against public bodies), the writ of Habeas Corpus can be issued against both public authorities and private individuals who have unlawfully restrained a person.",
      "2. Statement 2 is INCORRECT: The writ is not issued where the detention is lawful, where the proceeding is for contempt of a legislature or a court, where detention is by a competent court, or where detention is outside the territorial jurisdiction."
    ],
    takeaway: "Habeas Corpus and Quo-Warranto can be moved by non-aggrieved third parties (exception to strict locus standi)."
  },
  {
    id: "pyq-upsc-02",
    exam: "UPSC CSE",
    year: 2023,
    shift: "Prelims GS-1",
    subject: "General Studies",
    topic: "Modern Indian History & Economy",
    difficulty: "Medium",
    statement: "Who among the following was the founder of the 'Satya Shodhak Samaj' established in 1873, which aimed to liberate the Shudras and Ati-Shudras from exploitation by upper castes?",
    options: [
      { id: "A", text: "Dr. B.R. Ambedkar" },
      { id: "B", text: "Jyotirao Govindrao Phule" },
      { id: "C", text: "Gopal Hari Deshmukh (Lokahitawadi)" },
      { id: "D", text: "Sri Narayana Guru" }
    ],
    correctOption: "B",
    keyFormula: "Key text: 'Gulamgiri' (Slavery, 1873) by Jyotirao Phule",
    explanation: [
      "1. Jyotirao Phule established the Satyashodhak Samaj (Truth-seekers' Society) in Pune, Maharashtra on 24 September 1873.",
      "2. Its mission was to spread education among women and lower castes, and eradicate untouchability and social dogmas.",
      "3. He authored 'Gulamgiri' in 1873, dedicating it to the American movement for the abolition of black slavery."
    ],
    takeaway: "Phule pioneered female and dalit education in Pune alongside his wife Savitribai Phule, establishing India's first school for girls at Bhide Wada in 1848."
  },
  {
    id: "pyq-ssc-01",
    exam: "SSC CGL",
    year: 2024,
    shift: "Tier 1 Shift 2",
    subject: "Mathematics",
    topic: "Quantitative Aptitude & Number Systems",
    difficulty: "Medium",
    statement: "A trader marks his goods 25% above the cost price and allows a discount of 12% on the marked price. If he makes a profit of ₹110 on selling an item, find the cost price (CP) of the item.",
    options: [
      { id: "A", text: "₹1,000" },
      { id: "B", text: "₹1,100" },
      { id: "C", text: "₹1,250" },
      { id: "D", text: "₹950" }
    ],
    correctOption: "B",
    keyFormula: "Effective % change = a + b + (ab)/100 = +25 - 12 - (300/100) = 10%",
    explanation: [
      "1. Let Cost Price (CP) = 100x.",
      "2. Marked Price (MP) = 100x + 25% = 125x.",
      "3. Selling Price (SP) = 125x · (1 - 0.12) = 125x · 0.88 = 110x.",
      "4. Profit = SP - CP = 110x - 100x = 10x.",
      "5. Given profit = ₹110 ⟹ 10x = 110 ⟹ x = 11.",
      "6. Therefore, Cost Price = 100 · 11 = ₹1,100."
    ],
    takeaway: "Quick formula: Profit % = [Markup% - Discount% - (Markup × Discount)/100] = 25 - 12 - 3 = 10%."
  },
  {
    id: "pyq-gate-01",
    exam: "GATE",
    year: 2023,
    shift: "CS Set 1",
    subject: "Physics",
    topic: "Digital Logic & Computer Systems",
    difficulty: "Medium",
    statement: "A 4-bit synchronous binary up-counter is constructed using four T flip-flops. What is the clock input frequency condition to toggle the flip-flop corresponding to the MSB?",
    options: [
      { id: "A", text: "Toggles when all previous bits (Q₀, Q₁, Q₂) are 1" },
      { id: "B", text: "Toggles on every positive clock edge" },
      { id: "C", text: "Toggles when Q₂ is 0 and Q₁ is 1" },
      { id: "D", text: "Toggles only when counter overflows to 0000" }
    ],
    correctOption: "A",
    keyFormula: "Synchronous counter logic: T_i = Q₀ · Q₁ · ... · Q_{i-1}",
    explanation: [
      "1. In a synchronous binary counter, all flip-flops are clocked simultaneously by the master clock pulse.",
      "2. A T flip-flop inverts its output whenever its T input is high (logic 1).",
      "3. For the i-th bit to toggle, all preceding less significant bits must be 1 (binary carry condition).",
      "4. Hence, for the MSB (Q₃), T₃ = Q₀ · Q₁ · Q₂. It toggles only when all three lower bits are simultaneously 1."
    ],
    takeaway: "Ripple counters accumulate propagation delay through cascaded clocks; synchronous counters eliminate this using parallel gate logic for T inputs."
  }
];

const EXAMS_LIST = ["All Exams", "JEE Main", "JEE Advanced", "NEET", "UPSC CSE", "SSC CGL", "GATE"];
const SUBJECTS_LIST = ["All Subjects", "Physics", "Chemistry", "Mathematics", "Biology", "Polity", "General Studies"];
const YEARS_LIST = ["All Years", "2025", "2024", "2023", "2022", "2021"];

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState("practice"); // 'practice' | 'mock' | 'vault' | 'analytics'

  // Global filters
  const [selectedExam, setSelectedExam] = useState("All Exams");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [searchQuery, setSearchQuery] = useState("");

  // Practice Mode state
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [revealedSolutions, setRevealedSolutions] = useState({});
  const [userPracticeAnswers, setUserPracticeAnswers] = useState({}); // { [pyqId]: 'A' }

  // Bookmarks & local notes
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem("vb_bookmarks");
      return saved ? JSON.parse(saved) : ["pyq-jee-01", "pyq-upsc-01"];
    } catch {
      return ["pyq-jee-01", "pyq-upsc-01"];
    }
  });

  // Solved tracking
  const [solvedHistory, setSolvedHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("vb_solved");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Mock Test State
  const [mockActive, setMockActive] = useState(false);
  const [mockQuestions, setMockQuestions] = useState([]);
  const [mockCurrentIdx, setMockCurrentIdx] = useState(0);
  const [mockAnswers, setMockAnswers] = useState({}); // { [idx]: 'A' }
  const [mockReviewFlags, setMockReviewFlags] = useState({}); // { [idx]: true }
  const [mockSecondsLeft, setMockSecondsLeft] = useState(1200); // 20 mins
  const [mockSubmitted, setMockSubmitted] = useState(false);

  // Cheat Sheet Modal
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  // Synchronize localStorage
  useEffect(() => {
    try {
      localStorage.setItem("vb_bookmarks", JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem("vb_solved", JSON.stringify(solvedHistory));
    } catch (e) {
      console.error(e);
    }
  }, [solvedHistory]);

  // Filtered PYQ list
  const filteredPYQs = useMemo(() => {
    return INITIAL_PYQ_DATA.filter(item => {
      const matchExam = selectedExam === "All Exams" || item.exam === selectedExam;
      const matchSubject = selectedSubject === "All Subjects" || item.subject === selectedSubject;
      const matchYear = selectedYear === "All Years" || String(item.year) === selectedYear;
      const matchQuery = searchQuery.trim() === "" ||
        item.statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.exam.toLowerCase().includes(searchQuery.toLowerCase());
      return matchExam && matchSubject && matchYear && matchQuery;
    });
  }, [selectedExam, selectedSubject, selectedYear, searchQuery]);

  // Clamp practice index
  useEffect(() => {
    if (practiceIndex >= filteredPYQs.length) {
      setPracticeIndex(Math.max(0, filteredPYQs.length - 1));
    }
  }, [filteredPYQs.length, practiceIndex]);

  // Bookmark toggle
  const toggleBookmark = (id) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    let timer = null;
    if (mockActive && !mockSubmitted && mockSecondsLeft > 0) {
      timer = setInterval(() => {
        setMockSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setMockSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mockActive, mockSubmitted, mockSecondsLeft]);

  const startMockTest = () => {
    const questionsToUse = filteredPYQs.length >= 4 ? filteredPYQs : INITIAL_PYQ_DATA;
    setMockQuestions(questionsToUse);
    setMockCurrentIdx(0);
    setMockAnswers({});
    setMockReviewFlags({});
    setMockSecondsLeft(questionsToUse.length * 90); // 90 sec per question
    setMockSubmitted(false);
    setMockActive(true);
  };

  const endMockTest = () => {
    setMockSubmitted(true);
  };

  // Calculate Mock Results
  const mockStats = useMemo(() => {
    if (!mockSubmitted || mockQuestions.length === 0) return null;
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    mockQuestions.forEach((q, idx) => {
      const selected = mockAnswers[idx];
      if (!selected) {
        unattempted++;
      } else if (selected === q.correctOption) {
        correct++;
      } else {
        incorrect++;
      }
    });

    // Marking scheme: +4 for correct, -1 for incorrect, 0 for unattempted
    const score = (correct * 4) - (incorrect * 1);
    const maxScore = mockQuestions.length * 4;
    const accuracy = correct + incorrect > 0 ? ((correct / (correct + incorrect)) * 100).toFixed(1) : 0;

    return { correct, incorrect, unattempted, score, maxScore, accuracy };
  }, [mockSubmitted, mockQuestions, mockAnswers]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept when user is typing in search
      if (document.activeElement.tagName === 'INPUT') return;

      if (activeTab === 'practice' && filteredPYQs.length > 0) {
        const currentQ = filteredPYQs[practiceIndex];
        if (e.key === 'j' || e.key === 'ArrowRight') {
          if (practiceIndex < filteredPYQs.length - 1) setPracticeIndex(p => p + 1);
        } else if (e.key === 'k' || e.key === 'ArrowLeft') {
          if (practiceIndex > 0) setPracticeIndex(p => p - 1);
        } else if (['1', '2', '3', '4'].includes(e.key)) {
          const map = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };
          handleSelectPracticeOption(currentQ.id, map[e.key]);
        } else if (e.key.toLowerCase() === 's') {
          toggleSolution(currentQ.id);
        } else if (e.key.toLowerCase() === 'b') {
          toggleBookmark(currentQ.id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, practiceIndex, filteredPYQs]);

  const handleSelectPracticeOption = (questionId, optionId) => {
    setUserPracticeAnswers(prev => ({ ...prev, [questionId]: optionId }));
    const currentQ = INITIAL_PYQ_DATA.find(q => q.id === questionId);
    if (currentQ) {
      setSolvedHistory(prev => ({
        ...prev,
        [questionId]: {
          selected: optionId,
          isCorrect: optionId === currentQ.correctOption,
          timestamp: Date.now()
        }
      }));
    }
  };

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans selection:bg-zinc-800 selection:text-white flex flex-col">
      {/* Top Universal Navbar */}
      <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/80 px-4 lg:px-8 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-emerald-400 shadow-sm shadow-emerald-950/20">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold tracking-tight text-white text-lg">VidyaBhawan</span>
                <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-1.5 py-0.2 rounded">PYQ Vault</span>
              </div>
              <p className="text-[10px] text-zinc-400 tracking-wider">विद्याभवन • Authentic Question Bank</p>
            </div>
          </div>

          {/* Quick Global Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, formulas, topics (e.g. King's rule, Capacitance, Habeas Corpus)..."
              className="w-full bg-[#121217] border border-zinc-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-zinc-200 placeholder-zinc-400 focus:outline-none focus:border-zinc-600 transition"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-2.5 text-zinc-400 hover:text-zinc-300 text-xs">
                ✕
              </button>
            )}
          </div>

          {/* Live User Metrics & Action Bar */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs text-zinc-300">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
              <span className="font-medium text-zinc-200">7-Day</span>
              <span className="text-zinc-400">Streak</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium text-zinc-200">{Object.keys(solvedHistory).length}</span>
              <span className="text-zinc-400">Solved</span>
            </div>

            <button
              onClick={() => setShowFormulaModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-md transition"
              title="Quick Formula Cards"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Cheat Sheet</span>
            </button>
          </div>
        </div>
      </header>

      {/* Primary Sub-Navigation Tabs */}
      <div className="border-b border-zinc-800 bg-[#0c0c0e] px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center gap-2">
            {[
              { id: "practice", label: "Practice Mode", icon: BookOpen },
              { id: "mock", label: "Timed Mock Exam", icon: Clock },
              { id: "vault", label: `Starred Vault (${bookmarkedIds.length})`, icon: Bookmark },
              { id: "analytics", label: "Readiness Analytics", icon: BarChart3 }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition ${
                    isActive
                      ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-zinc-400"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-zinc-400 hidden lg:flex items-center gap-3">
            <span>Shortcuts: <kbd className="px-1 py-0.5 bg-zinc-800 rounded text-zinc-300 border border-zinc-700">J/K</kbd> Prev/Next</span>
            <span><kbd className="px-1 py-0.5 bg-zinc-800 rounded text-zinc-300 border border-zinc-700">1-4</kbd> Choose Option</span>
            <span><kbd className="px-1 py-0.5 bg-zinc-800 rounded text-zinc-300 border border-zinc-700">S</kbd> Solution</span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">

        {/* TAB 1: PRACTICE MODE */}
        {activeTab === "practice" && (
          <div className="space-y-6">
            {/* Filter Ribbons */}
            <div className="bg-[#121217] border border-zinc-800/80 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mr-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter:</span>
                </div>

                {/* Exam select */}
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-zinc-600"
                >
                  {EXAMS_LIST.map(e => <option key={e} value={e}>{e}</option>)}
                </select>

                {/* Subject select */}
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-zinc-600"
                >
                  {SUBJECTS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                {/* Year select */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-zinc-600"
                >
                  {YEARS_LIST.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>Showing <b>{filteredPYQs.length}</b> authentic questions</span>
                {(selectedExam !== "All Exams" || selectedSubject !== "All Subjects" || selectedYear !== "All Years" || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedExam("All Exams");
                      setSelectedSubject("All Subjects");
                      setSelectedYear("All Years");
                      setSearchQuery("");
                    }}
                    className="text-emerald-400 hover:underline ml-1"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Empty State */}
            {filteredPYQs.length === 0 ? (
              <div className="bg-[#121217] border border-zinc-800 rounded-xl p-12 text-center max-w-lg mx-auto">
                <FileText className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                <h3 className="text-zinc-200 font-medium text-sm">No Questions Match Your Criteria</h3>
                <p className="text-zinc-500 text-xs mt-1">Try resetting the exam or subject filters to explore more topics.</p>
                <button
                  onClick={() => {
                    setSelectedExam("All Exams");
                    setSelectedSubject("All Subjects");
                    setSelectedYear("All Years");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-3 py-1.5 text-xs bg-zinc-800 text-zinc-200 rounded-md border border-zinc-700 hover:bg-zinc-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              /* Practice Card */
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                
                {/* Left/Main Column: Question & Steps */}
                <div className="lg:col-span-3 space-y-4">
                  {(() => {
                    const currentQ = filteredPYQs[practiceIndex];
                    if (!currentQ) return null;
                    const isBookmarked = bookmarkedIds.includes(currentQ.id);
                    const isRevealed = revealedSolutions[currentQ.id];
                    const selectedChoice = userPracticeAnswers[currentQ.id];
                    const isAnswered = Boolean(selectedChoice);
                    const isCorrect = isAnswered && selectedChoice === currentQ.correctOption;

                    return (
                      <div className="bg-[#111116] border border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
                        
                        {/* Question Metadata Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {currentQ.exam} {currentQ.year}
                            </span>
                            <span className="text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
                              {currentQ.shift}
                            </span>
                            <span className="text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
                              {currentQ.subject}
                            </span>
                            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                              currentQ.difficulty === 'Easy' ? 'text-blue-400 bg-blue-950/40 border border-blue-800/40' :
                              currentQ.difficulty === 'Medium' ? 'text-amber-400 bg-amber-950/40 border border-amber-800/40' :
                              'text-rose-400 bg-rose-950/40 border border-rose-800/40'
                            }`}>
                              {currentQ.difficulty}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleBookmark(currentQ.id)}
                              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition ${
                                isBookmarked
                                  ? 'bg-amber-950/30 border-amber-700/60 text-amber-400'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                              }`}
                              title="Bookmark Question"
                            >
                              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                              <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Question Statement */}
                        <div className="space-y-3">
                          <div className="text-xs text-zinc-400 font-medium tracking-wide uppercase">
                            Concept: {currentQ.topic}
                          </div>
                          <p className="text-zinc-100 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                            {currentQ.statement}
                          </p>
                        </div>

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {currentQ.options.map((opt, idx) => {
                            const isSelected = selectedChoice === opt.id;
                            const isThisCorrect = isRevealed && opt.id === currentQ.correctOption;
                            const isThisWrong = isRevealed && isSelected && !isThisCorrect;

                            let cardStyle = "bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/50";
                            let badgeStyle = "bg-zinc-800 text-zinc-400 border-zinc-700";

                            if (isSelected && !isRevealed) {
                              cardStyle = "bg-zinc-800/90 border-zinc-600 text-white ring-1 ring-zinc-500";
                              badgeStyle = "bg-zinc-700 text-zinc-100 border-zinc-500";
                            }
                            if (isThisCorrect) {
                              cardStyle = "bg-emerald-950/40 border-emerald-600/70 text-emerald-200 ring-1 ring-emerald-500/50";
                              badgeStyle = "bg-emerald-600 text-white border-emerald-500";
                            } else if (isThisWrong) {
                              cardStyle = "bg-rose-950/40 border-rose-600/70 text-rose-200 ring-1 ring-rose-500/50";
                              badgeStyle = "bg-rose-600 text-white border-rose-500";
                            }

                            return (
                              <button
                                key={opt.id}
                                onClick={() => handleSelectPracticeOption(currentQ.id, opt.id)}
                                className={`flex items-start gap-3 p-3.5 rounded-xl border text-left text-xs sm:text-sm transition relative ${cardStyle}`}
                              >
                                <span className={`w-6 h-6 flex-shrink-0 rounded-md border flex items-center justify-center font-mono text-xs font-semibold ${badgeStyle}`}>
                                  {opt.id}
                                </span>
                                <span className="flex-1 mt-0.5 leading-snug">{opt.text}</span>
                                {isThisCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3 top-3.5" />}
                                {isThisWrong && <XCircle className="w-4 h-4 text-rose-400 absolute right-3 top-3.5" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Interactive Feedback & Action Bar */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/60">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleSolution(currentQ.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 flex items-center gap-2 transition"
                            >
                              {isRevealed ? <EyeOff className="w-3.5 h-3.5 text-zinc-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
                              <span>{isRevealed ? "Hide Verified Solution" : "Reveal Step-by-Step Solution"}</span>
                            </button>

                            {isAnswered && (
                              <div className="flex items-center gap-1.5 text-xs">
                                {isCorrect ? (
                                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                                    <Check className="w-3.5 h-3.5" /> Correct (+4)
                                  </span>
                                ) : (
                                  <span className="text-rose-400 font-medium flex items-center gap-1">
                                    <XCircle className="w-3.5 h-3.5" /> Incorrect (-1)
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Navigation Buttons */}
                          <div className="flex items-center gap-2">
                            <button
                              disabled={practiceIndex === 0}
                              onClick={() => setPracticeIndex(p => Math.max(0, p - 1))}
                              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition text-zinc-300"
                              title="Previous question (K)"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-xs font-mono text-zinc-400 px-1">
                              {practiceIndex + 1} / {filteredPYQs.length}
                            </span>
                            <button
                              disabled={practiceIndex === filteredPYQs.length - 1}
                              onClick={() => setPracticeIndex(p => Math.min(filteredPYQs.length - 1, p + 1))}
                              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition text-zinc-300"
                              title="Next question (J)"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Step-by-Step Explanation Accordion */}
                        {isRevealed && (
                          <div className="rounded-xl bg-zinc-950/80 border border-zinc-800 p-5 space-y-4 animate-in fade-in duration-200">
                            <div className="flex items-center justify-between text-xs font-medium text-emerald-400 border-b border-zinc-800/80 pb-2">
                              <span className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                Official Examination Board Derivation
                              </span>
                              <span className="text-zinc-500 font-mono">Verified Answer: Option {currentQ.correctOption}</span>
                            </div>

                            {/* Key Formula Box */}
                            <div className="bg-[#121217] border-l-2 border-emerald-500 p-3 rounded-r-md text-xs font-mono text-zinc-300">
                              <span className="text-zinc-500 block text-[10px] uppercase font-sans tracking-wide">Key Theorem / Formula</span>
                              {currentQ.keyFormula}
                            </div>

                            {/* Steps */}
                            <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
                              {currentQ.explanation.map((step, idx) => (
                                <div key={idx} className="leading-relaxed text-zinc-300">
                                  {step}
                                </div>
                              ))}
                            </div>

                            {/* Exam Takeaway */}
                            <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 text-xs text-zinc-400">
                              <b className="text-zinc-200">Exam Hall Takeaway: </b>
                              {currentQ.takeaway}
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })()}
                </div>

                {/* Right Column: Question Navigator Matrix */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-[#111116] border border-zinc-800/90 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-medium text-zinc-300">
                      <span>Jump to Question</span>
                      <span className="text-zinc-400">{practiceIndex + 1} of {filteredPYQs.length}</span>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 max-h-72 overflow-y-auto pr-1">
                      {filteredPYQs.map((q, idx) => {
                        const isCurrent = idx === practiceIndex;
                        const isAnswered = Boolean(userPracticeAnswers[q.id]);
                        const isSaved = bookmarkedIds.includes(q.id);

                        let btnBg = "bg-zinc-900/80 border-zinc-800 text-zinc-400";
                        if (isAnswered) {
                          const isCorrect = userPracticeAnswers[q.id] === q.correctOption;
                          btnBg = isCorrect
                            ? "bg-emerald-950/60 border-emerald-800/50 text-emerald-400"
                            : "bg-rose-950/60 border-rose-800/50 text-rose-400";
                        }
                        if (isCurrent) {
                          btnBg += " ring-2 ring-emerald-500 text-white font-bold";
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => setPracticeIndex(idx)}
                            className={`h-8 rounded-lg border text-xs font-mono flex items-center justify-center relative transition ${btnBg}`}
                          >
                            {idx + 1}
                            {isSaved && (
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-1 right-1" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded bg-emerald-900/60 border border-emerald-700/60" />
                        <span>Solved correctly</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded bg-rose-900/60 border border-rose-700/60" />
                        <span>Incorrect attempt</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded bg-zinc-900 border border-zinc-700" />
                        <span>Unattempted</span>
                      </div>
                    </div>
                  </div>

                  {/* Motivational Quote / Exam Tip */}
                  <div className="bg-[#111116] border border-zinc-800/80 rounded-2xl p-4 text-xs text-zinc-400 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-medium">
                      <Compass className="w-3.5 h-3.5" />
                      <span>VidyaBhawan Study Tip</span>
                    </div>
                    <p className="leading-relaxed">
                      Over 45% of competitive exam questions test recurring core principles. Solving PYQs trains your mind to identify trap options in 15 seconds.
                    </p>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* TAB 2: TIMED MOCK TEST MODE */}
        {activeTab === "mock" && (
          <div className="max-w-4xl mx-auto space-y-6">
            {!mockActive && !mockSubmitted ? (
              /* Mock Onboarding Screen */
              <div className="bg-[#111116] border border-zinc-800/90 rounded-2xl p-8 text-center space-y-6 shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto text-emerald-400">
                  <Clock className="w-7 h-7" />
                </div>
                
                <div className="max-w-md mx-auto space-y-2">
                  <h2 className="text-xl font-semibold text-white">Authentic Timed Examination</h2>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Test yourself under real exam constraints. No instantaneous answers or hints. Solutions and deep score breakdown unlocked upon submission.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left text-xs">
                  <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                    <span className="text-zinc-500 block">Marking Scheme</span>
                    <span className="font-semibold text-zinc-200">+4 / -1 Negative</span>
                  </div>
                  <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                    <span className="text-zinc-500 block">Question Pool</span>
                    <span className="font-semibold text-zinc-200">
                      {filteredPYQs.length > 0 ? filteredPYQs.length : INITIAL_PYQ_DATA.length} Questions
                    </span>
                  </div>
                  <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                    <span className="text-zinc-500 block">Allocated Time</span>
                    <span className="font-semibold text-zinc-200">90s / Question</span>
                  </div>
                </div>

                <button
                  onClick={startMockTest}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition shadow-lg shadow-emerald-500/10 inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Begin Exam Simulation
                </button>
              </div>
            ) : mockActive && !mockSubmitted ? (
              /* Ongoing Mock Exam Interface */
              <div className="space-y-4">
                {/* Exam Top Sticky Status Bar */}
                <div className="bg-[#111116] border border-zinc-800 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-zinc-200">Exam In Progress</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                      Q {mockCurrentIdx + 1} of {mockQuestions.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-1.5 font-mono text-sm px-3 py-1 rounded-md border ${
                      mockSecondsLeft < 180
                        ? "bg-rose-950/50 border-rose-800 text-rose-400 animate-pulse"
                        : "bg-zinc-900 border-zinc-800 text-emerald-400"
                    }`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatTimer(mockSecondsLeft)}</span>
                    </div>

                    <button
                      onClick={endMockTest}
                      className="px-3 py-1.5 text-xs font-semibold bg-rose-600/90 hover:bg-rose-500 text-white rounded-lg transition"
                    >
                      Submit Exam
                    </button>
                  </div>
                </div>

                {/* Question & Options in Mock Mode */}
                {(() => {
                  const q = mockQuestions[mockCurrentIdx];
                  if (!q) return null;
                  const isMarkedReview = Boolean(mockReviewFlags[mockCurrentIdx]);
                  const currentSelected = mockAnswers[mockCurrentIdx];

                  return (
                    <div className="bg-[#111116] border border-zinc-800 rounded-2xl p-6 sm:p-7 space-y-6">
                      <div className="flex items-center justify-between text-xs pb-3 border-b border-zinc-800">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-300">{q.exam}</span>
                          <span className="text-zinc-500">•</span>
                          <span className="text-zinc-400">{q.subject}</span>
                          <span className="text-zinc-500">•</span>
                          <span className="text-zinc-400">{q.topic}</span>
                        </div>
                        <button
                          onClick={() => {
                            setMockReviewFlags(prev => ({ ...prev, [mockCurrentIdx]: !prev[mockCurrentIdx] }));
                          }}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition ${
                            isMarkedReview
                              ? "bg-amber-950/40 border-amber-700/60 text-amber-400"
                              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          <Flag className="w-3.5 h-3.5" />
                          <span>{isMarkedReview ? "Marked for Review" : "Mark for Review"}</span>
                        </button>
                      </div>

                      <p className="text-zinc-100 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                        {q.statement}
                      </p>

                      {/* Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {q.options.map(opt => {
                          const isSelected = currentSelected === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => {
                                setMockAnswers(prev => ({ ...prev, [mockCurrentIdx]: opt.id }));
                              }}
                              className={`flex items-start gap-3 p-3.5 rounded-xl border text-left text-xs sm:text-sm transition ${
                                isSelected
                                  ? "bg-zinc-800 border-emerald-500 text-white ring-1 ring-emerald-500/50"
                                  : "bg-zinc-900/70 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                              }`}
                            >
                              <span className={`w-6 h-6 flex-shrink-0 rounded-md border flex items-center justify-center font-mono text-xs font-semibold ${
                                isSelected ? "bg-emerald-600 text-white border-emerald-500" : "bg-zinc-800 text-zinc-400 border-zinc-700"
                              }`}>
                                {opt.id}
                              </span>
                              <span className="flex-1 mt-0.5 leading-snug">{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Bottom Controls */}
                      <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                        <button
                          onClick={() => {
                            setMockAnswers(prev => {
                              const copy = { ...prev };
                              delete copy[mockCurrentIdx];
                              return copy;
                            });
                          }}
                          className="text-xs text-zinc-500 hover:text-zinc-300"
                        >
                          Clear Selection
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            disabled={mockCurrentIdx === 0}
                            onClick={() => setMockCurrentIdx(p => Math.max(0, p - 1))}
                            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:bg-zinc-800 disabled:opacity-30"
                          >
                            Previous
                          </button>
                          <button
                            disabled={mockCurrentIdx === mockQuestions.length - 1}
                            onClick={() => setMockCurrentIdx(p => Math.min(mockQuestions.length - 1, p + 1))}
                            className="px-4 py-1.5 rounded-lg bg-zinc-200 hover:bg-white text-zinc-950 font-medium text-xs disabled:opacity-30"
                          >
                            Save & Next
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Mock Palette Quick Jump Grid */}
                <div className="bg-[#111116] border border-zinc-800 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-medium text-zinc-400">Palette Index</div>
                  <div className="flex flex-wrap gap-2">
                    {mockQuestions.map((_, idx) => {
                      const isCurr = idx === mockCurrentIdx;
                      const hasAns = Boolean(mockAnswers[idx]);
                      const isFlagged = Boolean(mockReviewFlags[idx]);

                      let bg = "bg-zinc-900 border-zinc-800 text-zinc-400";
                      if (hasAns) bg = "bg-emerald-950/70 border-emerald-700/60 text-emerald-300";
                      if (isFlagged) bg = "bg-amber-950/70 border-amber-700/60 text-amber-300";
                      if (isCurr) bg += " ring-2 ring-white";

                      return (
                        <button
                          key={idx}
                          onClick={() => setMockCurrentIdx(idx)}
                          className={`w-8 h-8 rounded-lg border text-xs font-mono transition ${bg}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Mock Score Report */
              <div className="space-y-6">
                <div className="bg-[#111116] border border-zinc-800 rounded-2xl p-7 text-center space-y-6 shadow-xl">
                  <div className="inline-flex p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Award className="w-8 h-8" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Test Report & Scorecard</h2>
                    <p className="text-xs text-zinc-400 mt-1">Exam submitted successfully under +4 / -1 evaluation protocol.</p>
                  </div>

                  {/* High Level Score Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                    <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                      <span className="text-[11px] text-zinc-500 block">Total Score</span>
                      <span className="text-lg font-bold font-mono text-emerald-400">
                        {mockStats.score} <span className="text-xs font-normal text-zinc-500">/ {mockStats.maxScore}</span>
                      </span>
                    </div>
                    <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                      <span className="text-[11px] text-zinc-500 block">Accuracy</span>
                      <span className="text-lg font-bold font-mono text-zinc-200">{mockStats.accuracy}%</span>
                    </div>
                    <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                      <span className="text-[11px] text-zinc-500 block">Correct (+4)</span>
                      <span className="text-lg font-bold font-mono text-emerald-400">{mockStats.correct}</span>
                    </div>
                    <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                      <span className="text-[11px] text-zinc-500 block">Negative (-1)</span>
                      <span className="text-lg font-bold font-mono text-rose-400">{mockStats.incorrect}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={startMockTest}
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 border border-zinc-700 transition"
                    >
                      Retake Test
                    </button>
                    <button
                      onClick={() => setActiveTab("practice")}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-semibold text-zinc-950 transition"
                    >
                      Return to Practice
                    </button>
                  </div>
                </div>

                {/* Question-by-Question Review */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-zinc-300">Detailed Answer Review</h3>
                  {mockQuestions.map((q, idx) => {
                    const chosen = mockAnswers[idx];
                    const isRight = chosen === q.correctOption;
                    const isUnattempted = !chosen;

                    return (
                      <div key={q.id} className="p-4 bg-[#111116] border border-zinc-800 rounded-xl space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-zinc-300">Q{idx + 1}: {q.topic}</span>
                          <span className={`px-2 py-0.5 rounded font-mono ${
                            isUnattempted ? "bg-zinc-800 text-zinc-400" :
                            isRight ? "bg-emerald-950 text-emerald-400 border border-emerald-800" :
                            "bg-rose-950 text-rose-400 border border-rose-800"
                          }`}>
                            {isUnattempted ? "Skipped" : isRight ? "Correct (+4)" : "Wrong (-1)"}
                          </span>
                        </div>
                        <p className="text-zinc-400">{q.statement}</p>
                        <div className="flex items-center gap-4 text-zinc-300 pt-1">
                          <span>Your Response: <b className="font-mono">{chosen || "None"}</b></span>
                          <span>Correct Answer: <b className="font-mono text-emerald-400">{q.correctOption}</b></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: BOOKMARKS & VAULT */}
        {activeTab === "vault" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Starred High-Yield Questions</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Quick revision vault for trick questions and formulas.</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                {bookmarkedIds.length} Saved
              </span>
            </div>

            {bookmarkedIds.length === 0 ? (
              <div className="p-10 border border-zinc-800 bg-[#111116] rounded-2xl text-center">
                <Bookmark className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                <p className="text-xs text-zinc-400">No starred questions yet.</p>
                <button
                  onClick={() => setActiveTab("practice")}
                  className="mt-3 px-3 py-1.5 text-xs bg-zinc-800 text-zinc-300 rounded-md border border-zinc-700"
                >
                  Browse Practice Questions
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {INITIAL_PYQ_DATA.filter(q => bookmarkedIds.includes(q.id)).map(q => (
                  <div key={q.id} className="p-5 bg-[#111116] border border-zinc-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-emerald-400">{q.exam} {q.year}</span>
                        <span className="text-xs text-zinc-500">•</span>
                        <span className="text-xs text-zinc-400">{q.subject}</span>
                      </div>
                      <button
                        onClick={() => toggleBookmark(q.id)}
                        className="text-xs text-zinc-400 hover:text-rose-400"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">{q.statement}</p>
                    
                    <div className="p-3 bg-zinc-950/70 border border-zinc-800/80 rounded-lg text-xs space-y-1">
                      <span className="text-zinc-500 font-mono text-[10px] uppercase block">Key Formula</span>
                      <div className="font-mono text-emerald-300">{q.keyFormula}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: READINESS & ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Preparation Health & Mastery</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Objective breakdown of topic proficiencies based on session telemetry.</p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#111116] border border-zinc-800 rounded-xl">
                <span className="text-xs text-zinc-400 block">Total Database Ingestion</span>
                <span className="text-2xl font-bold font-mono text-zinc-100">{INITIAL_PYQ_DATA.length}</span>
                <span className="text-[11px] text-zinc-500 block mt-1">Authentic official PYQs</span>
              </div>
              <div className="p-4 bg-[#111116] border border-zinc-800 rounded-xl">
                <span className="text-xs text-zinc-400 block">Total Solved Today</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">{Object.keys(solvedHistory).length}</span>
                <span className="text-[11px] text-zinc-500 block mt-1">Recorded sessions</span>
              </div>
              <div className="p-4 bg-[#111116] border border-zinc-800 rounded-xl">
                <span className="text-xs text-zinc-400 block">Average Concept Accuracy</span>
                <span className="text-2xl font-bold font-mono text-amber-400">
                  {(() => {
                    const items = Object.values(solvedHistory);
                    if (items.length === 0) return "N/A";
                    const correct = items.filter(x => x.isCorrect).length;
                    return `${((correct / items.length) * 100).toFixed(0)}%`;
                  })()}
                </span>
                <span className="text-[11px] text-zinc-500 block mt-1">Across all attempted exams</span>
              </div>
            </div>

            {/* Exam Readiness Bars */}
            <div className="p-5 bg-[#111116] border border-zinc-800 rounded-xl space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Subject Coverage Distribution</h3>
              {[
                { name: "Physics & Applied Mechanics", percentage: 78, color: "bg-emerald-500" },
                { name: "Mathematics & Calculus", percentage: 64, color: "bg-blue-500" },
                { name: "Organic & Physical Chemistry", percentage: 82, color: "bg-indigo-500" },
                { name: "Indian Polity & Constitution", percentage: 90, color: "bg-amber-500" },
                { name: "Biology & Genetics", percentage: 85, color: "bg-emerald-400" }
              ].map(sub => (
                <div key={sub.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-300">{sub.name}</span>
                    <span className="font-mono text-zinc-400">{sub.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <div
                      className={`h-full ${sub.color} rounded-full transition-all duration-500`}
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* FORMULA & TRICK CHEAT SHEET MODAL */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111116] border border-zinc-800 max-w-xl w-full rounded-2xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>High-Yield PYQ Formula Cheatsheet</span>
              </div>
              <button
                onClick={() => setShowFormulaModal(false)}
                className="text-zinc-400 hover:text-white text-xs px-2 py-1 rounded bg-zinc-900 border border-zinc-800"
              >
                ✕ Esc
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1 text-xs">
              <div className="p-3 bg-zinc-900/70 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-zinc-400 font-medium">King's Rule in Definite Integrals (JEE Adv)</span>
                <p className="font-mono text-emerald-300">∫[a to b] f(x) dx = ∫[a to b] f(a + b - x) dx</p>
              </div>

              <div className="p-3 bg-zinc-900/70 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-zinc-400 font-medium">VSEPR Steric Number (NEET / JEE)</span>
                <p className="font-mono text-emerald-300">SN = 1/2 [V + M - C + A] (V=Valence e⁻, M=Monovalent atoms)</p>
              </div>

              <div className="p-3 bg-zinc-900/70 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-zinc-400 font-medium">Capacitors with Slabs in Series</span>
                <p className="font-mono text-emerald-300">1/C_eq = d₁/(ε₀·K₁·A) + d₂/(ε₀·K₂·A)</p>
              </div>

              <div className="p-3 bg-zinc-900/70 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-zinc-400 font-medium">Article 32 Writ Jurisdiction (UPSC CSE)</span>
                <p className="text-zinc-300 leading-relaxed">
                  Habeas Corpus lies against both private individuals and state authorities. Mandamus does NOT lie against private bodies or the President/Governor.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowFormulaModal(false)}
                className="px-4 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimalist Footer */}
      <footer className="mt-auto border-t border-zinc-800/80 bg-[#09090b] px-4 py-4 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>VidyaBhawan (विद्याभवन) • Dedicated to Academic Mastery</span>
          <span className="text-[11px] text-zinc-600">Pure Local Persistence • Distraction Free Minimal UI</span>
        </div>
      </footer>
    </div>
  );
}