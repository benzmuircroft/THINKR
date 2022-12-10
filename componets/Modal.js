import React from 'react';
import {useRef,useEffect} from 'react';


function Modal({setOpenModal, setThought, editing, setEditing}){
    const focusRef = useRef();
    function onEdit(){
        setOpenModal(false);
        let t=document.getElementsByClassName('Modal-thought')[0].innerText;
        let update=(JSON.parse(window.localStorage.getItem('thoughts')||'[]'));
        update[editing]=t;
        window.localStorage.setItem('thoughts',JSON.stringify(update));
        setEditing(-1);
        setThought(update);
    }
    function onOk(){
        setOpenModal(false);
        let t=document.getElementsByClassName('Modal-thought')[0].innerText;
        let update=(JSON.parse(window.localStorage.getItem('thoughts')||'[]'));
        update.unshift(t);
        window.localStorage.setItem('thoughts',JSON.stringify(update));
        setThought(update);
    }
    useEffect(()=>{// Runs after the first render() lifecycle
        if(editing > -1){
            focusRef.current.innerText=(JSON.parse(window.localStorage.getItem('thoughts')||'[]'))[editing];
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
                    <button className="Btn Cancel" onClick={()=>{setOpenModal(false)}}>Cancel</button>
                    {editing < 0 && <button className="Btn Ok" onClick={()=>{onOk()}}>Ok</button>}
                    {editing > -1 && <button className="Btn Edit" onClick={()=>{onEdit()}}>Edit</button>}
                </div>
            </div>
        </div>
    );
}

export default Modal;
