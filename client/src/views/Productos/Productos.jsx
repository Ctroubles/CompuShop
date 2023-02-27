import style from './Productos.module.css';
import Sidebar from '../../components/SideBar/SideBar.jsx';
import Order from "../../components/Order/Order.jsx"
import ContainerCards from "../../components/CardContainer/ContainerCards.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllComponents,deleteFilterCategory } from '../../redux/actions/actions.js';
import Paginated from '../../components/Paginated/Paginated';
// const productos = [
//     {
//         id: 1,
//         name: 'Memoria GeiL DDR4 16GB 3000MHz Super Luce RGB Black',
//         image: 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_31776_Memoria_GeiL_DDR4_16GB_3000MHz_Super_Luce_RGB_Black_646b61f7-grn.jpg',
//         precio: 35650
//     },
//     {
//         id: 2,
//         name: 'Gabinete Kolink Void Black ARGB ATX Vidrio Templado',
//         image: 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_20250_Gabinete_Kolink_Void_Black_ARGB_ATX_Vidrio_Templado_f962dc11-grn.jpg',
//         precio: 23150
//     },
//     {
//         id: 3,
//         name: 'Gabinete ASUS ROG STRIX Helios Aluminum Black RGB',
//         image: 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_21594_Gabinete_ASUS_ROG_STRIX_Helios_Aluminum_Black_RGB_81c9ec14-grn.jpg',
//         precio: 133020
//     },
//     {
//         id: 4,
//         name: 'Gabinete Be Quiet! DARK BASE PRO 900 Black Rev 2',
//         image: 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_23033_Gabinete_Be_Quiet__DARK_BASE_PRO_900_Black_Rev_2_56f4864c-grn.jpg',
//         precio: 98750
//     }
// ]

const Products = ()=>{

    const dispatch = useDispatch();

    const { paginated } = useSelector(store => store)
    const categoryPick = useSelector(s=>s.categoryPick)


    useEffect(() => {
        
        if(!categoryPick) dispatch(getAllComponents())
        // console.log("Rednders demás");
      }, [])
    
//// OJO con que si ponemos en el array de dependencias a 'paginated', se genera un loop de rerenders

    return(
        <div id={style.Container}>
            <div id={style.productsContainer}>
                <aside>
                    <Sidebar/>
                </aside>
                <section>
                    <Order/>
                    {categoryPick && <div id={style.categoryPick}><h2>{categoryPick}</h2> <h3 onClick={()=>{ dispatch(getAllComponents()); dispatch(deleteFilterCategory())}}>X</h3></div>}

                    <ContainerCards listArray={paginated}/>
                    <Paginated/>
                </section>
            </div>
        </div>
        
        
    )
};

export default Products;