function Thought({k, condition, setThought, dispatchHasModal, subject}) {

    function unThink(){
        let update=(JSON.parse(window.localStorage.getItem(subject)||'[]'));
        if(k > -1) {
            update.splice(k, 1);
          }
        window.localStorage.setItem(subject,JSON.stringify(update));
        setThought(update);
    }

    
    function sortUp(k){
        let update=(JSON.parse(window.localStorage.getItem(subject)||'[]'));
        let mv=update[k];
        update.splice(k,1);
        update.splice(k-1,0,mv);
        window.localStorage.setItem(subject,JSON.stringify(update));
        setThought(update);
    }

    function sortDown(k){
        let update=(JSON.parse(window.localStorage.getItem(subject)||'[]'));
        let mv=update[k];
        update.splice(k,1);
        update.splice(k+1,0,mv);
        window.localStorage.setItem(subject,JSON.stringify(update));
        setThought(update);
    }
    
    let t=condition;
    if(typeof t!='string'){t=JSON.stringify(t);}//just in case ...
    
    if(t.indexOf('https://www.youtube.com')!==-1){
        t=(t.split('watch?v=')[1]).split(' ')[0];
        t=<iframe width="560" height="316" src={`http://www.youtube.com/embed/${t}`} title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    }
    else if(t.indexOf('https://')!==-1){
        t='https://'+(t.split('https://')[1]).split(' ')[0];
        t=<a href={t} target="_blank">{t}</a>;
    }
    else if(t.indexOf('```')==0){
        t=t.replace('```\n','');
        t=<pre>{t}</pre>
        }

    return (
        <div className="Thought">
            <div className="opt d" onClick={()=>sortDown(k)}>
                <i className="fa-solid fa-sort-down"></i>
            </div>
            <div className="opt u" onClick={()=>sortUp(k)}>
                <i className="fa-solid fa-sort-up"></i>
            </div>
            {t}
            <div className="opt x" onClick={unThink}>
                <i className="fa-regular fa-circle-xmark"></i>
            </div>
            <div className="opt e" onClick={()=>{dispatchHasModal({editing:k,openModal:true,x:'t1'});}}>
                <i className="fa-solid fa-pencil"></i>
            </div>
        </div>
    );
    
  }

  export default Thought;
