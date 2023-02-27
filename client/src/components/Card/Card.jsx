import React from 'react'
import { Link } from 'react-router-dom';
import style from './Card.module.css'
import { useSelector } from 'react-redux';



const Card = ({ id, name, img, price }) => {

    const stateViewCard = useSelector(e=>e.stateViewCard)

    const cleanName =(name) =>{
        let nameCleaned = name;
        if (nameCleaned.length < 65) return nameCleaned
        else return nameCleaned.substring(0, 65) + "..." 
        
    }

    const cleanName2 = (name) =>{
        let nameCleaned = name;
        if (nameCleaned.length < 128) return nameCleaned
        else return nameCleaned.substring(0, 128) + "..." 
    }


    if(stateViewCard){
        return (
            <Link to={`/producto/${id}`} id={style.Card }>
                  <div>
                      <div >
                           <img  src={img} alt={'Imagen de ' + name} />
                      </div>
                      <h1 >{cleanName(name)}</h1>
                  </div>
                  <div>
                      <h1 >$ {price}</h1>
                      <button>SUMAR AL CARRITO</button>
                  </div>
      
            </Link>
          );
    }else{
        return (
            <Link to={`/producto/${id}`} id={style.Card2 }>
                  <div>
                    <img  src={img} alt={name} />
                  </div>
                  <div>
                      <h2 >{cleanName2(name)}</h2>
                      <h1 >$ {price}</h1>
                      <button>SUMAR AL CARRITO</button>
                  </div>
      
            </Link>
          );
    }
   
};

export default Card