import React, { useState, useEffect } from 'react';
import './InputField.scss';
import customLabels from '../../assets/customLables';
import SunAndCloudImage from "../../assets/sun_cloud.png";
import SearchIcon from "../../assets/search.svg";
import ReactFlagsSelect from 'react-flags-select';
import Api from '../../helper/api';
import Util from '../../helper/util';

const InputField = () => {
  const api = new Api();
  const util = new Util();
  const [selected, setSelected] = useState('NL');

  useEffect(() => {
    console.log("Input Field loaded");
  }, [])

  const getCityTemperature = () => {
    api.getCityWeather("Novi Sad,RS").then(
      res => {
        //TODO: iteriraj kroz sve ovo i ispisi, ne zaboravi pokusati kao formu ovo napraviti i stilove za input i gradient. Enter na inputu
        console.log(util.formatWeather(res.data.list))
      }
    ).catch(err => console.log("Error occoured while getteing weather: ", err));
  }

  return (
    <div className="inputField">
      <img className="sunAndCloud" src={SunAndCloudImage} alt="cloud and sun"></img>
      <ReactFlagsSelect
        selected={selected}
        onSelect={code => setSelected(code)}
        customLabels={customLabels}
        className="flagInput"
        searchable
      />

      <div className="cityInputWrapper">
        <input className="cityInputField"></input>
        <button className="citySearchButton" onClick={getCityTemperature}>
          <img src={SearchIcon} alt="search"></img>
        </button>  
      </div>

    </div>
  )
};

InputField.propTypes = {};

InputField.defaultProps = {};

export default InputField;
