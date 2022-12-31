function Folders({navEdit,subjectRef,switchSubject}){
    let f=JSON.parse(window.localStorage.getItem('folders')||'[]').map((v,i)=>{
        return (
            <div 
            className={"subject"+(subjectRef.current===v.toLowerCase()?" isSubject":"")+(navEdit?" dissabled":"")} 
            key={i} 
            k={i} 
            onClick={(ev)=>{switchSubject(ev);}}>
                <i className="fa-solid fa-folder"></i> {v}
            </div>);
        });
    return (
        <>
            {f}
        </>
    );
}

export default Folders;
