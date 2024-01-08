import React, { useState, useRef } from 'react';
import './styles.css';
import axios from 'axios';
import BuildIcon from '@mui/icons-material/Build';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Lottie from 'react-lottie-player';
import loadingAnimation from '../../assets/loading.json';

export default function CreateEmail() {
    const [emailBody, setEmailBody] = useState('');
    const [renderedHtml, setRenderedHtml] = useState('');
    const [emailTitle, setEmailTitle] = useState('');
    const [emailGenerated, setEmailGenerated] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const renderedHtmlRef = useRef(null);
    let token;

    const handleInputChange = (event) => {
        setEmailBody(event.target.value);
    };

    const generateHTML = async () => {
        // Show the loading animation
        setShowLoading(true);
        await axios.post(`${process.env.REACT_APP_API_URL}/newToken`, {
            emailTitle,
            emailBody
        })
            .then(response => {
                token = response.data;
                setShowLoading(false);
            })
            .catch(error => {
                console.log(error);
            });

        // Generate the HTML code with the tracking pixel
        const trackingPixelUrl = `${process.env.REACT_APP_API_URL}?token=${token}`;
        // const htmlWithPixel = `<p>${emailBody}</p><img src="${trackingPixelUrl}" alt="tracking-pixel">`;
        const htmlWithPixel = `<p>${emailBody.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>')}<img src="${trackingPixelUrl}" alt="tp"></p>`;
        // Update the rendered HTML state
        setRenderedHtml(htmlWithPixel);
        setEmailGenerated(true);
    };

    const clickToCopy = () => {
        // Select the rendered HTML
        const range = document.createRange();
        range.selectNode(renderedHtmlRef.current);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        // Copy the rendered HTML to the clipboard
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };

    return (
        <div className='create-email-main'>
            <h6>Add a title, email body and click generate. Copy the tracking enabled email and send it from your email address.</h6>
            <div class="user-input-wrp">
                <br />
                <input type="text" class="inputText" required onChange={(e) => { setEmailTitle(e.target.value) }} />
                <span class="floating-label">Email title</span>
            </div>
            <form>
                <textarea
                    value={emailBody}
                    onChange={handleInputChange}
                    placeholder='Enter the email body here...'
                    rows="10"
                    cols="50"
                ></textarea>
                <br />
                <div className='button' type="button" onClick={generateHTML}>
                    <BuildIcon style={{ height: 17 }} />Generate
                </div>
            </form>
            {
                showLoading && <div><Lottie className='loading-animation' play animationData={loadingAnimation} /></div>
            }
            {
                emailGenerated &&
                <div className='generated-email'>
                    <div>
                        <p className='generated-email-title'>Your generated email:</p>
                        <div className='button' onClick={clickToCopy}><ContentCopyIcon style={{ height: 17 }} />Click to copy</div>
                        <div className='generated-email-container'>
                            <div ref={renderedHtmlRef} id="renderedHtmlContainer">
                                {/* Rendered HTML will be inserted here */}
                                <div dangerouslySetInnerHTML={{ __html: renderedHtml }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};