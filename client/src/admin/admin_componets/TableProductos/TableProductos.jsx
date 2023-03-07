import React, { useEffect, useState } from 'react';
import style from './TableProductos.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { searchComponent } from "../../../redux/actions/actions.js";
import {useDispatch} from "react-redux"
import url from "../../../utils/deploy_back.js";
import swal from "sweetalert2"
const TableLoaded = ({allComponents}) => {
    const [ setAllComponentes] = useState([])
    // const [showComponent, setShowComponent] = useState(false);
    // const [selectedComponent, setSelectedComponent] = useState(null)
    const handleRevoke = async (component) => {
        try {
          const { data } = await axios.delete(`${url}/components/${component._id}`);
          if (data.message === 'Component revoked successfully') {
            setAllComponentes((prevState) =>
              prevState.filter((item) => item._id !== component._id)
            );
          }
          swal.fire({
            title: 'Se elimino el producto con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timerProgressBar: 3000
          });
        } catch (error) {
            swal.fire({
                title: 'Error al eliminar el producto',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                timerProgressBar: 3000
              });
        }
      };

    
    return (
        <>
            <table className={style.card_table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Categoria</th>
                        <th>Marca</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr> 
                </thead>
                <tbody>
                    {
                        allComponents && allComponents?.map(component => {
                            return (
                                    <tr key={component._id}>
                                        <td>{component._id}</td>
                                        <td>{component.category}</td>
                                        <td>{component.maker}</td>
                                        <td>{component.name}</td>
                                        <td>{component.price}</td>
                                        <td>{component.quantityStock}</td>
                                        <td id={style.sectionButtons}>
                                            <div>
                                                <button>Ver</button>
                                                <button>Editar</button>
                                            </div>
                                            <button onClick={()=> handleRevoke(component)}>Revocar</button>
                                        </td>
                                    </tr>
                            )
                        })
                    }
                </tbody>
            </table> 
        </>
    )
}

const LoaderTableProducts = () => {
    // Acá iría el loadingComponent
    return (
        <div class={style.table}>
                <h1>LOADING....</h1>
        </div>
    )
}

const TableProductos = () => {

const [allComponents, setAllComponentes] = useState([])
// const [compName, setCompName]= useState([])
const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAllComponents =async()=>{
            const {data} = await axios.get(`${url}/components/`).catch(error => alert("Error en la tabla productos de admin al obtener la data"));
            if (data.length) {
                setAllComponentes(data)
                setLoading(false)
            }
        }
        getAllComponents()
    }, [])
//  const dispatch = useDispatch();
const searchComponentDos = (value) => {
    return axios.get(`${url}/components?name=${value}`)
    .then(res=>res.data)
    .catch(error=>console.log(error))
 };

//  const  handlerSubmit=(e) =>{
//     e.preventDefault();
//     dispatch(searchComponentDos(e))
// }
 const handleSearch = async (value) => {
     const data1 = await searchComponentDos(value);
    //  console.log(value)
    if(data1){
        const filterName= data1.map((e)=>({
            name: e.name,
            price: e.price,
            category: e.category,
            _id: e._id,
            maker: e.maker,
            quantityStock: e.quantityStock
        }))
        setAllComponentes(filterName)
        setLoading(false)
    }else {
        swal.fire({
            title: 'Error al encontrar el producto',
            text: "No existe ningun producto con ese nombre",
            icon: 'error',
            confirmButtonText: 'Aceptar',
            timerProgressBar: 3000
          })
    }
  };
  

  return (
    <div id={style.ProductsPanelContainer}>
        {
            loading ? <div class={style.loader}></div> : undefined
        }
            
        <div id={style.card}>
            <h1>
                Productos
            </h1>
            <p>
                Administre los productos de CompuShop
            </p>
        </div>
        <div className={style.card}>
            
            <div className={style.card_header}>
                <div>
                    <input onChange={(e)=>handleSearch(e.target.value)} placeholder='Search by name...' className={style.searchBar} ></input>
                </div>
                <div>
                    <Link  className={style.buttons} to={'/admin/products/add'}>Agregar Producto</Link>
                    <button  className={style.buttons}>Mostrar Inactivos</button>
                </div>
            </div>
        <div className={style.card_body}>
            {
                loading
                ? (
                        <LoaderTableProducts/>
                ) 
                : (
                        <TableLoaded allComponents={allComponents}/>
                )
            }
        </div>
        <div className={style.card_footer}>
            <p>Compu Shop Management</p>
        </div>
        </div>
    </div>
  )
}

export default TableProductos