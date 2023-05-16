import axios from 'axios';
import Listing from '../models/Listing';
import { useQuery } from '@tanstack/react-query';



const useListings = () => {

    const fetchListings = () => 
        axios
        .get('https://rcfilter.staging.oregon.platform-os.com/api/all-listings.json')
        .then (res => res.data.models.results as Listing[])

    // Using react-query gives auto retries, auto refresh, caching, 
    return useQuery<Listing[],Error>({
        queryKey: ['listings'],  // can be objects as well
        queryFn: fetchListings
      })
}
export default useListings