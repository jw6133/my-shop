import React, { useEffect, useState } from 'react'
import { addReview, getReview } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import UserData from './UserData';
import styled from 'styled-components';

function ProductReview({productId}) {
    const [review,setReview]=useState([]);
    const [newReview,setNewReview]=useState('');

    useEffect(()=>{
        getReview(productId).then((review)=>{
            setReview(review)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[productId])

    const onSubmitReview=async()=>{
        try{
            const user = 'user';
            await addReview(productId,user,newReview);
            setNewReview('');
            getReview(productId).then(setReview)
        }catch(error){
            console.log(error);
        }
    }
    // const {data:reviews}=useQuery({
    //     queryKey:[`/review/${productId}`],
    //     queryFn:()=>getReview(productId),
    // })
    return (
        <div>
            <h3>후기</h3>
            <input type='text' value={newReview} onChange={(e)=>setNewReview(e.target.value)}/>
            <button onClick={onSubmitReview}>작성하기</button>
            <span className='reviewTitle'></span>
            <ReviewWrapper>
                {review&&review.map((el)=>(
                    <li>
                        <p>{el.text}</p>
                    </li>
                ))}
            </ReviewWrapper>
        </div>
    )
}

export default ProductReview

const ReviewWrapper = styled.ul`
    max-width:400px;
    border:solid 1px black;
    margin-top:10px;
    text-align:left;
    font-size:16px;
    display:flex;
    gap:10px;
    flex-direction:column;
`