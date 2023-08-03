import { useState, useEffect } from 'react';
import './styles.css';
import React from 'react';
import axios from 'axios';
import TrackingList from '../../components/TrackingList/TrackingList';
import TrackingDetails from '../../components/TrackingDetails/TrackingDetails';
import Lottie from 'react-lottie-player';
import loadingAnimation from '../../assets/loading.json';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        let ignore = false;
        axios.get(`${process.env.REACT_APP_API_URL}/getTokens`)
            .then(res => {
                if (!ignore) {
                    setData(Object.values(res.data).reverse());
                    setShowLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
            });

        return () => {
            ignore = true;
        };
    }, []);

    function handleTrackingListClick(index) {
        setSelected(index);
    }

    function handleTrackingDetailsClose() {
        setSelected(null);
    }

    return (
        <div className='main'>
            {
                showLoading ? (<div className='lottie'><Lottie className='animation' play animationData={loadingAnimation} /></div>) :
                    data.length === 0 ? (
                        <p>There is nothing to show here yet</p>
                    ) : selected !== null ? (
                        <TrackingDetails data={data[selected]} onClose={handleTrackingDetailsClose} />
                    ) : (
                        data.map((item, index) => (
                            <div className='list' key={item._id} onClick={() => handleTrackingListClick(index)}>
                                <TrackingList title={item.emailTitle} createdAt={item.createdAt} />
                            </div>
                        ))
                    )
            }
        </div>
    );
}