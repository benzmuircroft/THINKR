import React from 'react';
import {useRef,useState,useEffect} from 'react';
import ModalTextbox from './ModalTextbox.js';
import ModalBtnApply from './ModalBtnApply.js';


function Modal({modal,setModal,setThought,subjectRef,navEdit,folderRef,resumeRef}){
    const element=useRef();//to add editing text to the modal & focus on it
    const [learn,setLearn]=useState(false);
    const [error,setError]=useState(false);
    function onApply(){
        let t;
        if(!navEdit){
            t=document.getElementsByClassName('modalMarkdown')[0].innerText;
        }
        else{
            t=document.getElementsByClassName('folderName')[0].value;
        }
        if(modal.editing>-1){//editing
            if(navEdit){//moving a folder to a new name
                if(folderRef.current.toLowerCase()===resumeRef.current){
                    resumeRef.current=t.toLowerCase();
                    }
                window.localStorage.setItem(t.toLowerCase(),window.localStorage.getItem(folderRef.current.toLowerCase()));
                window.localStorage.removeItem(folderRef.current.toLowerCase());
                folderRef.current=null;
                }
            let update=(JSON.parse(window.localStorage.getItem(subjectRef.current)||'[]'));
            update[modal.editing]=t;
            window.localStorage.setItem(subjectRef.current,JSON.stringify(update));
            setModal({editing:-1,open:false});
            setThought(update);
        }
        else if(modal.editing<0){//creating
            let update=(JSON.parse(window.localStorage.getItem(subjectRef.current)||'[]'));
            update.unshift(t);
            window.localStorage.setItem(subjectRef.current,JSON.stringify(update));
            setModal({editing:-1,open:false});
            setThought(update);
        }
        else{
            alert('nothing to do onApply');
        }
    }
    function onKeyPress(ev){
        if('abcdefghijklmnopqrstuvwxyz0123456789-'.indexOf(ev.key.toLowerCase())===-1){
            ev.preventDefault();
        }
    }
    function onKeyUp(ev){
        let t=document.getElementsByClassName('folderName')[0].value.toLowerCase();
        let folders=JSON.parse(window.localStorage.getItem('folders').toLowerCase());
        if([...folders,'folders','theme','isSubject'].indexOf(t)!==-1){
            if(error===false){setError(true);}
        }
        else{
            if(error===true){setError(false);}
        }
    }
    function onClickCancel(){
        folderRef.current=null;
        if(error===true){setError(false);}
        setModal({editing:-1,open:false});
    }
    useEffect(()=>{//runs after render
        if(!learn){
            if(modal.editing>-1){
                if(navEdit){
                    element.current.value=folderRef.current;
                }
                else{
                    element.current.innerText=(JSON.parse(window.localStorage.getItem(subjectRef.current)||'[]'))[modal.editing];
                }
            }
            element.current.focus();
        }
    });
    return (
        <div className="Modal-case">
            <div className="Modal-BG"></div>
            {learn?(
                <div className="Modal-content">
                    <div>How To Guide:</div>
                    <div className="modalMarkdown">
                        <h3>Headings</h3>
                        # H1 <i className="comment">(Largest)</i><br/>
                        ## H2 <i className="comment">(Medium)</i><br/>
                        ### H3 <i className="comment">(Smallest)</i><br/>
                        <br/>
                        <h3>Text</h3>
                        *italic text* <i className="comment">Example</i><br/>
                        **bold text** <b className="comment">Example</b><br/>
                        **bold and italic text** <i className="comment"><b>Example</b></i><br/>
                        ~~Strikethrough text~~ <del className="comment">Example</del><br/>
                        <br/>
                        <h3>Lists</h3>
                        1. Apples <i className="comment">(Ordered)</i><br/>
                        2. Bannanas<br/>
                        3. Pears<br/>
                        <br/>
                        - Apples <i className="comment">(Bullet points)</i><br/>
                        - Bannanas<br/>
                        - Pears<br/>
                        <br/>
                    </div>
                    <div className="Modal-footer">
                        <button className="Btn Back" onClick={()=>{setLearn(false);}}><i className="fa-solid fa-left-long"></i> Back</button>
                    </div>
                </div>
            ):(
                <div className={"Modal-content"+(error?" error":"")+(navEdit?" forinput":"")}>
                    <div>{!navEdit?"Save Something Using Markdown:":"Your Folder Name:"}</div>
                    <ModalTextbox navEdit={navEdit} element={element} onKeyPress={onKeyPress} onKeyUp={onKeyUp}/>
                    <div className="Modal-footer">
                        {!navEdit&&<button className="Btn MDGuide" onClick={()=>{setLearn(true)}}>Learn Markdown</button>}
                        <button 
                        className="Btn Cancel" 
                        onClick={onClickCancel}>
                            Cancel
                        </button>
                        <ModalBtnApply modal={modal} onApply={onApply}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
