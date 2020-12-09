import React, { useEffect, useState } from 'react';
import FooterComponent from '../FooterComponent/FooterComponent';
import LoadingOverlayComp from '../LoadingOverlayComp/LoadingOverlayComp';
import firebase from './../../Firebase';
import emptyImg from './../../assets/empty.svg';
import { Add, Check, Close, DeleteOutline, ExpandLess, ExpandMore, Remove } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';

const EmployeeFormPage = ({ user }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newQuestionType, setNewQuestionType] = useState("MULTIPLE")
  const [newQuestionRequired, setNewQuestionRequired] = useState(true);
  const [newQuestionOptions, setNewQuestionOptions] = useState([""]);
  const [newQuestion, setNewQuestion] = useState('');
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [showingNewQuestionDialog, setShowNewQuestionDialog] = useState(false);
  const history = useHistory();

  useEffect(() => {
    firebase.firestore().collection('form').where("TYPE", "!=", "MULTIPLE | TEXT").get()
      .then(query => {
        setQuestions(query.docs.map(doc => {
          let ques = doc.data();
          ques['id'] = doc.id;
          return ques;
        }));
        // setQuestions([{
        //   QUESTION: "Some Question for employee",
        //   REQUIRED: true,
        //   TYPE: "TEXT"
        // },
        // {
        //   QUESTION: "Some other Question for employee",
        //   REQUIRED: false,
        //   TYPE: "MULTIPLE",
        //   OPTIONS: ["Some option", "Some other option", "And another option"]
        // },
        // {
        //   QUESTION: "Some other Question for employee",
        //   REQUIRED: false,
        //   TYPE: "MULTIPLE",
        //   OPTIONS: ["Some option", "Some other option", "And another option"]
        // },
        // {
        //   QUESTION: "Some other Question for employee",
        //   REQUIRED: false,
        //   TYPE: "MULTIPLE",
        //   OPTIONS: ["Some option", "Some other option", "And another option"]
        // }]);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!user) {
      history.push('/');
    }
  }, [user]);

  const removeOption = (i) => {
    setNewQuestionOptions(prevOptions => {
      let newOptions = [...prevOptions];
      newOptions.splice(i, 1);
      return newOptions;
    });
  }

  const updateOption = (e, i) => {
    setNewQuestionOptions(prevOptions => {
      prevOptions[i] = e.target.value;
      return prevOptions;
    });
  }

  const clearNewQuestionFields = () => {
    setNewQuestionOptions([]);
    setNewQuestion('');
    setDropDownOpen(false);
  }

  const uploadNewQuestion = (question) => {
    return firebase.firestore().collection('form').add(question);
  }

  const addNewQuestion = () => {
    if (newQuestion.trim() !== '')
      if (!(newQuestionType === "MULTIPLE" &&
        (newQuestionOptions.length === 0 || newQuestionOptions.reduce((acc, currOption) => acc && currOption.trim(), 'a') === ''))) {

        const thisQuestion = { QUESTION: newQuestion.trim(), TYPE: newQuestionType, REQUIRED: newQuestionRequired };
        if (newQuestionType === "MULTIPLE") {
          const options = [...new Set(newQuestionOptions)]
          thisQuestion["OPTIONS"] = options;
        }

        setIsLoading(true);
        uploadNewQuestion(thisQuestion)
          .then(() => {
            setQuestions([...questions, thisQuestion]);
            clearNewQuestionFields();
            hideDialog();
            setIsLoading(false);
          })
          .catch(err => {
            console.log(err);
            setIsLoading(false);
          })
      }
  }

  const removeQuestion = (i) => {
    setIsLoading(true);

    firebase.firestore().collection('form').doc(questions[i].id).delete()
      .then(() => {
        const thisQuestion = [...questions];
        thisQuestion.splice(i, 1);
        setQuestions(thisQuestion);

        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }

  const addNewOption = () => {
    const reduced = newQuestionOptions.reduce((acc, currOption) => acc && currOption.trim(), 'a');
    if (reduced !== "")
      setNewQuestionOptions([...newQuestionOptions, ""]);
  }

  const handleLogout = () => {
    setIsLoading(true);
    firebase.auth().signOut()
      .then(() => {
        setIsLoading(false);
      });
  }

  const showNewQuestionDialog = () => {
    document.body.style.overflowY = "hidden";
    setShowNewQuestionDialog(true)
  }

  const hideDialog = () => {
    document.body.style.overflowY = "scroll";
    setShowNewQuestionDialog(false)
  }

  return (
    <section className="Home" id="EmpFormSection">
      <nav>
        <h2>
          <Link to="/">
            TeamQ
          </Link>
        </h2>

        <div>
          <button onClick={() => showNewQuestionDialog()}> Add Question </button>
          <button onClick={() => handleLogout()}> Logout </button>
        </div>
      </nav>

      <div id="mainDiv">
        <div id="questionsDiv">
          {questions.map((q, i) => (
            <div key={q + i} className="questionDiv">
              <div className="questionContent">
                <p>
                  {q.REQUIRED ? "MANDATORY" : "OPTIONAL"}
                </p>

                <p>
                  {q.QUESTION}
                </p>

                {q.TYPE === "MULTIPLE" && <>
                  {q.OPTIONS.map((o, i) => (
                    <div className="questionOption">
                      <p key={o + i}>{o}</p>
                      <div id="requiredCheck">
                        <Check />
                      </div>
                    </div>
                  ))}
                </>}
              </div>

              <button onClick={() => removeQuestion(i)}>
                <DeleteOutline />
              </button>
            </div>
          ))}
        </div>

        {questions.length === 0 && <div id="noQuestions">
          <img src={emptyImg} alt="No Questions found, add Questions and their options above and Save" />
          No Questions found, add Questions and their options above and Save
        </div>}
      </div>

      {/* New Question dialog */}
      <section id="newQuestionContainer" style={{ display: showingNewQuestionDialog ? 'flex' : 'none' }}>
        <button className="close" onClick={hideDialog}>
          <Close fontSize="large" />
        </button>

        <div id="newQuestion">
          <input type="text" value={newQuestion} placeholder="Enter new question here..."
            onChange={(e) => setNewQuestion(e.target.value)} />

          <div className="questionProperty">
            <span>Question is mandatory to answer</span>

            <div id="requiredCheck" onClick={() => setNewQuestionRequired(!newQuestionRequired)}>
              {newQuestionRequired ? <Check /> : <Remove />}
            </div>
          </div>

          <div className="questionProperty">
            <span>Select the type of Question</span>

            <div>
              <div id="customSelect" onClick={() => setDropDownOpen(!dropdownOpen)}>
                <span>{newQuestionType}</span>
                {dropdownOpen ? <ExpandLess /> : <ExpandMore />}
              </div>

              {dropdownOpen && <div id="customSelectDropdown">
                {["MULTIPLE", "TEXT"].map((type, i) => (
                  <div id="customSelectDropdownItem" key={i}
                    onClick={() => {
                      setNewQuestionType(type);
                      setDropDownOpen(false);
                    }}>
                    {type}
                  </div>
                ))}
              </div>}
            </div>

            {newQuestionType === "MULTIPLE" && <button
              onClick={addNewOption}>
              <span>Add Option</span>
              <Add />
            </button>}
          </div>

          {newQuestionType === "MULTIPLE" &&
            newQuestionOptions.map((option, i) => (
              <div key={option + i} id="questionOption">
                <input defaultValue={option} type="text" onChange={(e) => updateOption(e, i)}
                  placeholder="Enter text for this option..." />
                <button onClick={() => removeOption(i)}>
                  <DeleteOutline />
                </button>
              </div>
            ))}

          <button
            onClick={addNewQuestion} id="addQuestion">
            <span>Add Question</span>
            <Add />
          </button>
        </div>
      </section>

      <LoadingOverlayComp isLoading={isLoading} />

      <FooterComponent />
    </section>)
};

export default EmployeeFormPage;