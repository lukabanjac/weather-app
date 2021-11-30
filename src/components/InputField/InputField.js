import React, { useState, useEffect } from 'react';
import './InputField.scss';
import customLabels from '../../assets/customLables';
import SunAndCloudImage from "../../assets/sun_cloud.png";
import ReactFlagsSelect from 'react-flags-select';

const InputField = () => {
  const [selected, setSelected] = useState('NL');

  useEffect(() => {
    console.log("Input Field loaded");
  }, [])

  return (
    <div className="inputField">
      <img className="sunAndCloud" src={SunAndCloudImage} alt="Cloud And Sun"></img>
      <ReactFlagsSelect
        selected={selected}
        onSelect={code => setSelected(code)}
        customLabels={customLabels}
        className="flagInput"
        searchable
      />

      <input className="cityInput"></input>
    </div>
  )
};

InputField.propTypes = {};

InputField.defaultProps = {};

export default InputField;
