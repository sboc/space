import { useState } from 'react';
import { SolarSystem } from './components/SolarSystem/SolarSystem';
import { InterstellarView } from './components/Interstellar/InterstellarView';
import { MilkyWayView } from './components/MilkyWay/MilkyWayView';
import './App.css';

type View = 'solar-system' | 'interstellar' | 'milky-way';

function App() {
  const [view, setView] = useState<View>('solar-system');

  if (view === 'solar-system')
    return <SolarSystem onSwitchView={() => setView('interstellar')} />;
  if (view === 'interstellar')
    return <InterstellarView onSwitchToPrev={() => setView('solar-system')} onSwitchToNext={() => setView('milky-way')} />;
  return <MilkyWayView onSwitchView={() => setView('interstellar')} />;
}

export default App;
