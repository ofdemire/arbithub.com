import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart } from './../../redux/Products/products.actions';
import { useHistory, useParams } from 'react-router-dom';
import walmartLogo from "./../../assests/walmartLogo.png"
import amazonCALogo from "./../../assests/amazonCALogo.png"
import amazonUSLogo from "./../../assests/amazonUSLogo.png"
import ebayLogo from "./../../assests/ebayLogo.png"
import {FaArrowAltCircleRight} from 'react-icons/fa';
import FormSelect from './../../components/forms/FormSelect';
import './styles.scss';
import LoadMore from './../../components/LoadMore';
import PreviousPage from '../../components/PreviousPage';
import PageNum from '../../components/PageNum';


const mapState = ({ productsData }) => ({
    products: productsData.products
});
  
const LogoImg = ({logoType, logoLink}) => {
    var logo = "";
  
    if (logoType === "amazon.ca") {
      logo = amazonCALogo;
    }
    else if(logoType === "amazon.com"){
      logo = amazonUSLogo;
    }
    else if(logoType === "walmart.com"){
      logo = walmartLogo;
    }
    else if(logoType === "ebay.com"){
      logo = ebayLogo
    }
  
    return (<a href={logoLink} target ="_blank"><img alt="logoImage" src={logo}/></a>)
};
  

const Products = props => {
    const dispatch = useDispatch();
    const { products } = useSelector(mapState);
    const history = useHistory();
    const { filterTypeBF, filterTypeST } = useParams();

    const { data, queryDoc, isLastPage } = products;
  
    useEffect(() => {
      dispatch(
        fetchProductsStart({ filterTypeBF, filterTypeST })
      );
  
    }, [filterTypeBF, filterTypeST]);

    const handleFilterST = (e) => {
      const nextFilter = e.target.value;

      var filter = "/products/" + filterTypeBF + "/" + nextFilter;      
      history.push(filter);

    };

    const handleFilterBF = (e) => {
      const nextFilter = e.target.value;
      var filter = "";
      if ( (nextFilter === "") && (filterTypeST === "undefined")){
        filter = "/products";
      }
      else if(nextFilter === "") {
        filter = "/products/undefined/" + filterTypeST
      }
      else{
        filter = "/products/" + nextFilter + "/" + filterTypeST; 
      }
      history.push(filter);
    };
    const configFiltersST = {
      defaultValue: filterTypeST,
      options: [{
        name: 'Show all',
        value: ''
      },{
        name: 'amazon.com',
        value: 'amazon.com'
      },{
        name: 'amazon.ca',
        value: 'amazon.ca'
      }],
      handleChange: handleFilterST,
      label: "Marketplace to sell : "
    };

    const configFiltersBF = {
      defaultValue: filterTypeBF,
      options: [{
        name: 'Show all',
        value: ''
      },{
        name: 'amazon.com',
        value: 'amazon.com'
      },{
        name: 'amazon.ca',
        value: 'amazon.ca'
      },{
        name: 'walmart.com',
        value: 'walmart.com'
      },{
        name: 'ebay.com',
        value: 'ebay.com'
      }
    ],
      handleChange: handleFilterBF,
      label: "Marketplace buy from : "
    };


    const handleLoadMore = () => {
      dispatch(
        fetchProductsStart({ 
          filterTypeBF, 
          filterTypeST, 
          startAfterDoc: queryDoc,
          persistProducts: data
        })
      );
    };



    const configLoadMore = {
      onLoadMoreEvt: handleLoadMore, 
    }

    if (!Array.isArray(data)) return null;

    if (data.length < 1){
      return (
        <div className="admin">
        <div className="manageProducts">
          <tr>
            <td class="productShowing">
              <FormSelect {...configFiltersBF} />
            </td>
            <td class="productShowing">
              <FormSelect {...configFiltersST} />
            </td>
          </tr>
            <p>
              No search results found.
            </p>
          </div>
          </div>

      );
    }
    
    return (
      <div className="admin">
        <div className="manageProducts">
          <tr>
            <td class="productShowing">
              <FormSelect {...configFiltersBF} />
            </td>
            <td class="productShowing">
              <FormSelect {...configFiltersST} />
            </td>
          </tr>
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td>
                  <table className="results" border="0" cellPadding="10" cellSpacing="0">
                    <tbody>
                      {data.map((product, index) => {
                        const {
                          productThumbnail,
                          buyLink,
                          buyMarket,
                          buyPrice,
                          sellLink,
                          sellMarket,
                          sellRank,
                          sellPrice,
                          documentID
                         } = product;
  
                        return(
                          <tr>
                            <div class="seperateLine">
                            <hr ></hr>
                            </div>
                          <tr>
                            <td class="productShowing">
                              <img alt="productImage" src={productThumbnail} />
                            </td>
                            <td class="productShowing">
                              <tr class="logoImage">
                                <td>
                                  <LogoImg logoType={buyMarket} logoLink={buyLink} />
                                </td>
                                <td>
                                  <p>Buy Price : {buyPrice} $</p>
                                </td>
                              </tr>
                            </td>
                            <td class="productShowing">
                              <FaArrowAltCircleRight size={70}/>
                            </td>
                            <td class="productShowing">
                              <tr class="logoImage">
                                <td>
                                  <LogoImg logoType={sellMarket} logoLink={sellLink} />
                                </td>
                                <td>
                                <td>
                                  <p>Sell Price : {sellPrice} $</p>
                                </td>
                                <td>
                                  <p>Sales Rank : {sellRank}</p>
                                </td>
                                </td>
                              </tr>
                            </td>
                          </tr>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="loadMore">
          {!isLastPage && (
            <LoadMore {...configLoadMore}/>
          )}
          </div>
          
        </div>
        
      </div>
    );

};

export default Products;