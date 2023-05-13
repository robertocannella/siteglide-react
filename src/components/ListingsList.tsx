import Listing from '../models/Listing';
import LoadingSpinner from './Spinner/LoadingSpinner';
import useListings from '../hooks/useListings';




const ListingsList = () => {

    const {data: listings, error, isLoading} = useListings();

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