import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { db } from '../firebase.config'
import Spinner from './Spinner'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const Slider = () => {
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListing = async () => {
            const listingRef = collection(db, 'listings')
            const fQuery = query(
                listingRef,
                orderBy('timestamp', 'desc'),
                limit(5)
            )
            const querySnap = await getDocs(fQuery)

            let listings = []

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setListings(listings)
            setLoading(false)
        }

        fetchListing()
    }, [])

    if (loading) return <Spinner />

    if (listings.length === 0) return <></>

    return (
        listings && (
            <>
                <p className="exploreHeading">Recommended</p>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                >
                    {listings?.map(({ data, id }) => (
                        <SwiperSlide
                            key={id}
                            onClick={() =>
                                navigate(`/category/${data.type}/${id}`)
                            }
                        >
                            <div
                                className="swiperSlideDiv"
                                style={{
                                    background: `url(${data.imgUrls[0]}) center no-repeat`,
                                    backgroundSize: 'cover',
                                    height: '400px',
                                }}
                            >
                                <p className="swiperSlideText">{data.name}</p>
                                <p className="swiperSlidePrice">
                                    ${data.discounted ?? data.regularPrice}
                                    {data.type === 'rent' && ' / Month'}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )
    )
}

export default Slider
