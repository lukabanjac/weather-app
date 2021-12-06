import React, { useState, useEffect, useContext } from 'react';
import './InputField.scss';
import customLabels from '../../assets/customLables';
import SunAndCloudImage from "../../assets/sun_cloud.png";
import SearchIcon from "../../assets/search.svg";
import LoadingIcon from "../../assets/loading.svg";
import ReactFlagsSelect from 'react-flags-select';
import Context from '../../state-mgmt/context';

const InputField = () => {
  const context = useContext(Context)

  const [code, setCode] = useState('NL');
  const [city, setCity] = useState('Utrecht')

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line
  }, [code])

  useEffect(() => {
    context.getTemperatures(`${city},${code}`);
    // eslint-disable-next-line
  }, [])

  const handleSubmit = () => {
    context.getTemperatures(`${city},${code}`);
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

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
              onKeyPress={handleKeyPress}
              placeholder="Input a city"
              className="cityInputField"
            />  
            <button type="submit" className="citySearchButton" onClick={handleSubmit}>
              { !context.loaded ? <img className="loadingIcon" src={LoadingIcon} alt="loading"></img> : <img className="searchIcon" src={SearchIcon} alt="search"></img> }
            </button> 
          </div>
      </div>
  )
};

InputField.propTypes = {};

InputField.defaultProps = {};

export default InputField;
