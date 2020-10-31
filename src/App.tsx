import React from 'react';
import './App.css';
import { Button, Col, Input, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function App() {
    const [filePath, setFilePath] = React.useState('');
    const [content, setContent] = React.useState('');
    React.useEffect(() => {
        setContent(window.localStorage.getItem('content') || '');
        chrome?.storage?.local?.get((obj) => {
            setFilePath(obj.path || '');
            setContent(obj.content || '');
        });
    }, []);
    const setFile = (file?: File) => {
        if (file) {
            setFilePath(file.name);
            const fileReader = new FileReader();
            fileReader.onloadend = (e) => {
                const text = e.target?.result;
                if (typeof text === 'string') {
                    setContent(text);
                }
            };
            fileReader.readAsText(file);
        }
    };
    const onSave = () => {
        if (chrome?.storage?.local) {
            chrome.storage.local.set({ path: filePath, content });
        } else {
            window.localStorage.setItem('content', content);
        }
    };
    return (
        <div className="App">
            <div style={{ margin: '10px' }}>
                <Row gutter={24}>
                    <Col span="12">
                        <div style={{ background: '#fafafa' }}>
                            <label htmlFor="upload">
                                <UploadOutlined style={{ fontSize: '2em' }} />
                            </label>
                            <Input
                                id="upload"
                                hidden
                                type="file"
                                onChange={(e) => setFile(e.target?.files?.[0])}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span="12">
                        <Input.TextArea
                            style={{ width : '80%' }}
                            rows={5}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span="12">
                        <Button type="primary" onClick={onSave} block>Save</Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default App;
