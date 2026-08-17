import { Link } from 'react-router-dom';
import { universeNodes } from '@/data/navigation';
import { Planet } from './Planet';
import { CentralProfile } from './CentralProfile';
import { StarField } from './StarField';

export function MobileUniverseList() {
  return (
    <div className="relative">
      <div className="universe-stage relative mx-auto aspect-[4/3] w-full max-w-sm">
        <StarField />
        <CentralProfile />
      </div>

      <nav aria-label="Universe destinations" className="mt-8">
        <ul className="flex flex-col divide-y divide-hairline border-y border-hairline">
          {universeNodes.map((node) => (
            <li key={node.id}>
              <Link
                to={node.route}
                aria-label={`${node.label} — ${node.description}`}
                className="flex items-center gap-4 py-4"
              >
                <Planet accent={node.accent} active size={10} />
                <span className="font-mono text-xs text-ink-faint">{node.number}</span>
                <span className="flex-1 text-base text-ink">{node.label}</span>
                <span className="text-xs text-ink-faint">{node.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
