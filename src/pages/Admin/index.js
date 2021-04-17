import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, fetchProductsStart, deleteProductStart } from './../../redux/Products/products.actions';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import { useHistory, useParams } from 'react-router-dom';
import {Button} from './../../Button';
import Modal from './../../components/Modal';
import walmartLogo from "./../../assests/walmartLogo.png"
import amazonCALogo from "./../../assests/amazonCALogo.png"
import amazonUSLogo from "./../../assests/amazonUSLogo.png"
import ebayLogo from "./../../assests/ebayLogo.png"
import {FaArrowAltCircleRight} from 'react-icons/fa';
import LoadMore from './../../components/LoadMore';
import './styles.scss';

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


const Admin = props => {
  const { products } = useSelector(mapState);
  const { data, queryDoc, isLastPage } = products;
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [productThumbnail, setProductThumbnail] = useState('');

  const [buyLink, setBuyLink] = useState('');
  const [buyMarket, setBuyMarket] = useState('');
  const [buyPrice, setBuyPrice] = useState(0);

  const [sellLink, setSellLink] = useState('');
  const [sellMarket, setSellMarket] = useState('');
  const [sellRank, setSellRank] = useState('');
  const [sellPrice, setSellPrice] = useState(0);

  const history = useHistory();
  const { filterTypeBF, filterTypeST } = useParams();


  useEffect(() => {
    dispatch(
      fetchProductsStart({ filterTypeBF, filterTypeST })
    );

  }, [filterTypeBF, filterTypeST]);

  const handleFilterST = (e) => {
    const nextFilter = e.target.value;

    var filter = "/admin/" + filterTypeBF + "/" + nextFilter;      
    history.push(filter);

  };

  const handleFilterBF = (e) => {
    const nextFilter = e.target.value;
    var filter = "";
    if ( (nextFilter === "") && (filterTypeST === "undefined")){
      filter = "/admin";
    }
    else if(nextFilter === "") {
      filter = "/admin/undefined/" + filterTypeST
    }
    else{
      filter = "/admin/" + nextFilter + "/" + filterTypeST; 
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

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () =>{
    setHideModal(true);
    setSellRank('');
    setSellMarket('');
    setSellLink('');
    setBuyMarket('');
    setBuyLink('');
    setProductThumbnail('');
    setSellPrice(0);
    setBuyPrice(0);

  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   dispatch(
  //     addProductStart({
  //       productCategory,
  //       productName,
  //       productThumbnail,
  //       productPrice,
  //       productLink
  //     })
  //   );

  //   resetForm();
  // };

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

      {/* <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>
              Add new product
            </Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>

        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>

            <h2 className="addProduct">
              Add new product
            </h2>

            <FormSelect
              label="Category"
              options={[{
                value: "mens",
                name: "Mens"
              }, {
                value: "womens",
                name: "Womens"
              }]}
              handleChange={e => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={e => setProductName(e.target.value)}
            />

            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              handleChange={e => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={e => setProductPrice(e.target.value)}
            />


            <Button type="submit">
              Add product
            </Button>

          </form>
        </div>
      </Modal> */}

      <div className="manageProductsAdmin">
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

                          <td class="productShowing">
                            <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                              Delete
                            </Button>
                          </td>
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
}

export default Admin;