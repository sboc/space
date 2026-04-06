import { FocusMenu } from './FocusMenu';
import { TimeControls } from './TimeControls';
import { InfoPanel } from './InfoPanel';

interface Props {
  onSwitchView: () => void;
}

export function HUD({ onSwitchView }: Props) {
  return (
    <div className="hud">
      <div className="hud-top">
        <span className="hud-title">Solar System</span>
        <FocusMenu />
        <button className="view-toggle-btn" onClick={onSwitchView}>
          Nearby Stars →
        </button>
      </div>
      <InfoPanel />
      <div className="hud-bottom">
        <TimeControls />
      </div>
    </div>
  );
}
