import React from 'react';
import {useRef,useEffect} from 'react';


function Modal({hasModal/*App useRef*/,sThought/*App setState*/,subject/*App useRef*/}){
    
    const textBox=useRef();//used to add editing text to the modal
    
    function onEdit(){
        let t=document.getElementsByClassName('Modal-thought')[0].innerText;
        let update=(JSON.parse(window.localStorage.getItem(subject.current)||'[]'));
        update[hasModal.current.editing]=t;
        window.localStorage.setItem(subject.current,JSON.stringify(update));
        //map[hasModal.current.editing][1](+new Date());
        hasModal.current.trigger({editing:-1,openModal:false});
        sThought(update);
        }
        
    function onOk(){
        let t=document.getElementsByClassName('Modal-thought')[0].innerText;
        let update=(JSON.parse(window.localStorage.getItem(subject.current)||'[]'));
        update.unshift(t);
        window.localStorage.setItem(subject.current,JSON.stringify(update));
        hasModal.current.trigger({editing:-1,openModal:false});
        sThought(update);
        }

    useEffect(()=>{//runs after render
        if(hasModal.current.editing>-1){
            textBox.current.innerText=(JSON.parse(window.localStorage.getItem(subject.current)||'[]'))[hasModal.current.editing];
            }
        textBox.current.focus();
        });
        
    return (
        <div className="Modal-case">
            <div className="Modal-BG"></div>
            <div className="Modal-content">
                <div>Save Something:</div>
                <div className="Modal-thought" ref={textBox} contentEditable="true" placeholder="Markdown text ..."></div>
                <div className="Modal-footer">
                    <button className="Btn Cancel" onClick={()=>{hasModal.current.trigger({editing:-1,openModal:false});}}>Cancel</button>
                    {hasModal.current.editing<0 && <button className="Btn Ok" onClick={()=>{onOk()}}>Ok</button>}
                    {hasModal.current.editing>-1 && <button className="Btn Edit" onClick={()=>{onEdit()}}>Edit</button>}
                </div>
            </div>
        </div>
        );
    }

export default Modal;