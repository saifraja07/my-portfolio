import type { ArchitectureDiagramData } from '@/types/project';
import { ArchitectureDiagram } from './ArchitectureDiagram';

export function ProjectArchitecture({ data }: { data?: ArchitectureDiagramData }) {
  if (!data) return null;

  return (
    <section>
      <h2 className="text-eyebrow text-gold-soft">Architecture</h2>
      <div className="mt-4">
        <ArchitectureDiagram data={data} />
      </div>
    </section>
  );
}
