import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import logo from '../../assets/images/logo.png'
import closeIcon from '../../assets/images/Close (1).svg'
import { getQuestions, cleanQuestions, createComment, createQuestion } from '../../actions/questions'
import { logout } from '../../actions/user'

const modal_styles= {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "1200px",
      height: "520px",
      marginRight: "-30%",
      transform: "translate(-50%, -50%)",
      padding: "0 0",
      zIndex: "10000",
      boxShadow: "0px 0px 36px 1px rgb(0, 0, 0, 0.25)",
    },
  };
function Index(props) {
    let questions = useSelector((state) => state.questions.questions)
    let [tab_selected, updateTabSelection] = useState('others')
    let [comment, updatecomment] = useState({})
    let [create,updatecreate] = useState(false)
    let [question_title, updateQuestion_title] = useState('')
    let [question, updatequestion] = useState('')

    useEffect(() => {
        props.dispatch(getQuestions(localStorage.getItem('usr_id'), tab_selected))
        return function cleanup(){
            props.dispatch(cleanQuestions())
          }
    },[])

    useEffect(() => {
        props.dispatch(getQuestions(localStorage.getItem('usr_id'), tab_selected))
    },[tab_selected])
    console.log(questions,'questions')

    const commenthandler = (comment_user, question_id) => {
        let add_comment = {}
        add_comment[question_id] = comment_user
        let comments_existing = {...comment, ...add_comment}
        updatecomment(comments_existing)

    }

    const submitCommit = (question_id) => {
        let commented = comment[question_id]
        let new_comment = {}
        new_comment[question_id] = ''
        let comments_existing = {...comment, ...new_comment}
        updatecomment(comments_existing)
        props.dispatch(createComment(localStorage.getItem('usr_id'), question_id, commented, tab_selected))
    }
    console.log(comment, 'comment')

    const logoutHandler = () =>{
        props.dispatch(logout())
    }

    const createQuestionHandler = () => {
        props.dispatch(createQuestion(localStorage.getItem('usr_id'), question_title, question, tab_selected))
        updatecreate(false)
    }
    return (
        <div>
            <div className="header">
                <img src={logo} width="30px" alt="logo"></img>
                <span className="logo-text">Ask Anyone</span><br/>
                <div className="logout" onClick={logoutHandler}>Logout</div>
            </div>
            <div className="page">
                <div className="tab">
                    <ul className="list-tabs">
                        <li className={tab_selected === 'others'? 'selected list-selection': 'list-selection'} onClick={() => {updateTabSelection('others')}}> All Questions</li>
                        <li className={tab_selected === 'mine'? 'selected list-selection': 'list-selection '} onClick={() => {updateTabSelection('mine')}}> My Questions</li>
                    </ul>
                    <hr></hr>
                    <ul className="list-tabs">
                        <li className='list-selection' > Fiction</li>
                        <li className='list-selection' > Science</li>
                        <li className='list-selection' > Maths</li>
                        <li className='list-selection' > Politics</li>
                    </ul>
                    
                </div>
                <div className="question">
                    {
                        tab_selected === 'mine' && <button className="primary-button" style={{width:"50px", marginLeft:"10px"}} onClick={() => updatecreate(true)}>Create</button>
                    }
                    {questions.map((row) => {
                        return <div className="question-card">
                        <div className="question-header row">
                            <div className="title">
                                {row.title}
                            </div>
                            
                        </div>
                        
                        <div className="name">
                            {row.user_name}
                        </div>
                        <div className="text">
                            {row.question}
                        </div>
                        <div className="question-footer row">
                            <div>
                                {}

                            </div>
                            <div className="star">
                                
                            </div>
                        </div>
                        <div className="add-comment">
                            <span><input id="comment" value={comment[row.question_id] ? comment[row.question_id] : ''} placeholder="Add a comment" onChange={(e) => commenthandler(e.target.value, row.question_id)}></input></span>
                            <span><button className="primary-button" onClick={() => submitCommit(row.question_id)}>Comment</button></span>
                        </div>
                        {
                            row.comments.map((comment) => {
                                return <div className="comment">
                                    <div className="comment-user">{comment.user_name}</div>
                                    <div className="comment-content">{comment.comment}</div>
                                </div>
                            })
                        }


                    </div>
                    })}
                    
                </div>
                {/* <div className="top-most-questions">
                    Top most
                </div> */}
            </div>
            <Modal
          isOpen={create}
          ariaHideApp={false}
          contentLabel="import"
          id="import"
          onRequestClose={() => {updatecreate(false)}}
          style={modal_styles}
        >
            <section className="popup-header">
                <span>Add Question</span>
                <span className="right-align"><img src={closeIcon} width="20px" height="20px" alt="close" onClick={() => {updatecreate(false)}}></img></span>
        </section>
        <section className="popup-body" style={{height:"314px"}}>
                <br/><span>Title</span>
                <input type="text" value={question_title} onChange={(e) => {updateQuestion_title(e.target.value)}}></input>
                <br/><span>Question</span>
                <input type="text" value={question} onChange={(e) => {updatequestion(e.target.value)}}></input>
               
        </section>        
        <section className="popup-footer">
        
            <button className="primary-button" onClick={() => {updatecreate(false)}} style={{width:"80px", marginLeft:"10px"}}>Cancel</button>
            <button className="primary-button" onClick={() => {createQuestionHandler()}} style={{width:"80px", marginLeft:"10px"}}>Create</button>
            </section>
        </Modal>
            
        </div>
        
    )
}

export default connect()(Index)
