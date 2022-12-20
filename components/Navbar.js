import React from 'react';
import logo from '../thinkr.png';
import Modal from './Modal';
import {useState} from 'react';



export default function Navbar({theme/*App useState*/,toggleTheme/*App function*/,subject/*App useRef*/,sThought/*App setState*/,hasModal/*App useRef*/}){

    const [showModal,rShowModal]=useState(false);//re-render watcher
    
    hasModal.current.trigger=(obj)=>{
        hasModal.current.editing=obj.editing;
        hasModal.current.openModal=obj.openModal;
        rShowModal(showModal=>(showModal?false:true));//cause navbar to re-render
        };
      
    function switchSubject(ev){
        let s=!ev?subject.current:(ev.target.innerText.toLowerCase().replace(' ',''));
        if(s!==subject.current||!ev){
            let these=document.getElementsByClassName('subject');
            for(let i=0;i<these.length;i+=1){
                these[i].classList.remove('isSuject');
                if(these[i].innerText===ev.target.innerText){
                    these[i].classList.add='isSubject';
                    }
                }
            subject.current=s;
            window.localStorage.setItem('isSubject',s);
            sThought(JSON.parse(window.localStorage.getItem(s)||'[]'));
            }
        }
    return (
        <>
            {hasModal.current.openModal&&<Modal hasModal={hasModal} sThought={sThought} subject={subject}/>}
            <div className="App-navbar">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="Navbar-settings">
                <i className={(theme==='light'?"fa-solid fa-lightbulb":"fa-solid fa-lightbulb")+" setTheme setting"} title="Switch theme" onClick={toggleTheme}></i>
            </div>
            <div className="Navbar-tools">
                <div className="Sort">
                    <div className={"subject"+(subject.current==='thoughts'? " isSubject":"")} onClick={(ev)=>{switchSubject(ev);}}>
                    <i className="fa-solid fa-brain"></i> Thoughts
                    </div>
                    <div className={"subject"+(subject.current==='work'? " isSubject":"")} onClick={(ev)=>{switchSubject(ev);}}>
                    <i className="fa-solid fa-briefcase"></i> Work
                    </div>
                    <div className={"subject"+(subject.current==='reminders'? " isSubject":"")} onClick={(ev)=>{switchSubject(ev);}}>
                    <i className="fa-solid fa-bell"></i> Reminders
                    </div>
                </div>
                <button className="Btn Think" onClick={()=>{hasModal.current.trigger({editing:-1,openModal:true});}}>THINK</button>
            </div>
            </div>
        </>
        )
    }