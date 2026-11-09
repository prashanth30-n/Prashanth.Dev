import React, { useEffect } from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[92vh] flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121314] text-zinc-900 dark:text-zinc-100 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 px-4 py-3 bg-zinc-50 dark:bg-[#161718]">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs font-mono font-semibold">
              Prashanth_Nakirekanti_Resume.pdf
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumePath}
              download="Prashanth_Nakirekanti_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </a>

            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Open Tab</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* PDF Embedded Frame */}
        <div className="flex-1 w-full bg-zinc-100 dark:bg-zinc-950">
          <iframe
            src={`${PERSONAL_INFO.resumePath}#toolbar=1&view=FitH`}
            title="Prashanth Nakirekanti Resume"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
