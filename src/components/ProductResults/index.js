import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Products from '../../pages/Products';
import { fetchProductsStart } from './../../redux/Products/products.actions';
import Product from './Product';
import LoadMore from './../LoadMore';
import './styles.scss';


const mapState = ({ productsData}) => ({
    products: productsData.products
});

const ProductResults = ({}) => {
    const dispatch = useDispatch();
    const { products } = useSelector(mapState);

    useEffect(() => {
        dispatch(
            fetchProductsStart()
        )

    }, []);


    if (!Array.isArray(products)) return null;

    if (products.length < 1){
        return (
            <div className="products">
                <p>
                    No search results.
                </p>
            </div>
        );
    }

    return (
        <div className="products">

            <h1>
                Browse Products
            </h1>

            <div className="productResults">

            {products.map((product, pos) => {
                console.log(product)
                
                const {productThumbnail, productName, productPrice, productLink } = product;

                if (!productThumbnail || !productName || typeof productPrice === 'undefined') return null;

                  const configProduct = {
                    productThumbnail, 
                    productName, 
                    productPrice,
                    productLink
                };

                 return (
                      <Product {...configProduct}/>

                    );
                })}  
            </div>
        </div>
    );
};

export default ProductResults;