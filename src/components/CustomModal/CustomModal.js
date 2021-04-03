import { Grid, Paper, Slider } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CustomModal.css";

function CustomModal(props) {

  const [noOfQuestions, setNoOfQuestions] = useState(5)
  const [fib, setFib] = useState(false)
  const [mcq, setMcq] = useState(false)
  const [tf, setTf] = useState(false)

  function submitQuizForm(){
    props.submitQuizForm(noOfQuestions,fib,mcq,tf)
    props.setOpenQuizForm(false)
  }

  return (
    <div className="cusmodal">

        
      <div className="cusmodal__main">
        <div className="cusmodal__left">
            <p className="heading__primary">Quiz Settings</p>
            <p className="heading__secondary">Alright let's jump into the settings for how your quiz will be.</p>
        </div>
        <div className="cusmodal__right">
            <div style={{position:"absolute",top:"10px",right:"10px"}}>
                <CancelIcon style={{cursor:"pointer"}} onClick={() => props.setOpenQuizForm(false)} fontSize="large"/>
            </div>
            <div className="cusmodal__form">
                <h3>Quiz length</h3>
                <small>Choose how long your quiz will be. You can always take another quiz after this one!</small>
                <div className="cusmodal__slider">
                    <Slider
                        defaultValue={noOfQuestions}
                        getAriaValueText={(valuetext)=> valuetext}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="on"
                        step={1}
                        marks
                        min={1}
                        max={99}
                        onChange={(e,data) => setNoOfQuestions(data)}
                    />
                </div>
                
                <h3>Quiz type</h3>
                <small>Unselect the question types you do not want on your quiz. Scroll to view more</small>
                <div className="cusmodal__button-container">
                    <button 
                      onClick={(e) => setMcq(!mcq)} 
                      className="cusmodal__button-container__button" 
                      style={{backgroundColor: "mediumturquoise"}}>Multiple Choice</button>
                    <button 
                      onClick={(e) => setFib(!fib)} 
                      className="cusmodal__button-container__button" 
                      style={{backgroundColor:"burlywood"}}>Fill In Blanks</button>
                    <button 
                      onClick={(e) => setTf(!tf)} 
                      className="cusmodal__button-container__button" 
                      style={{backgroundColor: "#f18888"}}>True/False</button>
                    {/* <button className="cusmodal__button-container__button" style={{backgroundColor: "#82d1f0"}}>Multiple Choice</button> */}
                    {/* <button className="cusmodal__button-container__button" style={{backgroundColor: "#f2c2c2"}}>Multiple Choice</button> */}
                </div>

                <div className="cusmodal__submit">
                    <button
                      onClick={submitQuizForm}
                      className="cusmodal__button-container__button"
                      style={{backgroundColor: "#000"}}
                    >Quiz Me</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
