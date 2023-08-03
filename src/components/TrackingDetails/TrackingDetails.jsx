import React, { useEffect, useState } from 'react';
import "./styles.css";
import axios from 'axios';
import Lottie from 'react-lottie-player';
import loadingAnimation from '../../assets/loading.json';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function TrackingDetails({ data, onClose }) {
    const [details, setDetails] = useState({});
    const [accessDetails, setAccessDetails] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/getDetails?token=${data._id}`)
            .then(res => {
                setDetails(res.data);
                setAccessDetails(res.data.accessDetails);
                setShowLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [data._id]);

    return (
        <>
            {
                showLoading ? (<div className='lottie'><Lottie className='animation' play animationData={loadingAnimation} /></div>) :
                    <div className='details'>
                        <div className='close-button' onClick={onClose}><ArrowBackIosNewIcon style={{ height: 17 }} />Back</div>
                        <div className='details-header'>
                            <h4>{data.emailTitle}</h4>
                            <p>Created on: {data.createdAt}</p>
                        </div>
                        {
                            (details.totalAccessed <= 2) ?
                                <p>The email hasn't been opened yet</p> :
                                <div className='details-body'>
                                    <p>Opened {details.totalAccessed < 2 ? '0' : details.totalAccessed - 2} {details.totalAccessed <= 3 ? "time" : "times"} </p>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className='column-title'>Opened On</th>
                                                <th className='column-title'>Platform</th>
                                                <th className='column-title'>Browser</th>
                                                <th className='column-title'>IP Address</th>
                                                <th className='column-title'>Location</th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-body'>
                                            {accessDetails.map((item, index) => (
                                                <tr key={item._id}>
                                                    <td>{item.accessedAt}</td>
                                                    <td>{item.platform}</td>
                                                    <td>{item.browser}</td>
                                                    <td>{item.ip}</td>
                                                    <td>{item.location}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                        }
                    </div>
            }
        </>
    );
}

export default TrackingDetails;