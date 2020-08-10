import React, { useState, useEffect } from 'react';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles'

import Header from './components/Header';
import Footer from './components/Footer';

import './App.css'

function App() {
  const [pontosX, setPontosX] = useState(0);
  const [pontosO, setPontosO] = useState(0);
  
  const [a1, setA1] = useState(null);
  const [a2, setA2] = useState(null);
  const [a3, setA3] = useState(null);
  
  const [b1, setB1] = useState(null);
  const [b2, setB2] = useState(null);
  const [b3, setB3] = useState(null);
  
  const [c1, setC1] = useState(null);
  const [c2, setC2] = useState(null);
  const [c3, setC3] = useState(null);
  
  const [atualCtx, setAtualCtx] = useState(false);
  const [ganhou, setGanhou] = useState(false)
  
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      fontFamily: 'Antic Slab',
      backgroundColor: '#ffbe0b',
      border: '0px solid #000',      // boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      justifyContent: 'center',
      borderRadius: '8px',
      outline: '0px auto white',
      outlineOffset: '0px',
    },
  }));
  
  function verificaGanhou() {
    if (a1 === a2 && a2 === a3 && a1 !== null){
      setGanhou(a1);
      a1 === 'x' ? setPontosX(pontosX+1) : setPontosO(pontosO+1);
    }
    
    if (b1 === b2 && b2 === b3 && b1 !== null){
      setGanhou(b1);
      b1 === 'x' ? setPontosX(pontosX+1) : setPontosO(pontosO+1);
    }
    
    if (c1 === c2 && c2 === c3 && c1 !== null){
      c1 === 'x' ? setPontosX(pontosX+1) : setPontosO(pontosO+1);
      setGanhou(c1);
    }
    
    if (a1 === b1 && b1 === c1 && a1 !== null){
      a1 === 'x' ? setPontosX(pontosX+1) : setPontosO(pontosO+1);
      setGanhou(a1);
    }
    
    if (a2 === b2 && b2 === c2 && a2 !== null){
      a2 === 'x' ? setPontosX(pontosX+1) : setPontosO(pontosO+1);
      setGanhou(a2);
    }
    
    if (a3 === b3 && b3 === c3 && a3 !== null){
      a3 === 'x' ? setPontosX(pontosX+1) : setPontosO(pontosO+1);
      setGanhou(a3);
    }
    
    if (a1 === b2 && b2 === c3 && a1 !== null){
      a1 === 'x' ? setPontosX(pontosX+1) : setPontosO(pontosO+1);
      setGanhou(a1);
    }
    
    if (a3 === b2 && b2 === c1 && a3 !== null){
      a3 === 'x' ? setPontosX(pontosX+1) : setPontosO(pontosO+1);
      setGanhou(a3);
    }

    if (a1 !== null && a2 !== null && a3 !== null){
      if(b1 !== null && b2 !== null && b3 !== null){
        if(c1 !== null && c2 !== null && c3 !== null)
        setGanhou('opss, ninguem ganhou, houve um empate kkk');
      }
    }
  }
  
  function reset() {
    setA1(null);
    setA2(null);
    setA3(null);
    setB1(null);
    setB2(null);
    setB3(null);
    setA3(null);
    setC1(null);
    setC2(null);
    setC3(null);
  }
  
  useEffect(() => {
    verificaGanhou();
  },[a1, a2, a3, b1, b2, b3, c1, c2, c3])
  
  function handleToggleXO(func, valueBlock) {
    if(valueBlock === null && !ganhou){
      setAtualCtx(!atualCtx);
      atualCtx ? func('x') : func('o');
    } 
  };
  
  function handleClose() {
    reset();
    setGanhou(false);
  }

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  
  return (
    <div className="container">
      <Header/>
      <div className="main">
        <div className="pontos-x">X: {pontosX}</div>
        <div className="pontos-o">O: {pontosO}</div>

        <div className="game-container">
          <Modal 
            open={ganhou}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            
            <div style={modalStyle} className={classes.paper} >
               Ganhador do round: '{ganhou}'
              <p id="simple-modal-description">
                Aperte fora da tela para começar novamente.
              </p>
            </div>
          </Modal>

          <button onClick={() => handleToggleXO(setA1, a1)} ><div className="block"> {a1} </div></button>
          <button onClick={() => handleToggleXO(setA2, a2)} ><div className="block"> {a2} </div></button>
          <button onClick={() => handleToggleXO(setA3, a3)} ><div className="block"> {a3} </div></button>

          <button onClick={() => handleToggleXO(setB1, b1)} ><div className="block"> {b1} </div></button>
          <button onClick={() => handleToggleXO(setB2, b2)} ><div className="block"> {b2} </div></button>
          <button onClick={() => handleToggleXO(setB3, b3)} ><div className="block"> {b3} </div></button>

          <button onClick={() => handleToggleXO(setC1, c1)} ><div className="block"> {c1} </div></button>
          <button onClick={() => handleToggleXO(setC2, c2)} ><div className="block"> {c2} </div></button>
          <button onClick={() => handleToggleXO(setC3, c3)} ><div className="block"> {c3} </div></button>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
