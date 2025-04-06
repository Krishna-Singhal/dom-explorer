import {
    Type,
    KeyRound,
    Mail,
    Hash,
    Calendar,
    CheckSquare,
    List,
    Sliders,
    FileInput,
    MousePointer,
    Loader2,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

const ElementsList = ({ elements, isLoading }) => {
    const getIcon = (type) => {
        switch (type) {
            case "text":
                return <Type className="h-4 w-4" />;
            case "password":
                return <KeyRound className="h-4 w-4" />;
            case "email":
                return <Mail className="h-4 w-4" />;
            case "number":
                return <Hash className="h-4 w-4" />;
            case "date":
                return <Calendar className="h-4 w-4" />;
            case "checkbox":
                return <CheckSquare className="h-4 w-4" />;
            case "select":
                return <List className="h-4 w-4" />;
            case "range":
                return <Sliders className="h-4 w-4" />;
            case "file":
                return <FileInput className="h-4 w-4" />;
            default:
                return <MousePointer className="h-4 w-4" />;
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-emerald-500 animate-spin mb-4" />
                <p className="text-gray-500">Scanning page elements...</p>
            </div>
        );
    }

    if (Object.keys(elements).length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No interactive elements found on this page.</p>
                <p className="text-sm text-gray-400 mt-2">
                    Try scanning again or visit a different page.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-3">
            {Object.entries(elements).map(([type, count]) => (
                <Card key={type} className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="flex items-center p-4">
                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                                {getIcon(type)}
                            </div>
                            <div>
                                <p className="font-medium capitalize">{type}</p>
                                <p className="text-2xl font-bold text-emerald-600">{count}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ElementsList;
