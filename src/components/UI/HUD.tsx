import { FocusMenu } from './FocusMenu';
import { TimeControls } from './TimeControls';
import { InfoPanel } from './InfoPanel';

export function HUD() {
  return (
    <div className="hud">
      <div className="hud-top">
        <span className="hud-title">Solar System</span>
        <FocusMenu />
      </div>
      <InfoPanel />
      <div className="hud-bottom">
        <TimeControls />
      </div>
    </div>
  );
}
