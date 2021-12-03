import React, { useState, useEffect, useContext } from 'react';
import './InputField.scss';
import customLabels from '../../assets/customLables';
import SunAndCloudImage from "../../assets/sun_cloud.png";
import SearchIcon from "../../assets/search.svg";
import ReactFlagsSelect from 'react-flags-select';
import Context from '../../state-mgmt/context';

const InputField = () => {
  const context = useContext(Context)

  const [code, setCode] = useState('NL');
  const [city, setCity] = useState('Amsterdam')

  useEffect(() => {
    context.getTemperatures(`${city},${code}`);
    // eslint-disable-next-line
  }, [])

  return (
      <div className="inputField">
        <img className="sunAndCloud" src={SunAndCloudImage} alt="cloud and sun"></img>
        <ReactFlagsSelect
          selected={code}
          onSelect={code => setCode(code)}
          customLabels={customLabels}
          className="flagInput"
          searchable
        />

        <div className="cityInputWrapper">
          <input 
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            className="cityInputField"
          >  
          </input>
          <button className="citySearchButton" onClick={() => context.getTemperatures(`${city},${code}`)}>
            <img src={SearchIcon} alt="search"></img>
          </button>  
        </div>
      </div>
  )
};

InputField.propTypes = {};

InputField.defaultProps = {};

export default InputField;
