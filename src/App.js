import './App.scss';
import InputField from './components/InputField/InputField';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import State from './state-mgmt/state';

function App() {

  return (
    <div className="App">
      <State>
        <InputField />
        <WeatherDisplay />
      </State>
    </div>
  );
}

export default App;
