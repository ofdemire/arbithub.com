import React from 'react';
import Button from './../../../components/forms/Button';


const Product = ({
    productThumbnail, 
    productName, 
    productPrice,
    productLink

}) => {

    if (!productThumbnail || !productName || typeof productPrice === 'undefined') return null;

    const configAddToCartBtn = {
        type: 'button'
    };
    
    return (
        <div className="product">

            <div className="thumb">
                <img src={productThumbnail} alt={productName} />
            </div>

            <div className="details">
                <ul>
                    <li>
                        <span className="name">
                            <a src = {productLink}>
                                {productName}
                            </a>
                        </span>
                    </li>
                    <li>
                        <span className="price">
                        ${productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn}>
                                Add to cart
                            </Button>
                        </div>
                    </li>
                </ul>
            </div> 
        </div>

    );
};

export default Product;