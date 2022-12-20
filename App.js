import './App.css';
import Navbar from './components/Navbar.js';
import {useState,useRef} from 'react';
import Thought from './components/Thought';
import {createContext} from 'react';



function App(){

    const subject=useRef(window.localStorage.getItem('isSubject')||'thoughts');

    const hasModal=useRef({editing:-1,openModal:false,trigger:null});//navbar adds the function that gets triggered by navbar,modal,thought

    const [thought,sThought]=useState(()=>{
        return JSON.parse(window.localStorage.getItem(subject.current)||'[]');
        });

    let t=thought.map((v,i)=>{
        return <Thought key={i} k={i} markdown={v} sThought={sThought} hasModal={hasModal} subject={subject}/>;
        });

    const [theme,setTheme]=useState(window.localStorage.getItem('theme')||'light');
    
    const ThemeContext=createContext(theme);
    
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
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            <div className="App" id={theme}>
                <Navbar theme={theme} toggleTheme={toggleTheme} subject={subject} sThought={sThought} hasModal={hasModal}/>
                <header className="App-thoughts">
                    {t}
                </header>
            </div>
        </ThemeContext.Provider>
        );
    }

export default App;