import { useState } from 'react';
import { marked } from 'marked';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatBot = () => {
    const [userInput, setUserInput] = useState('');
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!userInput.trim()) {
            setResponseText('Please enter a message.');
            return;
        }

        setLoading(true);
        setResponseText('Loading...');

        try {
            const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer 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',
                    'HTTP-Referer': 'https://www.sitename.com',
                    'X-Title': 'SiteName',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'deepseek/deepseek-r1:free',
                    messages: [{ role: 'user', content: userInput }],
                }),
            });

            const data = await res.json();
            const markdownText = data.choices?.[0]?.message?.content || 'No response received.';
            setResponseText(marked.parse(markdownText));
        } catch (error) {
            setResponseText(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Free AI ChatBot using DeepSeek R1</h2>
            <div className='d-flex'>
                <div className="form-group w-100 me-1">
                    <input
                        type="text"
                        className="form-control"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter your question"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                sendMessage();
                            }
                        }}
                    />
                </div>
                <button className="btn btn-success" onClick={sendMessage} disabled={loading}>
                    {loading ? 'Sending...' : 'Ask!'}
                </button>
            </div>
            <div
                id="response"
                className="mt-3 p-3"
                style={{ minHeight: '50px' }}
                dangerouslySetInnerHTML={{ __html: responseText }}
            />
        </div>
    );
};

export default ChatBot;