import './App.css';
import logo from './thinkr.png';
import Modal from './components/Modal';
import {useState} from 'react';
import { useReducer } from 'react';
import { useCallback } from 'react';
import Thought from './components/Thought';


var subject=window.localStorage.getItem('isSubject')||'thoughts';

const reducer = (state, action) => {
  return action;
};



function App() {
  const [hasModal, dispatchHasModal] = useReducer(reducer, {editing: -1, openModal: false,x:'a0'});
  //const [subject,setSubject]=useState('thoughts');
  const [thought,setThought] = useState(() => {
    return JSON.parse(window.localStorage.getItem(subject) || '[]');
  });

  
  function switchSubject(ev){
    let s=!ev?subject:ev.target.innerText.toLowerCase().replace(' ','');
    if(s!==subject||!ev){
      let these=document.getElementsByClassName('subject');
      for(let i=0;i<these.length;i+=1){
        these[i].classList.remove('isSuject');
        if(these[i].innerText==ev.target.innerText){
          these[i].classList.add='isSubject';
          }
        }
      subject=s;
      window.localStorage.setItem('isSubject',s);
      setThought(JSON.parse(window.localStorage.getItem(subject) || '[]'));
    }
  }
  /*
  const switchSubject = useCallback((s)=>{
    console.log(s);
    setSubject(s);
    setThought(JSON.parse(window.localStorage.getItem(subject) || '[]'));
    },[subject]);
    */

  let t=thought.map((v,i)=>{return <Thought key={i} k={i} condition={v} setThought={setThought} dispatchHasModal={dispatchHasModal} subject={subject}/>;});

  return (
    <div className="App">
      <div className="App-navbar">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Navbar-tools">
          <div className="Sort">
              <div className={"subject"+(subject=='thoughts'? " isSubject":"")} onClick={(ev)=>{switchSubject(ev);}}>
                <i className="fa-solid fa-brain"></i> Thoughts
              </div>
              <div className={"subject"+(subject=='work'? " isSubject":"")} onClick={(ev)=>{switchSubject(ev);}}>
                <i className="fa-solid fa-briefcase"></i> Work
              </div>
              <div className={"subject"+(subject=='reminders'? " isSubject":"")} onClick={(ev)=>{switchSubject(ev);}}>
                <i className="fa-solid fa-bell"></i> Reminders
              </div>
          </div>
          <button className="Btn Think" onClick={()=>{dispatchHasModal({editing:-1,openModal:true,x:'a1'});}}>THINK</button>
        </div>
      </div>
      <header className="App-thoughts">
        {t}
      </header>
      {hasModal.openModal && <Modal hasModal={hasModal} dispatchHasModal={dispatchHasModal} setThought={setThought} subject={subject}/>}
    </div>
  );
}

export default App;
