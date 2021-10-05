import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import logo from '../../assets/images/logo.png'
import { getQuestions, cleanQuestions } from '../../actions/questions'

function Index(props) {
    let questions = useSelector((state) => state.questions.questions)
    let [tab_selected, updateTabSelection] = useState('others')
    useEffect(() => {
        props.dispatch(getQuestions(localStorage.getItem('usr_id'), tab_selected))
        return function cleanup(){
            props.dispatch(cleanQuestions())
          }
    },[])

    useEffect(() => {
        props.dispatch(getQuestions(localStorage.getItem('usr_id'), tab_selected))
    },[tab_selected])
    return (
        <div>
            <div className="header">
                <img src={logo} width="30px" alt="logo"></img>
                <span className="logo-text">Ask Anyone</span>
            </div>
            <div className="page">
                <div className="tab">
                    <ul className="list-tabs">
                        <li className={tab_selected === 'others'? 'selected list-selection': 'list-selection'} onClick={() => {updateTabSelection('others')}}> All Questions</li>
                        <li className={tab_selected === 'mine'? 'selected list-selection': 'list-selection '} onClick={() => {updateTabSelection('mine')}}> My Questions</li>
                    </ul>
                </div>
                <div className="question">
                    {questions.map((row) => {
                        return <div>{row.question}sss</div>
                    })}
                </div>
                <div className="top-most-questions">
                    Top most
                </div>
            </div>

            
        </div>
        
    )
}

export default connect()(Index)
