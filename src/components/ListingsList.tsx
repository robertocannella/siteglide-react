import Listing from '../models/Listing';
import LoadingSpinner from './Spinner/LoadingSpinner';
import useListings from '../hooks/useListings';
import { useEffect, useState } from 'react';
import { cookieStorageManager } from '@chakra-ui/react';




const ListingsList = () => {


    const [searchTerm, setSearchTerm] = useState('');
    const {data: listings, error, isLoading} = useListings();

    const filteredData = listings?.filter(item =>{
            console.log(searchTerm)
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