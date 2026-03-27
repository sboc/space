import { useSimulationStore } from '../../store/simulationStore';

const SPEED_PRESETS = [
  { label: '1 day/s', value: 1 },
  { label: '1 wk/s', value: 7 },
  { label: '1 mo/s', value: 30 },
  { label: '1 yr/s', value: 365 },
  { label: '10 yr/s', value: 3650 },
  { label: '100 yr/s', value: 36500 },
];

const J2000_MS = Date.UTC(2000, 0, 1, 12, 0, 0);
const MS_PER_DAY = 86_400_000;

export function TimeControls() {
  const { isPaused, timeScale, simulatedTime, togglePause, setTimeScale, resetTime } =
    useSimulationStore();

  const currentDate = new Date(J2000_MS + simulatedTime * MS_PER_DAY);

  return (
    <div className="time-controls">
      <button className="play-pause-btn" onClick={togglePause} title={isPaused ? 'Play' : 'Pause'}>
        {isPaused ? '▶' : '⏸'}
      </button>
      <div className="speed-presets">
        {SPEED_PRESETS.map((preset) => (
          <button
            key={preset.value}
            className={`speed-btn${timeScale === preset.value ? ' active' : ''}`}
            onClick={() => setTimeScale(preset.value)}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <span className="sim-date">
        {currentDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </span>
      <button className="reset-btn" onClick={resetTime} title="Reset to J2000.0">
        ↺
      </button>
    </div>
  );
}
