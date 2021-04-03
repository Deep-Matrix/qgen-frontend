import React, { useEffect, useState } from 'react'
import './Quiz.css'

function Quiz() {

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        //
        function getQuestions(){
            // request here
            const questions_array =[
                {
                    "id":"1",
                    "question":"jwenbj mwe n ewjd njwe  wemnjcwhe jwn ncwe",
                    "options":["asasxcas","3knej3","sank","sdcsdcs"],
                    "correct_answer":"sdcsdcs",
                    "marked_answer":-1,
                    "type":"mcq",
                },
                {
                    "id":"29",
                    "question":"njwe  wemnjcwhe jwn ncwe jwenbj mwe n ewjd njwe  wemnjcwhe jwn ncwe",
                    "options":["asasxcas","3knej3","sank","sdcsdcs"],
                    "correct_answer":"sank",
                    "marked_answer":-1,
                    "type":"mcq"
                },
                {
                    "id":"90",
                    "question":"jwenbj mwe n ewjd njwe  wemnjcwhe jwn ncwe",
                    "options":["asasxcas","3knej3","sank","sdcsdcs"],
                    "correct_answer":"3knej3",
                    "marked_answer":-1,
                    "type":"mcq"
                },
                {
                    "id":"671",
                    "question":"njwe  wemnjcwhe jwn ncwe jwenbj mwe n ewjd njwe  wemnjcwhe jwn ncwe",
                    "options":["asasxcas","3knej3","sank","sdcsdcs"],
                    "correct_answer":"asasxcas",
                    "marked_answer":-1,
                    "type":"mcq"
                },
                {
                    "id":"11",
                    "question":"jwenbj mwe n ewjd njwe  wemnjcwhe jwn ncwe",
                    "options":["asasxcas","3knej3","sank","sdcsdcs"],
                    "correct_answer":"sdcsdcs",
                    "marked_answer":-1,
                    "type":"mcq",
                },
                {
                    "id":"291",
                    "question":"njwe  wemnjcwhe jwn ncwe jwenbj mwe n ewjd njwe  wemnjcwhe jwn ncwe",
                    "options":["asasxcas","3knej3","sank","sdcsdcs"],
                    "correct_answer":"sank",
                    "marked_answer":-1,
                    "type":"mcq"
                },
                {
                    "id":"901",
                    "question":"jwenbj mwe n ewjd njwe  wemnjcwhe jwn ncwe",
                    "options":["asasxcas","3knej3","sank","sdcsdcs"],
                    "correct_answer":"3knej3",
                    "marked_answer":-1,
                    "type":"mcq"
                },
                {
                    "id":"67",
                    "question":"njwe  wemnjcwhe jwn ncwe jwenbj mwe n ewjd njwe  wemnjcwhe jwn ncwe",
                    "options":["asasxcas","3knej3","sank","sdcsdcs"],
                    "correct_answer":"asasxcas",
                    "marked_answer":-1,
                    "type":"mcq"
                }
            ]

            setQuestions(questions_array)
        }
        getQuestions()
    }, [])

    function markAnswer(q,optn,j){
        let updated_list = questions.map((obj) => {
            if(obj.id == q.id){
                obj = {
                    ...obj,
                    marked_answer : optn
                }
            }
            return obj
        });
        setQuestions(updated_list)
    }

    function evaluate(){
        let score = 0 
        console.log(questions)
        for(var i=0;i<questions.length;i++){
            if(questions[i].correct_answer == questions[i].marked_answer){
                score = score + 1
                console.log('rightttttttt ans')
            }
        }
        alert(score)
    }

    return (
        <div className="main">

            <div className="main__left">
                <div style={{margin:"20px 10px"}}>
                    <div className="header-primary">
                        Assignment Navigation
                    </div>
                

                <br></br><br></br>

                <div className="header-secondary" style={{color:"gray"}}>
                    Quick Access
                </div>
                <br></br>

                <div className="quiz__grid">
                    {questions.map((data,index) => {
                        return <>
                            <button className="quiz__grid__item">
                                <div style={{width:"15px"}}>
                                    {index+1}
                                </div>
                                
                            </button>
                        </>
                    })}
                </div>
                </div>
            </div>




            <div style={{
                // boxShadow:"0 0 2 2 #000000"
                borderLeft: "1px solid darkgray",
                height: "100%"
            }} className="main__right">
                <div class="vl"></div>
                    {questions.map((q,index) => {

                        return <div id={index} className="quiz__question__container">
                            <div className="quiz__question">
                                {index+1}) {q.question}
                            </div>

                            <div className="quiz__options">
                                {q.options.map((optn,j) => {
                                    return <div className="quiz__option">
                                        <button 
                                            onClick={() => markAnswer(q,optn,j)}
                                            className={optn == q.marked_answer ? "quiz__grid__item quiz__option__selected" : "quiz__grid__item"}>
                                            <div style={{width:"15px"}}>
                                                {j+1}
                                            </div>
                                        </button>
                                        <div className="quiz__option__text">{optn}</div>
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                    <br></br>

                    <div className="quiz__submit_container">
                        <button 
                            onClick={evaluate}
                            className="quiz__submit__button">
                            Submit
                        </button>
                    </div>

            </div>

        </div>
    )
}

export default Quiz
