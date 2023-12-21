import React, { useEffect,useState } from 'react'
import { getProducts } from '../api/firebase';
import Products from '../components/Products';
import styled from 'styled-components';

function AllProduct() {
    const [product,setProduct]=useState([]);
    useEffect(()=>{
        const fetchProducts = async()=>{
            try{
                const products = await getProducts()
                setProduct(products)
            }catch(error){
                console.error(error)
            }
        }
        fetchProducts()
    },[])
    return (
        <>
        <LogoWrapper>
        <h1 className='mainLogo'>Turtle Neck</h1>
        <p className='belowLogo'>등껍질처럼 편안한 옷 브랜드</p>
        </LogoWrapper>
        <div className='container'>
            {/* {product&&product.map(el=>(
                <div key={el.id}>
                    <img src={el.image}/>
                    <p>{el.title}</p>
                </div>
            ))} */}
            <Products products ={product} />
        </div>
        </>
    )
}

export default AllProduct

const LogoWrapper=styled.div`
    margin:20px 0px;
`
