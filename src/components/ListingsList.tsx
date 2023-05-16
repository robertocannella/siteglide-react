import Listing from '../models/Listing';
import LoadingSpinner from './Spinner/LoadingSpinner';
import useListings from '../hooks/useListings';
import {useEffect, useState } from 'react';
import { Box, BoxProps, Paper, Slider } from '@material-ui/core';
import usePropertyTypes from '../hooks/usePropertyTypes';




const ListingsList = () => {
    const [data, setData] = useState<any[]>([]);


   // const [propertyTypes, setPropertyTypes] = useState<any[]>([]);
    const [status, setStatus] = useState<any[]>([]);
    const [filters, setFilters] = useState({
        searchTerm: '',
        propertyType: '',
        minPrice: 0,
        maxPrice: Infinity,
        status: '',
        minSquareFootage: 0,
        maxSquareFootage: Infinity,
      });
    const {data: listings, error, isLoading} = useListings();
    const {data: propertyTypes, error: errorPropertyTypes, isLoading: isLoadingPropertyTypes} = usePropertyTypes();
    const [filterData, setFilteredData] = useState<Listing[]>([])
    const [matValue, setMatValue] = useState<number[]>([0, 5000]);


    useEffect(()=>{

        // This populates the Status Options Table (Needs GraphQL API Endpoint)
        let allStatuses = new Set();
        listings?.forEach(item => {
            item.properties.webapp_field_3_1.forEach(status => {
                allStatuses.add(status)
            })

        })
        setStatus(Array.from(allStatuses));


        // Sets the default filtered data
        setFilteredData(listings!)
        
        fetchData();


    },[listings, filters])

    async function fetchData() {
   
    
       // Filter the data based on the current filter state
        const filteredData = listings?.filter((item:Listing) => {
          return (
            (item.properties.category_array[0] === filters.propertyType || filters.propertyType === '') &&
            (item.properties.webapp_field_3_2 >= filters.minSquareFootage && item.properties.webapp_field_3_2 <= filters.maxSquareFootage) &&
            (item.properties.webapp_field_3_3 >= filters.minPrice && item.properties.webapp_field_3_3 <= filters.maxPrice) &&
            (item.properties.webapp_field_3_1.includes(filters.status) || filters.status === '') && 
            (item.properties.address.toLowerCase().includes(filters.searchTerm.toLowerCase()) || filters.searchTerm === '')
          );
        });

    
        setData(filteredData ? filteredData : []);
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
                            <select 
                            className="form-control form-select bg-white border" 
                            name="status"
                            onChange={(event) => setFilters((prevFilters) => ({...prevFilters, status: event.target.value}))}
                            >
                            <option value="">Any Status</option>
                                {status.map((item, index )=>{
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        </div>
                        <div className="col-md-8 col-lg-7">
                        <input
                            type="text"
                            className="form-control"
                            id="validationDefault03"
                            placeholder="Enter Address, Street and City or Enter State, Zip code"
                            onChange={(event)=>setFilters((prevFilters) => ({...prevFilters, searchTerm: event.target.value }))}
                            
                            />
                        </div>

                        <div className="select-arrow">
                            <select 
                                className="form-control form-select bg-white border" 
                                name="propertyType" 
                                id="selectPropertyType"
                                onChange={(event) => setFilters((prevFilters) => ({...prevFilters, propertyType: event.target.value}))}
                                >

                            <option value="">Any Type</option>
        
                                {propertyTypes?.map(item =>{
                                    return (
                                        <option key={item.id} value={item.id}>{item.properties.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <hr></hr>
                        <Box style={{ width: '200px' }} >
                            <p>Price Range</p>
                                <Slider
                                    
                                    getAriaLabel={() => 'Price range'}
                                    value={matValue}
                                    onChange={(event, value:any) => {setFilters((prevFilters) => ({...prevFilters, minPrice: value[0], maxPrice: value[1] })); setMatValue(value as number[])}}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={undefined}
                                    step={100}
                                    min={0}
                                    max={5000}
                                />
                        </Box>

                        <hr></hr>
                        <p>Square Ft</p>
                     
                        <div className="col-md-4 col-lg-3">
                            <input
                                type="number"
                                className="form-control"
                                id="validationDefault04"
                                placeholder="Min Area (sqft)"
                                onChange={(event) => setFilters((prevFilters) => ({...prevFilters, minSquareFootage: parseInt(event.target.value)}))}

                                />
                            </div>
                        <div className="col-md-4 col-lg-3">
                            <input
                                type="number"
                                className="form-control"
                                id="validationDefault05"
                                placeholder="Max Area (sqft)"
                                onChange={(event) => setFilters((prevFilters) => ({...prevFilters, maxSquareFootage: parseInt(event.target.value)}))}
                                />
                            </div>
               
                    </div>
                    </form>
                </div>
                </div>

          <h1>Results</h1>

            <ul className="list-group">
            {!data.length ? <div>No Results. Please update search filter.</div> : <div></div>}
            {data?.map((listing: Listing) => (
                <li key={listing.id} className="list-group-item">
                {listing.properties.address}  | {/* Type */} {/*listing.properties.category_array[0] /*} | {/* PRICE RANGE */} ${listing.properties.webapp_field_3_3} | {/* Square Footage */}{listing.properties.webapp_field_3_2}ft | {/* Status */} Status: {listing.properties.webapp_field_3_1.map(item=><span> "{item}" </span>)}
                </li>
            ))}
        </ul>
        </>

    );
};

export default ListingsList;