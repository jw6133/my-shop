import React from 'react'
import propTypes from 'prop-types';

function SortButton({sortPrice,sortName}) {
    return (
        <>
        <button onClick={sortName}>이름순</button>
        <button onClick={sortPrice}>가격순</button>
        </>
    )
}
SortButton.propTypes = {
    sortName : propTypes.func.isRequired,
    sortPrice : propTypes.func.isRequired,
}
export default SortButton
