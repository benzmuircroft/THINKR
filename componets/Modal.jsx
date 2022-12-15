import React from 'react';
import {useRef,useEffect} from 'react';


function Modal({hasModal, dispatchHasModal, setThought, subject}){
    console.log('happens?');
    const focusRef = useRef();
    function onEdit(){
        let t=document.getElementsByClassName('Modal-thought')[0].innerText;
        let update=(JSON.parse(window.localStorage.getItem(subject)||'[]'));
        update[hasModal.editing]=t;
        window.localStorage.setItem(subject,JSON.stringify(update));
        dispatchHasModal({editing:-1,openModal:false,x:'m1'});
        setThought(update);
    }
    function onOk(){
        let t=document.getElementsByClassName('Modal-thought')[0].innerText;
        let update=(JSON.parse(window.localStorage.getItem(subject)||'[]'));
        update.unshift(t);
        window.localStorage.setItem(subject,JSON.stringify(update));
        dispatchHasModal({editing:-1,openModal:false,x:'m2'});
        setThought(update);
    }
    useEffect(()=>{// Runs after the first render() lifecycle
        if(hasModal.editing > -1){
            focusRef.current.innerText=(JSON.parse(window.localStorage.getItem(subject)||'[]'))[hasModal.editing];
        }
        focusRef.current.focus();
        },[]);//blank array
    return (
        <div className="Modal-case">
            <div className="Modal-BG"></div>
            <div className="Modal-content">
                <div>Save Something:</div>
                <div className="Modal-thought" ref={focusRef} contentEditable="true" placeholder="Links, Video or text ..."></div>
                <div className="Modal-footer">
                    <button className="Btn Cancel" onClick={()=>{dispatchHasModal({editing:-1,openModal:false,x:'m3'});}}>Cancel</button>
                    {hasModal.editing < 0 && <button className="Btn Ok" onClick={()=>{onOk()}}>Ok</button>}
                    {hasModal.editing > -1 && <button className="Btn Edit" onClick={()=>{onEdit()}}>Edit</button>}
                </div>
            </div>
        </div>
    );
}

export default Modal;
