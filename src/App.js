import { useContext } from 'react';
import './App.scss';
import InputField from './components/InputField/InputField';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import Context from './state-mgmt/context';

function App() {
  
  const context = useContext(Context);

  return (
    <div 
      className="App" 
      style={{ background: `linear-gradient(135deg, #123787 0%, #0ECED2 ${context.loaded ? 50 - context.weeklyAverage : 50}%, #FA9454 100%` }}
    >
      <InputField />
      <WeatherDisplay />
    </div>
  );
}

export default App;
