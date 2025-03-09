import { Button, ButtonVariant } from '@/components/ui/Button';
import { Panel, PanelField, PanelLabel } from '@/components/ui/panel';
import { useStats } from '@/features/pokemon-details/components/stats/useStats';
import { type Pokemon } from '@/models/pokemon';
import { StatField } from './StatField';

interface Props {
  stats: NonNullable<Pokemon['stats']>;
}

export function Stats({ stats }: Props) {
  const { statFields, statTabs, activeTab, calculateStatSum } = useStats(stats);

  return (
    <Panel title="Stats" className="xl:col-span-2">
      <div className="mb-4 flex gap-2">
        {statTabs.map((tab) => (
          <Button
            key={tab.value}
            variant={activeTab === tab.value ? ButtonVariant.Dark : ButtonVariant.Outline}
            onClick={tab.onClick}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {statFields.map(({ label, range, rangeLimit }) => (
        <StatField key={label} label={label} range={range} rangeLimit={rangeLimit} />
      ))}
      <PanelField className="flex justify-end gap-3">
        {statFields[0].range.length === 1 ? (
          <>
            <PanelLabel>Total</PanelLabel>
            <div className="w-[34px] text-right">
              <span className="font-bold">{calculateStatSum()}</span>
            </div>
          </>
        ) : (
          <span className="invisible">0</span>
        )}
      </PanelField>
    </Panel>
  );
}
