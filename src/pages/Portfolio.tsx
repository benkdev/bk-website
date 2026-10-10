import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Linkedin,
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
  Layers,
  Server,
  Cpu,
  BarChart3,
  Filter,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import SEO from '../components/SEO';
import {
  COMPANIES_DATA,
  EDUCATION_DATA,
  GIVING_BACK_DATA,
  JOB_KEYWORD_MATRIX,
  CompanyExperience,
} from '../data/portfolioData';
import { renderCompanyLogo } from '../components/CompanyLogos';

const Portfolio = () => {
  const [searchParams] = useSearchParams();
  const companyQuery = searchParams.get('company');

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    'addepar-0': true,
    'linkedin-0': true,
    'google-0': true,
    'google-1': true,
    'slalom-0': true,
  });

  useEffect(() => {
    if (companyQuery && COMPANIES_DATA.some((c) => c.id === companyQuery)) {
      setSelectedCompanyId(companyQuery);
      const el = document.getElementById(companyQuery);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [companyQuery]);

  const toggleProject = (key: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Filter companies based on selection and search query
  const filteredCompanies = COMPANIES_DATA.filter((company) => {
    const matchesTab = selectedCompanyId === 'all' || company.id === selectedCompanyId;
    if (!matchesTab) return false;

    if (!searchTerm.trim()) return true;

    const query = searchTerm.toLowerCase();
    const inCompany = company.company.toLowerCase().includes(query);
    const inRole = company.role.toLowerCase().includes(query);
    const inHeadline = company.headline.toLowerCase().includes(query);
    const inSummary = company.summary.toLowerCase().includes(query);
    const inTech = company.coreTech.some((t) => t.toLowerCase().includes(query));
    const inContributions = company.keyContributions.some((k) => k.toLowerCase().includes(query));
    const inProjects = company.engagements.some(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some((t) => t.toLowerCase().includes(query)) ||
        p.methodologies.some((m) => m.toLowerCase().includes(query))
    );

    return inCompany || inRole || inHeadline || inSummary || inTech || inContributions || inProjects;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 text-gray-900 selection:bg-forest-100 selection:text-forest-900">
      <SEO
        title="Company Projects & Systems Architecture"
        description="Detailed technical deep-dives into test platforms, automation infrastructure, and engineering impact delivered at Google, LinkedIn, Addepar, and Slalom Consulting."
      />
      <Navigation />

      <main className="pt-24 pb-20">
        {/* HEADER / INTRO */}
        <section className="container mx-auto px-6 max-w-6xl pt-6 pb-12">
          <div className="animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-forest-100/80 border border-forest-300 text-forest-800 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
              <Building2 className="w-4 h-4 text-forest-600" />
              <span>Production Track Record & System Architecture</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-light text-gray-950 tracking-tight mb-6">
              Systems Built & Experience by Company
            </h1>

            <p className="text-lg md:text-xl text-gray-700 max-w-4xl leading-relaxed font-normal mb-8">
              A comprehensive technical breakdown of the test frameworks, non-functional harnesses, gate review workflows, and mission-critical systems I have designed and delivered across <strong className="text-gray-950">Addepar</strong>, <strong className="text-gray-950">LinkedIn</strong>, <strong className="text-gray-950">Google</strong>, and <strong className="text-gray-950">Slalom</strong>.
            </p>

            {/* FILTER & SEARCH BAR */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Company Selector Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                <button
                  onClick={() => setSelectedCompanyId('all')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCompanyId === 'all'
                      ? 'bg-forest-700 text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Companies ({COMPANIES_DATA.length})
                </button>

                {COMPANIES_DATA.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCompanyId(c.id)}
                    className={`inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedCompanyId === c.id
                        ? 'bg-forest-700 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{c.company}</span>
                  </button>
                ))}
              </div>

              {/* Keyword Search Input */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by keyword (e.g. AI, gRPC, CI/CD, JMeter)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-gray-200 focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* COMPANIES LIST */}
        <section className="container mx-auto px-6 max-w-6xl space-y-16">
          {filteredCompanies.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
              <p className="text-gray-500 text-lg mb-4">No results matching your keyword "{searchTerm}".</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCompanyId('all');
                }}
                className="text-forest-700 font-semibold underline text-sm"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredCompanies.map((company) => (
              <article
                id={company.id}
                key={company.id}
                className="bg-white rounded-3xl border border-gray-200/90 shadow-xs hover:border-forest-200 transition-all p-7 md:p-10 scroll-mt-24"
              >
                {/* COMPANY HEADER WITH LOGO */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-gray-100 gap-6">
                  <div className="flex items-start space-x-4">
                    {renderCompanyLogo(company.logoType, 56)}
                    <div>
                      <div className="mb-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-950">
                          {company.company}
                        </h2>
                      </div>

                      <div className="text-lg font-medium text-forest-700 mb-2">
                        {company.role}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {company.period}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {company.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Impact Metric Chips */}
                  <div className="flex flex-wrap gap-2.5 lg:justify-end">
                    {company.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-center min-w-[100px]"
                      >
                        <div className="text-xl font-extrabold text-forest-700 leading-tight">
                          {m.value}
                        </div>
                        <div className="text-[11px] font-medium text-gray-500 uppercase tracking-tight">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* EXECUTIVE SUMMARY */}
                <div className="py-6 border-b border-gray-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Executive Mission & Scope
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed font-normal">
                    {company.summary}
                  </p>
                </div>

                {/* WHAT I BUILT & ARCHITECTED (BULLETS) */}
                <div className="py-6 border-b border-gray-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-forest-800 mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-forest-600" />
                    <span>What I Built & Architected</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {company.keyContributions.map((contrib, cIdx) => (
                      <div
                        key={cIdx}
                        className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 text-sm text-gray-800 leading-snug"
                      >
                        <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                        <span>{contrib}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DETAILED SYSTEMS & ENGAGEMENTS */}
                <div className="py-6 border-b border-gray-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-2">
                    <Server className="w-4 h-4 text-forest-600" />
                    <span>Key Projects & Systems Delivered</span>
                  </h3>

                  <div className="space-y-4">
                    {company.engagements.map((eng, eIdx) => {
                      const projectKey = `${company.id}-${eIdx}`;
                      const isExpanded = !!expandedProjects[projectKey];

                      return (
                        <div
                          key={eIdx}
                          className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-gray-300 transition-all"
                        >
                          <div
                            onClick={() => toggleProject(projectKey)}
                            className="p-5 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-100/60 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="w-2 h-2 rounded-full bg-forest-600" />
                              <div>
                                <h4 className="font-semibold text-gray-950 text-base">
                                  {eng.title}
                                </h4>
                                <span className="text-xs text-forest-700 font-medium">
                                  {eng.category}
                                </span>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>
                          </div>

                          {isExpanded && (
                            <div className="p-6 border-t border-gray-100 space-y-5 animate-fade-in">
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {eng.description}
                              </p>

                              {/* Key Achievements */}
                              <div>
                                <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                                  System Achievements & Solved Challenges
                                </h5>
                                <ul className="space-y-1.5">
                                  {eng.achievements.map((ach, aIdx) => (
                                    <li
                                      key={aIdx}
                                      className="text-xs text-gray-700 flex items-start space-x-2"
                                    >
                                      <span className="text-forest-600 font-bold">•</span>
                                      <span>{ach}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Methodologies & Tech */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div>
                                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    Methodologies
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {eng.methodologies.map((m, mIdx) => (
                                      <span
                                        key={mIdx}
                                        className="text-xs px-2.5 py-1 rounded-md bg-forest-50 text-forest-800 border border-forest-100"
                                      >
                                        {m}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    Technologies Used
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {eng.technologies.map((t, tIdx) => (
                                      <span
                                        key={tIdx}
                                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Alignment Note */}
                              {eng.jobAlignmentNote && (
                                <div className="p-3.5 rounded-xl bg-forest-50/80 border border-forest-200 text-xs text-forest-900 flex items-start space-x-2.5">
                                  <ShieldCheck className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                                  <div>
                                    <span className="font-bold">Job Specification Match: </span>
                                    <span>{eng.jobAlignmentNote}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* JOB POSTINGS DIRECT ALIGNMENT CARDS */}
                <div className="pt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-forest-800 mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-forest-600" />
                    <span>How This Aligns With Senior Systems & Test Engineering Roles</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {company.jobPostingsMatch.map((match, mIdx) => (
                      <div
                        key={mIdx}
                        className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-4 text-xs text-emerald-950"
                      >
                        <div className="font-semibold text-sm text-forest-900 mb-1">
                          {match.title}
                        </div>
                        <p className="text-gray-700 leading-relaxed font-normal">
                          {match.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        {/* BOTTOM MATRIX OVERVIEW */}
        <section className="container mx-auto px-6 max-w-6xl mt-20">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-forest-700 mb-2 block">
                Verification & Traceability
              </span>
              <h3 className="text-3xl font-light text-gray-950 mb-3">
                Comprehensive Role & Methodology Alignment
              </h3>
              <p className="text-gray-600 text-sm">
                Cross-referencing 13 years of verified production delivery with core requirements from the Amazon Leo and Distributed Cloud SaaS specifications.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-slate-50 text-gray-700 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Role Requirement Area</th>
                    <th className="py-3 px-4">Target Keywords</th>
                    <th className="py-3 px-4">Proven Evidence in Career</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {JOB_KEYWORD_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-gray-900 whitespace-nowrap">
                        {row.category}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-forest-800">
                        {row.keywords.join(', ')}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        {row.experienceEvidence}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* GIVING BACK SECTION - PROMINENT RECTANGLE */}
        <section className="container mx-auto px-6 max-w-6xl mt-16 mb-12">
          <div className="bg-gradient-to-br from-forest-50/90 via-emerald-50/60 to-white rounded-3xl p-8 md:p-12 border border-forest-200/80 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-forest-200/60">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-forest-700 text-white flex items-center justify-center shadow-md shadow-forest-900/10">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-forest-700 block mb-1">
                    Philanthropy & Community Impact
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-950">
                    Giving Back & Nonprofit Leadership
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
        <section className="container mx-auto px-6 max-w-4xl mb-16 text-center">
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

        {/* LINKEDIN CALL TO ACTION */}
        <section className="container mx-auto px-6 max-w-4xl text-center mt-16">
          <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-xs">
            <h3 className="text-2xl font-light text-gray-950 mb-3">
              Connect with Ben Krack
            </h3>
            <p className="text-gray-600 text-sm mb-6 max-w-lg mx-auto">
              Open to senior software engineering leadership, systems validation, and test infrastructure architecture opportunities.
            </p>
            <a
              href="https://www.linkedin.com/in/benkrack"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#0A66C2] text-white px-7 py-3 rounded-xl hover:bg-[#084e96] transition-colors font-medium text-sm shadow-sm"
            >
              <Linkedin className="w-4 h-4" />
              <span>View Full Profile on LinkedIn</span>
            </a>
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

export default Portfolio;
