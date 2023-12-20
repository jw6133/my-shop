import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


function TopBtn() {
    const [scrollRule,setScrollRule]=useState(false);

    const toggleVisible=()=>{
        //스크롤값이 200보다 많을 시 커서 생성 아닐 시 안보이게
        //상태변수 : usestate
        if(window.scrollY>500){
            setScrollRule(true)
        }
        else{
            setScrollRule(false)
        }

    }

    useEffect(()=>{
        window.addEventListener('scroll',toggleVisible);
        return()=>{
            window.removeEventListener('scroll',toggleVisible)
        }
    },[window.scrollY])

    const onScrollTop =()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
            
        })
        // console.log(window.scrollY);
    }

    return (
        scrollRule&&(
        <Top onClick={onScrollTop} >Top</Top>)
    )
}

export default TopBtn

const Top = styled.button`
    border-radius:100%;
    position:fixed;
    bottom:30px;
    right:30px;
    width:50px;
    height:50px;
    background:black;
    color:#fff;
    font-weight:bold;
`
