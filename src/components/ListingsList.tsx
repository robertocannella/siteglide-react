import Listing from '../models/Listing';
import LoadingSpinner from './Spinner/LoadingSpinner';
import useListings from '../hooks/useListings';
import { useEffect, useState } from 'react';
import { cookieStorageManager } from '@chakra-ui/react';




const ListingsList = () => {


    const [searchTerm, setSearchTerm] = useState('');
    const {data: listings, error, isLoading} = useListings();

    const filteredData = listings?.filter(item =>{
            if (searchTerm == '')
                return listings
            else 
                return item.properties.category_array.includes(searchTerm)
         }

      );
    const handleSelectInputChange = (e:any) =>{
            setSearchTerm(e.target.value);
    }

    if (error) return <p>{error.message}</p>;

    if (isLoading) return <><LoadingSpinner/></>
    
    return (
        <>

<div className="full-row py-5 bg-gray">
  <div className="container">
    <form className="font-12 formicon text-ordinary">
      <div className="row g-3">
        <div className="col-md-4 col-lg-2">
          <div className="select-arrow">
            <select className="form-control form-select bg-white border" name="status">
              <option value="">Any Status</option>
              <option value="For Rent">For Rent</option>
              <option value="Short Term">Short Term</option>
              <option value="Pending">Pending..</option>
            </select>
          </div>
        </div>
        <div className="col-md-8 col-lg-7">
          <input
            type="text"
            className="form-control"
            id="validationDefault03"
            placeholder="Enter Address, Street and City or Enter State, Zip code"/>
        </div>

        <div className="select-arrow">
            <select 
                className="form-control form-select bg-white border" 
                name="propertyType" 
                id="selectPropertyType"
                onChange={handleSelectInputChange}
                >
              <option value="">Any Type</option>
                <option value="171" >
                  Single Family</option>
              
                <option value="172" >
                  Town House</option>
              
                <option value="173">
                  Condo</option>
              
                <option value="175">
                  Penthouse</option>
              
                <option value="174">
                  Apartment</option>
            </select>
          </div>

        <div className="col-md-4 col-lg-3">
          <input
            type="number"
            className="form-control"
            id="validationDefault04"
            placeholder="Min Area (sqft)"/>
        </div>
        <div className="col-md-4 col-lg-3">
          <input
            type="number"
            className="form-control"
            id="validationDefault05"
            placeholder="Max Area (sqft)"/>
        </div>
        <div className="col-md-8 col-lg-4">
          <div className="price-range">
            <div className="price-filter">
              <span className="price-slider">
                <input
                  className="filter-price"
                  type="text"
                  name="price"
                  value="1000;253000"
                  style={{display: "none"}}/><span className="jslider jslider_plastic">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <div className="jslider-bg">
                            <i className="l"></i>
                            <i className="f"></i>
                            <i className="r"></i>
                            <i className="v" style={{left: '0.1%', width: '25.2%'}}></i>
                          </div>
                          <div className="jslider-pointer" style={{left: '0.1%', zIndex: '0'}}></div>
                          <div className="jslider-pointer jslider-pointer-to" style={{left: '25.3%', zIndex: 2}}></div>
                          <div className="jslider-label" style={{display: 'none'}}>
                            <span>0</span>
                          </div>
                          <div className="jslider-label jslider-label-to">
                            <span>1000000</span>$</div>
                          <div className="jslider-value" style={{left: '0.1%', marginLeft: '-0.387594px', right: 'auto', visibility: 'visible'}}>
                            <span>1000</span>$</div>
                          <div className="jslider-value jslider-value-to" style={{visibility: 'visible', left: '25.3%', marginLeft: '-30.7578px', right: 'auto'}}>
                            <span>253000</span>$</div>
                          <div className="jslider-scale"></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>

          

            <ul className="list-group">
            {filteredData?.map((listing: Listing) => (
                <li key={listing.id} className="list-group-item">
                {listing.properties.address}
                </li>
            ))}
        </ul>
        </>

    );
};

export default ListingsList;