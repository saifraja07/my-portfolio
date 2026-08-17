import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import type { ArchitectureDiagramData } from '@/types/project';
import { cn } from '@/lib/utils';

interface ArchitectureDiagramProps {
  data: ArchitectureDiagramData;
}

export function ArchitectureDiagram({ data }: ArchitectureDiagramProps) {
  const { nodes, edges } = data;
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const edgeLabel = (fromId: string, toId: string) =>
    edges.find((edge) => edge.from === fromId && edge.to === toId)?.label;

  const isConnected = (nodeId: string, otherId: string) =>
    edges.some(
      (edge) =>
        (edge.from === nodeId && edge.to === otherId) || (edge.from === otherId && edge.to === nodeId),
    );

  return (
    <div>
      {/* Text-first summary — the diagram is a visualization of this, not the only source of it. */}
      <p className="text-sm text-ink-muted">{nodes.map((node) => node.label).join(' → ')}</p>

      <div className="mt-4 flex flex-col items-center gap-1 overflow-x-auto py-2">
        {nodes.map((node, index) => {
          const nextNode = nodes[index + 1];
          const label = nextNode ? edgeLabel(node.id, nextNode.id) : undefined;
          const isActive = activeNodeId === node.id;
          const isAdjacentToActive = activeNodeId !== null && isConnected(node.id, activeNodeId);

          return (
            <div key={node.id} className="flex w-full max-w-xs flex-col items-center">
              <button
                type="button"
                onClick={() => setActiveNodeId((current) => (current === node.id ? null : node.id))}
                aria-pressed={isActive}
                aria-label={`${node.label}${node.description ? ` — ${node.description}` : ''}`}
                className={cn(
                  'w-full rounded-lg border px-4 py-3 text-center transition-colors duration-200',
                  isActive || isAdjacentToActive
                    ? 'border-gold-soft bg-void-elevated'
                    : 'border-hairline bg-void-elevated',
                )}
              >
                <p className={cn('text-sm', isActive ? 'text-gold-soft' : 'text-ink')}>{node.label}</p>
                {node.description && <p className="mt-1 text-xs text-ink-faint">{node.description}</p>}
              </button>

              {nextNode && (
                <div
                  className={cn(
                    'flex flex-col items-center py-1.5 transition-colors duration-200',
                    activeNodeId === node.id || activeNodeId === nextNode.id
                      ? 'text-gold-soft'
                      : 'text-ink-faint',
                  )}
                >
                  <ArrowDown size={14} strokeWidth={1.6} aria-hidden="true" />
                  {label && <span className="mt-0.5 font-mono text-[10px] uppercase tracking-wide">{label}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
