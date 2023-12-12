import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

function ProductDetail() {
    const state=useLocation().state; //useLocation : Navigate로 받아온거
    const {id,image,price,option,colors,discription,category,title} =state; //파라미터값으로 넘어오기
    const setOpt=option.split(',').map((option)=>option.trim());
    const [selected,setSelected]=useState(setOpt&&setOpt[0]);
    console.log(selected);
    const selectOpt = (e)=>{
        console.log(selected);
        setSelected(e.target.value);
        
    }
    return (
        <div className='container'>
            <DetailPage>
                <div className='detailImg'>
                    <img src={image} alt={title}/>
                </div>
                <div className='detailText'>
                    <h3>{title}</h3>
                    <p className='price'>
                        가격 : <span>{price}</span>
                    </p>
                    <p className='discription'>
                        설명 : <span>{discription}</span>
                    </p>
                    <div className='detailOpt'>
                        {/* 리액트에선 label에서 for 대신 htmlfor사용 */}
                        {/* <label className='labelText' htmlFor='optSelect'>옵션</label> */}
                        <select id='optSelect' onChange={selectOpt} value={selected}>
                            {setOpt&&setOpt.map((option,index)=>(
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    
                </div>
            </DetailPage>
        </div>
    )
}

export default ProductDetail

const DetailPage=styled.div`
    width:100%;
    display:flex;
    gap:40px;
    .detailImg{
        max-width:400px;
        img{
            width:100%;
            display:block;
        }
    }
    .detailText{
        display:flex;
        flex-direction:column;
        gap:20px;
        width:100%;
        h3{
            font-size:24px;
            width:100%;
            font-weight:normal;
            border-bottom:solid 1px rgba(0,0,0,0.1);
            padding-bottom:20px;
        }
        .price{
            display:flex;
            align-items:center;
            gap:20px;
        }
    }
`
