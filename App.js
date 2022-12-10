import './App.css';
import logo from './thinkr.png';
import Modal from './components/Modal';
import {useState} from 'react';
import Thought from './components/Thought';





function App() {
  const [openModal,setOpenModal] = useState(false);
  const [editing,setEditing] = useState(-1);
  const [thought,setThought] = useState(() => {
    return JSON.parse(window.localStorage.getItem('thoughts') || '[]');
  });

  let t=thought.map((v,i)=>{return <Thought key={i} k={i} condition={v} setThought={setThought} setEditing={setEditing} setOpenModal={setOpenModal}/>;});

  return (
    <div className="App">
      <div className="App-navbar">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Navbar-tools">
          <div className="Sort">
              <div><i className="fa-solid fa-brain"></i> Thoughts</div>
              <div><i className="fa-solid fa-briefcase"></i> Work</div>
              <div><i className="fa-solid fa-bell"></i> Reminders</div>
          </div>
          <button className="Btn Think" onClick={()=>{setEditing(-1);setOpenModal(true)}}>THINK</button>
        </div>
      </div>
      <header className="App-thoughts">
        {t}
      </header>
      {openModal && <Modal setOpenModal={setOpenModal} setThought={setThought} editing={editing} setEditing={setEditing}/>}
    </div>
  );
}

export default App;
