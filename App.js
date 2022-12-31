import './App.css';
import React, {useState,useRef,useReducer} from 'react';
import Navbar from './components/Navbar.js';
import Thought from './components/Thought.js';





const reducer=function(state,action){
    return action;
};

if(!window.localStorage.getItem('folders')){
    window.localStorage.setItem('folders',JSON.stringify(['Thoughts','Work','Reminders']));
}   











function App(){
    const [navEdit,setNavEdit]=useState(false);
    const subjectRef=useRef(window.localStorage.getItem('isSubject')||'thoughts');
    const folderRef=useRef(null);
    const resumeRef=useRef(null);
    const [modal,setModal]=useReducer(reducer,{
        editing:-1,
        open:false,
        });
    const [thought,setThought]=useState(()=>{
        return JSON.parse(window.localStorage.getItem(subjectRef.current)||'[]');
    });
    let t=thought.map((v,i)=>{
        return (
            <Thought 
            key={i} 
            k={i} 
            markdown={v} 
            setThought={setThought} 
            setModal={setModal} 
            subjectRef={subjectRef}
            navEdit={navEdit}
            folderRef={folderRef}
            resumeRef={resumeRef}
            />
        );
    });
    const [theme,setTheme]=useState(window.localStorage.getItem('theme')||'light');
    const toggleTheme=()=>{
        if(theme==='light'){
            setTheme('dark');
            window.localStorage.setItem('theme','dark');
            document.getElementsByTagName('html')[0].style['color-scheme']='dark';
            }
        else{
            setTheme('light');
            window.localStorage.setItem('theme','light');
            document.getElementsByTagName('html')[0].style['color-scheme']='light';
            }
        return;
        };
    document.getElementsByTagName('html')[0].style['color-scheme']=theme;
    return (
        <div className="App" id={theme}>
            <Navbar 
            theme={theme} 
            toggleTheme={toggleTheme} 
            subjectRef={subjectRef} 
            setThought={setThought} 
            modal={modal} 
            setModal={setModal} 
            navEdit={navEdit} 
            setNavEdit={setNavEdit}
            folderRef={folderRef}
            resumeRef={resumeRef}
            />
            <header className="App-thoughts">
                {t}
            </header>
        </div>
        );
    }

export default App;
