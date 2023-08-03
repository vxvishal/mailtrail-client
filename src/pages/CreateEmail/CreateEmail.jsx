import React, { useState, useRef } from 'react';
import './styles.css';
import axios from 'axios';

export default function CreateEmail() {
    const [emailBody, setEmailBody] = useState('');
    const [renderedHtml, setRenderedHtml] = useState('');
    const [emailTitle, setEmailTitle] = useState('');
    const [emailGenerated, setEmailGenerated] = useState(false);
    const renderedHtmlRef = useRef(null);
    let token;

    const handleInputChange = (event) => {
        setEmailBody(event.target.value);
    };

    const generateHTML = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/newToken`, {
            emailTitle,
            emailBody
        })
            .then(response => {
                token = response.data;
            })
            .catch(error => {
                console.log(error);
            });

        // Generate the HTML code with the tracking pixel
        const trackingPixelUrl = `${process.env.REACT_APP_API_URL}?token=${token}`;
        // const htmlWithPixel = `<p>${emailBody}</p><img src="${trackingPixelUrl}" alt="tracking-pixel">`;
        const htmlWithPixel = `<p>${emailBody.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>')}<img src="${trackingPixelUrl}" alt="tracking-pixel"></p>`;
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
                <button type="button" onClick={generateHTML}>
                    Generate
                </button>
            </form>
            {
                emailGenerated &&
                <div className='generated-email'>
                    <div>
                        <p className='generated-email-title'>Your generated email:</p>
                        <div className='generated-email-container'>
                            <div ref={renderedHtmlRef} id="renderedHtmlContainer">
                                {/* Rendered HTML will be inserted here */}
                                <div dangerouslySetInnerHTML={{ __html: renderedHtml }}></div>
                            </div>
                        </div>
                    </div>
                    <button onClick={clickToCopy}>Copy email</button>
                </div>
            }
        </div>
    );
};