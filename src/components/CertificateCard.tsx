import { Certificate } from '@/data/certificates';
import  Badge  from './ui/Badge';

export const CertificateCard = ({ certificate }: { certificate: Certificate }) => (
    <div className="group border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors flex flex-col">
        {/* Placeholder for actual image */}
        <div className="h-32 bg-slate-200 dark:bg-slate-800 w-full flex items-center justify-center text-slate-400 text-xs font-mono">
            [Image: {certificate.image}]
        </div>
        <div className="p-5 flex flex-col grow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{certificate.title}</h3>
            </div>
            <p className="text-sm text-slate-500 mb-4">{certificate.issuer} • {certificate.date}</p>
            <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                {certificate.skills.slice(0, 2).map(skill => (
                    <Badge key={skill}>{skill}</Badge>
                ))}
            </div>
            <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 hover:underline inline-block mt-2">
                Verify Credential ↗
            </a>
        </div>
    </div>
);