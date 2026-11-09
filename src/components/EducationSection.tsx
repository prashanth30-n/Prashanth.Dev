import React from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { EDUCATION, ACHIEVEMENTS } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section className="space-y-6 pb-10 border-b border-zinc-200 dark:border-zinc-800/80">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-mono flex items-center gap-2">
        <GraduationCap className="h-4 w-4 text-accent" />
        <span>Education & Background</span>
      </h2>

      {/* College Card */}
      <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800/90 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-display">
              {EDUCATION.institution}
            </h3>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-mono mt-0.5">
              {EDUCATION.degree}
            </div>
          </div>

          <div className="text-right sm:text-right">
            <span className="inline-block px-2 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60">
              CGPA: {EDUCATION.cgpa}
            </span>
            <div className="text-[11px] font-mono text-zinc-500 mt-0.5">
              {EDUCATION.location}
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
          Rigorous computer science curriculum with intensive focus on Data Structures & Algorithms, 
          Operating Systems, Database Management Systems, Object-Oriented Design, and Computer Networks.
        </p>
      </div>

      {/* Achievements List */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Competitive & Community Highlights
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {ACHIEVEMENTS.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-lg border transition-colors flex items-start gap-3 ${
                item.title.includes('Hacktoberfest')
                  ? 'border-purple-300 dark:border-purple-800/80 bg-purple-50/50 dark:bg-purple-950/20'
                  : 'border-zinc-200 dark:border-zinc-800/70 bg-zinc-50/30 dark:bg-zinc-950/20'
              }`}
            >
              <Award className={`h-4 w-4 shrink-0 mt-0.5 ${item.title.includes('Hacktoberfest') ? 'text-purple-600 dark:text-purple-400' : 'text-amber-500'}`} />
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
                    {item.title}
                  </span>
                  {item.title.includes('Hacktoberfest') && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border border-purple-400/40 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                      2nd Prize
                    </span>
                  )}
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
