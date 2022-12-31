import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';


const Thought = React.memo(function Thought({k,markdown,setThought,setModal,subjectRef,navEdit,folderRef,resumeRef}) {
    function unThink(){
        let update=(JSON.parse(window.localStorage.getItem(subjectRef.current)||'[]'));
        let folderName;
        if(k>-1){
            if(navEdit){
                folderName=update[k].toLowerCase();
                window.localStorage.removeItem(folderName);
            }
            update.splice(k,1);
            }
        window.localStorage.setItem(subjectRef.current,JSON.stringify(update));
        if(navEdit){
            update=(JSON.parse(window.localStorage.getItem(subjectRef.current)||'[]'));
            if(resumeRef.current===folderName){
                if(update[0]){
                    resumeRef.current=update[0].toLowerCase();
                }
                else{//no more folders left
                    resumeRef.current=null;
                }
            }
        }
        setThought(update);
    }
    function onEdit(){
        if(navEdit){
            let folders=JSON.parse(window.localStorage.getItem('folders'));
            folderRef.current=folders[k];
        }
        setModal({editing:k,open:true});
    }
    function sortUp(k){
        let update=(JSON.parse(window.localStorage.getItem(subjectRef.current)||'[]'));
        let mv=update[k];
        update.splice(k,1);
        update.splice(k-1,0,mv);
        window.localStorage.setItem(subjectRef.current,JSON.stringify(update));
        setThought(update);
    }
    function sortDown(k){
        let update=(JSON.parse(window.localStorage.getItem(subjectRef.current)||'[]'));
        let mv=update[k];
        update.splice(k,1);
        update.splice(k+1,0,mv);
        window.localStorage.setItem(subjectRef.current,JSON.stringify(update));
        setThought(update);
    }
    let t=markdown;
    if(typeof t!='string'){t=JSON.stringify(t);}//just in case ...
    return (
        <div className="Thought">
            <div className="opt d" onClick={()=>sortDown(k)}>
                <i className="fa-solid fa-sort-down"></i>
            </div>
            <div className="opt u" onClick={()=>sortUp(k)}>
                <i className="fa-solid fa-sort-up"></i>
            </div>
            <ReactMarkdown
                children={t}
                rehypePlugins={[rehypeRaw]}
                components={{
                    code({node,inline,className,children,...props}){
                        const match=/language-(\w+)/.exec(className||'')
                        return (!inline && match)?(
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/,'')}
                            style={atomDark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        />
                        ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                        )
                    }
                }}
            />
            <div className="opt x" onClick={unThink}>
                <i className="fa-regular fa-circle-xmark"></i>
            </div>
            <div className="opt e" onClick={onEdit}>
                <i className="fa-solid fa-pencil"></i>
            </div>
        </div>
    );
});

  export default Thought;
