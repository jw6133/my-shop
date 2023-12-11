import React, { useRef, useState } from 'react'
import { uploadImg } from '../api/imgupload';
import { addProducts } from '../api/firebase';
import styled from 'styled-components';

function UploadProduct() { //async : 통신할 때 사용.
    const [file, setFile] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [success,setSuccess] = useState(null);
    const [error,setError]= useState(null);
    const fileref = useRef();

    const [product, setProduct] = useState({
        title: '',
        price: '',
        option : '',
        category : '',
        discription : '',
    })//모든 상품의 상태를 빈 문자열로 초기화

    const productInfoChange = (e)=>{
        const {name,value,files}=e.target;
        if(name === 'file' && files && files[0]){
            setFile(files[0])
        }else{
            setProduct((prev)=>({...prev,[name]:value}))
        }
    }

    const uploadSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = await uploadImg(file)
            await addProducts(product,url);
            setSuccess('업로드 완료!');
            setTimeout(()=>{
                setSuccess(null)
            },2000);
            setFile(null);
            setProduct({
                title: '',
                price: '',
                option : '',
                category : '',
                discription : '',
            })
            if (fileref.current){
                fileref.current.value='';
            }
        } catch (error) {
            console.error(error);
            setError('업로드 실패 :(');
        }finally{setIsLoading(false)}
    }

    return (
        <div className='container'>
            <FormContainer>
            <div className='imgUploadWrap'>
                {file && (
                    <img src={URL.createObjectURL(file)} />
                    //createobjceturl : url주소를 string형태로 변환

                )}

            </div>
            <form onSubmit={uploadSubmit}>
                <input type='file'
                name='file' 
                accept='image/*' 
                onChange={productInfoChange} 
                ref={fileref}
                />

                <input
                type='text'
                name='title'
                placeholder='상품명 입력'
                value={product.title}
                onChange={productInfoChange}
                />
                {/* 상품 제목 */}

                <input
                type='text'
                name='price'
                placeholder='상품 가격 입력'
                value={product.price}
                onChange={productInfoChange}
                />
                {/* 가격 */}

                <input
                type='text'
                name='category'
                placeholder='상품 분류'
                value={product.category}
                onChange={productInfoChange}
                />
                {/* 분류 */}              

                <input
                type='text'
                name='option'
                placeholder='상품 옵션을 ,로 구분해서 입력'
                value={product.option}
                onChange={productInfoChange}
                />
                {/* 상품 옵션 */}

                <input
                type='text'
                name='discription'
                placeholder='상품 설명 입력'
                value={product.description}
                onChange={productInfoChange}
                />
                {/* 상품 정보 */}

                <button disabled={isLoading}>{isLoading ? '업로드 중' : '제품 등록하기'}</button>
                {success && (
                    <p>{success}</p>
                )}
                {error && (
                    <p>{error}</p>
                )}
                {/* false조건이 필요없을 떄 : &&
                false true 둘다 필요할시 ? (삼항연산자) */}
            </form>
            </FormContainer>
        </div>
    )
}

export default UploadProduct

const FormContainer = styled.div`
    position: relative;
    max-width:1200px;
    padding:30px 0px;
    margin:0px auto;
    display:flex;
    gap:40px;
    .imgUploadWrap{
        display:flex;
        max-width:1000px;
        height:auto;
        gap:20px;
        img{
            display:block;
            height:100%;
        }
    }
    form{
        width:100%;
        display:flex;
        flex-direction:column;
        gap:20px;
        position:relative;
        right:0;
        input{
            width:100%;
            box-sizing:border-box;
            height:40px;
            border-radius:4px;
            border-color:rgba(0,0,0,0.2);
            padding:6px 12px;
        }
        button{
            margin-top:auto;
            height:50px;
            border-radius:4px;
            background:rgba(255,183,245,0.5);
            border:none;
            transition:500ms;
            &:hover{
                background:rgba(255,183,245,1);
            }
        }
    }
`