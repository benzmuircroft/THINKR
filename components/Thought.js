import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';


function Thought({k/*App Int*/,markdown/*App prop*/,sThought/*App setState*/,hasModal/*App useRef*/, subject/*App useRef*/}) {

    
    
    function unThink(){
        let update=(JSON.parse(window.localStorage.getItem(subject.current)||'[]'));
        if(k>-1){
            update.splice(k,1);
            }
        window.localStorage.setItem(subject.current,JSON.stringify(update));
        sThought(update);
        }
    
    function sortUp(k){
        let update=(JSON.parse(window.localStorage.getItem(subject.current)||'[]'));
        let mv=update[k];
        update.splice(k,1);
        update.splice(k-1,0,mv);
        window.localStorage.setItem(subject.current,JSON.stringify(update));
        sThought(update);
        }

    function sortDown(k){
        let update=(JSON.parse(window.localStorage.getItem(subject.current)||'[]'));
        let mv=update[k];
        update.splice(k,1);
        update.splice(k+1,0,mv);
        window.localStorage.setItem(subject.current,JSON.stringify(update));
        sThought(update);
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
            <div className="opt e" onClick={()=>{hasModal.current.trigger({editing:k,openModal:true});}}>
                <i className="fa-solid fa-pencil"></i>
            </div>
        </div>
        );
    }

  export default Thought;