import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Linkedin,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Server,
  Activity,
  CheckCircle2,
  GitBranch,
  Terminal,
  ExternalLink,
  Building2,
  GraduationCap,
  HeartHandshake,
  Compass,
  FileCheck2,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import SEO from '../components/SEO';
import {
  METRIC_HIGHLIGHTS,
  CORE_TEST_PILLARS,
  JOB_KEYWORD_MATRIX,
  EDUCATION_DATA,
  COMPANIES_DATA,
} from '../data/portfolioData';
import { renderCompanyLogo } from '../components/CompanyLogos';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredKeywords =
    activeCategory === 'all'
      ? JOB_KEYWORD_MATRIX
      : JOB_KEYWORD_MATRIX.filter((item) =>
          item.category.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-slate-50/50 text-gray-900 selection:bg-forest-100 selection:text-forest-900">
      <SEO
        title="Overview – Test & Infrastructure Engineering"
        description="Ben Krack: Senior Software Engineer with 13+ years architecting test infrastructure, distributed systems stress-testing, and high-consequence software verification."
      />
      <Navigation />

      <main className="pt-24 pb-20">
        {/* HERO SECTION */}
        <section className="container mx-auto px-6 max-w-5xl pt-6 pb-16">
          <div className="text-center animate-fade-in">
            {/* Role & Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-forest-100/80 border border-forest-300 text-forest-800 px-4 py-1.5 rounded-full text-sm font-medium mb-8 shadow-xs">
              <Sparkles className="w-4 h-4 text-forest-600 animate-pulse" />
              <span>Senior Software Engineer – Test & Infrastructure Leader</span>
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl font-light text-gray-950 mb-6 tracking-tight">
              Ben Krack
            </h1>

            {/* Impact Headline */}
            <p className="text-xl md:text-2xl font-normal text-forest-800 max-w-3xl mx-auto mb-8 leading-snug">
              Architecting resilient test platforms, stress-testing distributed systems, and shifting quality left at cloud & hardware scale.
            </p>

            {/* Narrative Bio */}
            <div className="max-w-3xl mx-auto space-y-5 text-lg text-gray-700 leading-relaxed text-left bg-white/80 backdrop-blur-xs p-8 rounded-2xl border border-gray-200/80 shadow-xs mb-10">
              <p>
                I am a senior software engineering leader with <strong className="text-gray-900 font-semibold">13 years of experience</strong> architecting the test frameworks, automation infrastructure, and CI/CD tooling that world-class engineering teams rely on to ship high-consequence software quickly and reliably.
              </p>
              <p>
                My engineering philosophy is simple: <strong className="text-forest-800 font-semibold">both build stuff and break stuff</strong>. Whether architecting autonomous agentic test suites, stress-testing distributed microservices under peak enterprise loads, or validating edge/sensor interfaces against cloud backends, I specialize in uncovering performance bottlenecks, latency regressions, and design flaws before they reach production.
              </p>
              <p>
                From mitigating <strong className="text-gray-900 font-semibold">$30 billion in regulatory penalty risk</strong> across 32 products at <strong className="text-gray-900 font-semibold">Google</strong>, to load-testing a <strong className="text-gray-900 font-semibold">$1B/year CRM</strong> at <strong className="text-gray-900 font-semibold">LinkedIn</strong>, to slashing defect leakage by <strong className="text-gray-900 font-semibold">73%</strong> through an agentic self-healing test platform and AI synthetic test data generation framework at <strong className="text-gray-900 font-semibold">Addepar</strong>, I turn testing from a post-release bottleneck into an organization-wide force multiplier.
              </p>
              <p className="pt-2 text-forest-900 font-medium flex items-center gap-2">
                <Compass className="w-5 h-5 text-forest-600 shrink-0" />
                <span>Currently pioneering the intersection of autonomous AI agents, self-healing replay engines, and continuous verification in distributed cloud environments.</span>
              </p>
            </div>

            {/* Call-to-Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/portfolio"
                className="inline-flex items-center space-x-3 bg-forest-700 text-white px-7 py-3.5 rounded-xl hover:bg-forest-800 transition-all duration-200 font-medium shadow-md shadow-forest-900/10 hover:shadow-lg hover:shadow-forest-900/20 group"
              >
                <Building2 className="w-5 h-5 text-forest-200" />
                <span>Explore Systems Built by Company</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#keywords"
                className="inline-flex items-center space-x-2 bg-white text-gray-800 border border-gray-300 px-6 py-3.5 rounded-xl hover:bg-gray-50 hover:border-forest-400 transition-all font-medium shadow-xs"
              >
                <FileCheck2 className="w-5 h-5 text-forest-600" />
                <span>System Keywords & Match</span>
              </a>

              <a
                href="https://www.linkedin.com/in/benkrack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2.5 bg-[#0A66C2] text-white px-6 py-3.5 rounded-xl hover:bg-[#084e96] transition-all font-medium shadow-sm"
              >
                <Linkedin className="w-5 h-5" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        {/* METRICS & TRACK RECORD HIGHLIGHTS */}
        <section className="container mx-auto px-6 max-w-6xl mb-20">
          <div className="border-t border-gray-200/80 pt-12">
            <div className="text-center mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-forest-700 mb-2">
                Proven Track Record & Business Impact
              </h2>
              <p className="text-2xl font-light text-gray-900">
                Quantified Outcomes Across Enterprise & High-Growth Scale
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {METRIC_HIGHLIGHTS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs hover:border-forest-300 hover:shadow-md transition-all text-center flex flex-col justify-between"
                >
                  <div className="text-3xl md:text-4xl font-extrabold text-forest-700 tracking-tight mb-2">
                    {item.number}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1 leading-snug">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500 leading-normal">
                      {item.subtext}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE TEST ENGINEERING PILLARS */}
        <section className="container mx-auto px-6 max-w-6xl mb-24">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-forest-700 mb-2">
              Engineering Disciplines
            </h2>
            <h3 className="text-3xl font-light text-gray-900 tracking-tight">
              Core Technical Competencies & Specializations
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              Directly aligned with systems test validation, distributed cloud SaaS, and mission-critical hardware/software reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CORE_TEST_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-gray-200/90 shadow-xs hover:shadow-md hover:border-forest-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-forest-50 border border-forest-200 text-forest-700 flex items-center justify-center group-hover:bg-forest-600 group-hover:text-white transition-colors">
                      {pillar.icon === 'Layers' && <Layers className="w-5 h-5" />}
                      {pillar.icon === 'Server' && <Server className="w-5 h-5" />}
                      {pillar.icon === 'Cpu' && <Cpu className="w-5 h-5" />}
                      {pillar.icon === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 group-hover:text-forest-800 transition-colors">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Key Tools & Focus Areas
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {pillar.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* QUICK LOOK AT COMPANIES / WHAT I BUILT */}
        <section className="container mx-auto px-6 max-w-6xl mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-gray-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-forest-700 block mb-1">
                Where I've Delivered Impact
              </span>
              <h3 className="text-3xl font-light text-gray-900">
                Experience & Systems Built by Company
              </h3>
            </div>
            <Link
              to="/portfolio"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-forest-700 font-semibold hover:text-forest-900 transition-colors"
            >
              <span>View full company deep dives with metrics</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPANIES_DATA.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:border-forest-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3.5">
                      {renderCompanyLogo(company.logoType, 46)}
                      <div>
                        <h4 className="font-semibold text-gray-950 text-xl">
                          {company.company}
                        </h4>
                        <div className="text-sm font-medium text-forest-700">
                          {company.role}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                      {company.period}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-5 leading-relaxed font-normal">
                    {company.headline}
                  </p>

                  <div className="space-y-2 mb-6">
                    {company.keyContributions.slice(0, 2).map((item, cIdx) => (
                      <div key={cIdx} className="flex items-start space-x-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {company.coreTech.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {company.coreTech.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-xs bg-forest-50 text-forest-700 font-medium">
                        +{company.coreTech.length - 4} more
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/portfolio?company=${company.id}`}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-forest-700 hover:text-forest-900"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* KEYWORDS & JOB POSTING DIRECT ALIGNMENT */}
        <section id="keywords" className="container mx-auto px-6 max-w-6xl mb-24 scroll-mt-24">
          <div className="bg-gradient-to-br from-forest-900 via-forest-800 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="max-w-3xl mb-8">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-forest-500/30 text-forest-200 border border-forest-400/30 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Job Requirements & Keyword Cross-Reference</span>
              </span>
              <h3 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
                Tailored for Senior Software Engineer – Test Roles
              </h3>
              <p className="text-forest-100/90 text-base leading-relaxed">
                Direct mapping between industry job specifications (such as Amazon Leo Systems & Hardware/Software Test, and Cloud Distributed SaaS Validation) against Ben's verified engineering leadership and architecture experience.
              </p>
            </div>

            {/* Keyword Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-forest-700/60 pb-6">
              {[
                { id: 'all', label: 'All Disciplines' },
                { id: 'languages', label: 'Languages & Core' },
                { id: 'frameworks', label: 'Test Frameworks' },
                { id: 'distributed', label: 'Cloud & Distributed' },
                { id: 'reliability', label: 'Load & Resiliency Testing' },
                { id: 'systems', label: 'Systems & Hardware/DFT' },
                { id: 'ai', label: 'AI & Modern Automation' },
                { id: 'leadership', label: 'Tech Lead & Mentorship' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeCategory === tab.id
                      ? 'bg-white text-forest-950 font-bold shadow-xs'
                      : 'bg-forest-800/60 text-forest-200 hover:bg-forest-750 border border-forest-700/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Keyword Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredKeywords.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-forest-950/60 border border-forest-700/50 rounded-2xl p-6 backdrop-blur-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <h4 className="font-semibold text-lg text-emerald-200">
                        {item.category}
                      </h4>
                    </div>
                    <p className="text-sm text-forest-100/80 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.keywords.map((kw, kIdx) => (
                        <span
                          key={kIdx}
                          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-forest-800/80 text-emerald-300 border border-forest-700/60"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-forest-800/70 text-xs text-forest-200/90 flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-white">Demonstrated Evidence: </span>
                      <span>{item.experienceEvidence}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GIVING BACK SECTION - PROMINENT RECTANGLE */}
        <section className="container mx-auto px-6 max-w-6xl mb-12">
          <div className="bg-gradient-to-br from-forest-50/90 via-emerald-50/60 to-white rounded-3xl p-8 md:p-12 border border-forest-200/80 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-forest-200/60">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-forest-700 text-white flex items-center justify-center shadow-md shadow-forest-900/10">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-forest-700 block mb-1">
                    Philanthropy & Public Impact
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-950">
                    Giving Back & Community Leadership
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 max-w-md">
                501(c)(3) nonprofit board governance, fiscal stewardship, and cross-border hunger relief mobilization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-forest-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-forest-100 text-forest-800 mb-3">
                    Board Member
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Quarters for Kids (501c3)</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Organized and filed for official 501(c)(3) nonprofit status. Built and maintained the organization's web platform, social media outreach, and programs providing essential resources to underserved youth.
                  </p>
                </div>
                <div className="text-xs text-forest-700 font-medium pt-3 border-t border-gray-100">
                  Youth Support & Nonprofit Formation
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-forest-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-forest-100 text-forest-800 mb-3">
                    Board Secretary & Treasurer
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">AOK Friends (501c3)</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Organized grassroots homeless outreach initiative to achieve official 501(c)(3) status. Structured fiscal operations, budgets, and directly mobilized street outreach providing food, clothing, and life essentials.
                  </p>
                </div>
                <div className="text-xs text-forest-700 font-medium pt-3 border-t border-gray-100">
                  Financial Governance & Homeless Outreach
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-forest-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-forest-100 text-forest-800 mb-3">
                    Volunteer Committee Chair
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Slalom Volunteer Leadership</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Coordinated volunteer teams across the United States and Canada to raise over $100,000 for hunger relief. Organized regional service events and evaluated grant requests for charitable allocations.
                  </p>
                </div>
                <div className="text-xs text-forest-700 font-medium pt-3 border-t border-gray-100">
                  Cross-Border Relief ($100k+ Raised)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CENTERED UNIVERSITY SECTION */}
        <section className="container mx-auto px-6 max-w-4xl mb-20 text-center">
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200/90 shadow-xs max-w-2xl mx-auto">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#4b2e83] text-[#b7a57a] flex items-center justify-center font-bold font-serif text-2xl border border-purple-200 shadow-xs mb-4">
              W
            </div>
            <h3 className="text-2xl font-bold text-gray-950 mb-2">
              University of Washington
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-700 mb-6">
              Dual Degree Alumnus
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs font-semibold text-forest-700 uppercase tracking-wide">
                  Bachelor of Science
                </div>
                <div className="text-base font-semibold text-gray-900 mt-0.5">
                  Computer Science and Engineering
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs font-semibold text-forest-700 uppercase tracking-wide">
                  Bachelor of Arts
                </div>
                <div className="text-base font-semibold text-gray-900 mt-0.5">
                  Business Administration
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Rigorous grounding in Systems Architecture, Algorithms, Software Verification, and Business Strategy.
            </p>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="container mx-auto px-6 max-w-4xl text-center">
          <div className="p-8 md:p-12 rounded-3xl bg-white border border-gray-200/90 shadow-sm">
            <h3 className="text-3xl font-light text-gray-900 mb-4">
              Ready to Discuss Architecture, Reliability, or Test Strategy?
            </h3>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Explore the detailed company breakdown or connect directly via LinkedIn to discuss how these systems test methodologies can empower your engineering organization.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/portfolio"
                className="inline-flex items-center space-x-2 bg-forest-700 text-white px-8 py-3.5 rounded-xl hover:bg-forest-800 transition-all font-medium shadow-md shadow-forest-900/10"
              >
                <span>View Full Company Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://www.linkedin.com/in/benkrack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 border-2 border-forest-700 text-forest-700 px-8 py-3.5 rounded-xl hover:bg-forest-50 transition-all font-medium"
              >
                <Linkedin className="w-5 h-5" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Ben Krack • Senior Software Engineer – Test & Infrastructure Leader
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-forest-700 transition-colors">Overview</Link>
            <Link to="/portfolio" className="hover:text-forest-700 transition-colors">Company Projects</Link>
            <a
              href="https://www.linkedin.com/in/benkrack"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A66C2] hover:underline inline-flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
