export const SectionTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <h2 className={`text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 ${className}`}>
        {children}
    </h2>
);