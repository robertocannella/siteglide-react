import axios from 'axios';
import Listing from '../models/Listing';
import { useQuery } from '@tanstack/react-query';
import { RecordsData } from '../models/RecordsData';



const usePropertyTypes = () => {

    const fetchPropertyTypes = () => 
        axios
        .get('https://rcfilter.staging.oregon.platform-os.com/api/property-types.json')
        .then (res => {
            
            return  res.data.records.results
        
        })

    
    // Using react-query gives auto retries, auto refresh, caching, 
    return useQuery<RecordsData[],Error>({
        queryKey: ['propertyTypes'],  // can be objects as well
        queryFn: fetchPropertyTypes
      })
}
export default usePropertyTypes