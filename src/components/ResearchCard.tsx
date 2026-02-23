import { Research } from '@/data/research';
import  Badge  from './ui/Badge';

export const ResearchCard = ({ research }: { research: Research }) => (
  <div className="group border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-bold text-lg">{research.title}</h3>
      <span className={`text-xs px-2 py-1 rounded-full ${
        research.status === 'Published' 
        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
      }`}>
        {research.status}
      </span>
    </div>
    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{research.summary}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      <Badge>{research.domain}</Badge>
      <Badge>{research.method}</Badge>
    </div>
    <div className="flex gap-4">
      {research.links.map(link => (
        <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 hover:underline">
          {link.label} ↗
        </a>
      ))}
    </div>
  </div>
);