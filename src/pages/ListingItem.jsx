import { Link } from 'react-router-dom'

import bedIcon from '../assets/svg/bedIcon.svg'
import bathTubIcon from '../assets/svg/bathtubIcon.svg'
import { DeleteIcon, EditIcon } from '../assets'

const ListingItem = ({ listing, id, onDeleteHandler, onEditHandler }) => {
    return (
        <li className="categoryListing">
            <Link
                to={`/category/${listing.type}/${id}`}
                className="categoryListingLink"
            >
                <img
                    src={listing.imgUrls[0]}
                    alt={listing.name}
                    className="categoryListingImg"
                />
                <div className="categoryListingDetails">
                    <p className="categoryListingLocation">
                        {listing.location}
                    </p>
                    <p className="categoryListingName">{listing.name}</p>
                    <p className="categoryListingPrice">
                        $
                        {listing.offer
                            ? listing.discountedPrice
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            : listing.regularPrice
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        {listing.type === 'rent' && '/ Month'}
                    </p>
                    <div className="categoryListingInfoDiv">
                        <img src={bedIcon} alt="bed" />
                        <p className="categoryListingInfoText">
                            {listing.bedrooms > 1
                                ? `${listing.bedrooms} Bedrooms`
                                : '1 Bedroom'}
                        </p>
                        <img src={bathTubIcon} alt="bath" />
                        <p className="categoryListingInfoText">
                            {listing.bathrooms > 1
                                ? `${listing.bathrooms} Bathrooms`
                                : '1 Bathroom'}
                        </p>
                    </div>
                </div>
            </Link>

            {onDeleteHandler && (
                <DeleteIcon
                    className="removeIcon"
                    fill="rgb(231, 76, 60)"
                    onClick={() => onDeleteHandler(listing.id, listing.name)}
                />
            )}
            {onEditHandler && (
                <EditIcon
                    className="editIcon"
                    onClick={() => onEditHandler(id)}
                />
            )}
        </li>
    )
}

export default ListingItem
