import axios from 'axios';
import { useEffect, useState } from 'react';
import Listing from '../models/Listing';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './Spinner/LoadingSpinner';


// Using react-query gives auto retries, auto refresh, caching, 

const ListingsList = () => {
  const fetchListings = () => 
    axios 
        .get('https://nuvolagraph.staging.oregon.platform-os.com/api/all-listings.json')
        .then (res => res.data.models.results as Listing[])
    
  const {data: listings, error, isLoading} = useQuery<Listing[],Error>({
    queryKey: ['listings'],  // can be objects as well
    queryFn: fetchListings
  })


if (error) return <p>{error.message}</p>;


if (isLoading) return <><LoadingSpinner/></>
  return (
    <ul className="list-group">
      {listings?.map((listing: Listing) => (
        <li key={listing.id} className="list-group-item">
          {listing.properties.address}
        </li>
      ))}
    </ul>
  );
};

export default ListingsList;