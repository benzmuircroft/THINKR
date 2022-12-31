function ModalTextbox({navEdit,element,onKeyPress,onKeyUp}){
    return (
        <>
            {
                (!navEdit)?(/* if */
                    <div className="modalMarkdown" ref={element} contentEditable="true" spellCheck="false" placeholder="Markdown text ..."></div>
                ):(
                    <input type="text" className="folderName" ref={element} onKeyPress={onKeyPress} onKeyUp={onKeyUp} spellCheck="false" placeholder="Folder name ..."/>
                )
            }
        </>
    )
}

export default ModalTextbox;
