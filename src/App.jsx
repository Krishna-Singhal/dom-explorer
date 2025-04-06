import { useState, useEffect } from "react";
import { Layers, RefreshCw } from "lucide-react";
import ElementsList from "./components/ElementsList";
import TestingPanel from "./components/TestingPanel";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

const App = () => {
    const [elements, setElements] = useState({});
    const [isScanning, setIsScanning] = useState(false);
    const [testResults, setTestResults] = useState([]);
    const [activeTab, setActiveTab] = useState("elements");

    useEffect(() => {
        scanPage();
    }, []);

    const fakeFill = () => {
        window.close();
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "fakeFill" }, (response) => {});
        });
    };

    const scanPage = () => {
        setIsScanning(true);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "scanElements" }, (response) => {
                if (response && response.elements) {
                    setElements(response.elements);
                }
                setIsScanning(false);
            });
        });
    };

    const runTests = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "runTests" }, (response) => {
                if (response && response.results) {
                    setTestResults(response.results);
                    setActiveTab("testing");
                }
            });
        });
    };

    const getTotalElements = () => {
        return Object.values(elements).reduce((sum, count) => sum + count, 0);
    };

    return (
        <div className="w-[400px] min-h-[500px] bg-gray-50 text-gray-900">
            <header className="bg-emerald-600 text-white p-4 shadow-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Layers className="h-6 w-6" />
                        <h1 className="text-xl font-bold">DOM Explorer</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="primary"
                            size="sm"
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                            onClick={fakeFill}
                        >
                            Fake Fill
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                            onClick={scanPage}
                            disabled={isScanning}
                        >
                            <RefreshCw
                                className={`h-4 w-4 mr-2 ${isScanning ? "animate-spin" : ""}`}
                            />
                            {isScanning ? "Scanning..." : "Refresh"}
                        </Button>
                    </div>
                </div>

                {Object.keys(elements).length > 0 && (
                    <div className="mt-2 text-sm bg-white/10 rounded-md px-3 py-1.5">
                        Found <span className="font-bold">{getTotalElements()}</span> interactive
                        elements
                    </div>
                )}
            </header>

            <main className="p-4">
                <Tabs defaultValue="elements" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="elements">Elements</TabsTrigger>
                        <TabsTrigger value="testing">Validate</TabsTrigger>
                    </TabsList>

                    <TabsContent value="elements" className="space-y-4">
                        <ElementsList elements={elements} isLoading={isScanning} />
                    </TabsContent>

                    <TabsContent value="testing" className="space-y-4">
                        <TestingPanel runTests={runTests} testResults={testResults} />
                    </TabsContent>
                </Tabs>
            </main>

            <footer className="p-4 text-center text-xs text-gray-500 border-t border-gray-200">
                DOM Explorer v1.0 • Analyze and test interactive elements
            </footer>
        </div>
    );
};

export default App;
