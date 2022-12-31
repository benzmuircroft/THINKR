import React from 'react';
import logo from '../thinkr.png';
import Modal from './Modal';
import Folders from './Folders.js';


function Navbar({theme,toggleTheme,subjectRef,setThought,modal,setModal,navEdit,setNavEdit,folderRef,resumeRef}){
    function navEditor(){
        if(!navEdit){//start
            resumeRef.current=subjectRef.current+'';
            subjectRef.current='folders';
            setThought(JSON.parse(window.localStorage.getItem(subjectRef.current)||'[]'));
            setNavEdit(true);
        }
        else{//end
            subjectRef.current=resumeRef.current+'';
            resumeRef.current=null;
            setThought(JSON.parse(window.localStorage.getItem(subjectRef.current)||'[]'));
            setNavEdit(false);
        }
    }
    function switchSubject(ev){
        let s=!ev?subjectRef.current:(ev.target.innerText.toLowerCase().replace(' ',''));
        if(s!==subjectRef.current||!ev){
            let these=document.getElementsByClassName('subject');
            for(let i=0;i<these.length;i+=1){
                these[i].classList.remove('isSuject');
                if(these[i].innerText===ev.target.innerText){
                    these[i].classList.add='isSubject';
                }
            }
            subjectRef.current=s;
            window.localStorage.setItem('isSubject',s);
            setThought(JSON.parse(window.localStorage.getItem(s)||'[]'));
        }
    }
    return (
        <>
            {modal.open&&
            <Modal 
            modal={modal} 
            setModal={setModal} 
            setThought={setThought} 
            subjectRef={subjectRef} 
            navEdit={navEdit} 
            folderRef={folderRef} 
            resumeRef={resumeRef}/>}
            <div className="App-navbar">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="Navbar-settings">
                    <i 
                    className={(theme==='light'?"fa-solid fa-lightbulb":"fa-solid fa-lightbulb")+" setTheme setting"} 
                    title="Switch theme" 
                    onClick={toggleTheme}>
                    </i>
                    <i 
                    className="fa-solid fa-folder editFolders" 
                    style={{color:'#db9e5f'}} 
                    onClick={navEditor}>
                    </i>
                    <i 
                    className={"fa-solid fa-handshake-angle"+(navEdit?" dissabled":"")} 
                    style={{color:'#64e132'}}>
                    </i>
                    <i 
                    className={"fa-solid fa-share-nodes"+(navEdit?" dissabled":"")} 
                    style={{color:'#f79c13'}}>
                    </i>
                    <i 
                    className={"fa-solid fa-circle-info"+(navEdit?" dissabled":"")} 
                    style={{color:'#229ef9'}}>
                    </i>
                </div>
                <div className="Navbar-tools">
                    <div className="Sort">
                        <Folders 
                        navEdit={navEdit} 
                        subjectRef={subjectRef} 
                        switchSubject={switchSubject}
                        />
                    </div>
                    {
                        (!navEdit)?(
                            <button 
                            className="Btn Think" 
                            onClick={()=>{setModal({editing:-1,open:true});}}>
                                THINK
                            </button>
                        ):(
                            <button 
                            className="Btn Think" 
                            style={{backgroundColor:'#db9e5f'}} 
                            onClick={()=>{setModal({editing:-1,open:true});}}>
                                <i className="fa-solid fa-folder-plus" style={{marginRight:'5px'}}></i> 
                                NEW
                            </button>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Navbar;
