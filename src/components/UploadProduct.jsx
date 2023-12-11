import React, { useState } from 'react'
import { uploadImg } from '../api/imgupload';
import { addProducts } from '../api/firebase';

function UploadProduct() { //async : 통신할 때 사용.
    const [file, setFile] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [success,setSuccess] = useState(null);
    const [error,setError]= useState(null);

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
            await addProducts(product,url)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='container'>
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
                
            </form>
        </div>
    )
}

export default UploadProduct
