import React, { useEffect, useState } from 'react';
import './Cards.css';
import { useHistory } from 'react-router';
import duckytwo from '../assets/img/duckytwo.png';
import icon from '../assets/img/icon.png';
import { db } from '../firebase';


function Cards() {
  const historyCards = useHistory();
  const [notes, setNotes] = useState([])

  const historyViewNotes = () => {
    historyCards.push('/CardEdit')

  }
  const gNotes = async () => {
    db.collection('newNotes').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setNotes(docs);
    });
  };

  const deleteNote = (id) => {
    db.collection('newNotes').doc(id).delete()
  }
  const noteDelete = async (id) => {
    if (window.confirm("¿Patito borra nota?")) {
      await db.collection('newNotes').doc(id).delete();
      console.log('ya borró')
    }
    //promesasd then catch
  };

  useEffect(() => {
    gNotes();
  }, []);



  return (
    <div className="pageNotes">
      <header className="headerW">
        <h1>UglyDucklingNotes</h1>
      </header>
      <div className="renderNotes">
        {notes.length > 0 ? notes.map(nota => (
          <div className="noti" key={nota.id}>
            <div className="noti-container" onClick={() => deleteNote(nota.id)}>
            </div>
          </div>
        )) : <p>No existen notas</p>}
      </div>


      <div className="btnsNotes">
        <div className="actionsNotes">
          <button
            onClick={historyViewNotes}
            className="buttonCreate"><img src={icon} width="100%" height="0%"></img> </button>
        </div>
        <footer className="imgDuck">
          <img src={duckytwo} width="100%" height="100%"></img>
        </footer>
      </div>
    </div>


  )
}
//esta pagina contiene el render de todas las notas
//componente de edit 
//prop ingresar text 
export default Cards;