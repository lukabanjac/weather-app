import React, { useState, useEffect } from 'react';
import './InputField.scss';
import customLabels from '../../assets/customLables';
import SunAndCloudImage from "../../assets/sun_cloud.png";
import ReactFlagsSelect from 'react-flags-select';

const InputField = () => {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    console.log("Input Field loaded");
  }, [])

  return (
    <div className="InputField">
      <img className="SunAndCloud" src={SunAndCloudImage} alt="cloud and sun"></img>
      <ReactFlagsSelect
        selected={selected}
        onSelect={code => setSelected(code)}
        customLabels={customLabels}
        className
        searchable
      />
    </div>
  )
};

InputField.propTypes = {};

InputField.defaultProps = {};

export default InputField;
