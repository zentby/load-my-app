import React from "react";
import "./App.css";
import { Input } from "antd";

function App() {
    const [file, setFile] = React.useState("");
    React.useEffect(() => {
        chrome.storage.local.get((obj) => setFile(obj.path || ""));
    }, []);
    const setFilePath = (path: string) => {
        setFile(path);
        chrome.storage.local.set({ path });
    };
    return (
        <div className="App">
            <div>
                <Input
                    placeholder="JS file path"
                    value={file}
                    onChange={(e) => setFilePath(e.target.value)}
                />
            </div>
        </div>
    );
}

export default App;
