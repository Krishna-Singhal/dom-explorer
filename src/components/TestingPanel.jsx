import { useState } from "react";
import { Play, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import TestResult from "./TestResult";

const TestingPanel = ({ runTests, testResults }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState("passed");

    const handleRunTests = () => {
        setIsRunning(true);
        runTests();
        setTimeout(() => setIsRunning(false), 1500);
    };

    return (
        <div>
            <div className="mb-6">
                <Alert className="bg-amber-50 border-amber-200">
                    <div className="flex items-center gap-2 mb-1">
                        <Info className="h-4 w-4 text-amber-500" />
                        <AlertTitle>Automated Testing</AlertTitle>
                    </div>
                    <AlertDescription>
                        Run validation tests on form elements to check for proper constraints and
                        validation.
                    </AlertDescription>
                </Alert>
            </div>

            <div className="flex justify-center mb-6">
                <Button
                    onClick={handleRunTests}
                    disabled={isRunning}
                    className="bg-emerald-600 hover:bg-emerald-700"
                >
                    {isRunning ? (
                        <>
                            <span className="mr-2">Running Tests...</span>
                            <span className="animate-spin">
                                <svg className="h-4 w-4" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            </span>
                        </>
                    ) : (
                        <div className="flex items-center gap-1 px-3 py-2 rounded-md">
                            <Play className="h-4 w-4 mr-2" />
                            Run Validation Tests
                        </div>
                    )}
                </Button>
            </div>

            {testResults.length > 0 ? (
                <Tabs defaultValue="passed" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="passed">Passed</TabsTrigger>
                        <TabsTrigger value="failed">Failed</TabsTrigger>
                        <TabsTrigger value="unknown">Unknown</TabsTrigger>
                    </TabsList>

                    <TabsContent value="passed" className="space-y-3">
                        {testResults.map((result, index) => {
                            if (result.status === "pass") {
                                return <TestResult key={index} result={result} />;
                            }
                            return null;
                        })}
                    </TabsContent>

                    <TabsContent value="failed" className="space-y-3">
                        {testResults.map((result, index) => {
                            if (result.status === "fail") {
                                return <TestResult key={index} result={result} />;
                            }
                            return null;
                        })}
                    </TabsContent>

                    <TabsContent value="unknown" className="space-y-3">
                        {testResults.map((result, index) => {
                            if (result.status === "unknown") {
                                return <TestResult key={index} result={result} />;
                            }
                            return null;
                        })}
                    </TabsContent>
                </Tabs>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <p>No test results yet</p>
                    <p className="text-sm mt-1">Click the button above to run validation tests</p>
                </div>
            )}
        </div>
    );
};

export default TestingPanel;
