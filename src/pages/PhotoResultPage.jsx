import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, RefreshCcw } from 'lucide-react';

export default function PhotoResultPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const capturedImage = location.state?.image;

    if (!capturedImage) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
                <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-slate-600 mb-4">No image data found.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="max-w-3xl mx-auto">

                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
                    >
                        <RefreshCcw size={18} /> Retake Photo
                    </button>
                    <div className="flex items-center gap-2 text-emerald-600 font-bold">
                        <CheckCircle size={20} /> Captured Successfully
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                    <div className="p-2">
                        <img
                            src={capturedImage}
                            alt="Captured Result"
                            className="w-full h-auto rounded-2xl border border-slate-100 shadow-inner"
                        />
                    </div>

                    <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/50">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Verification Preview</h2>
                            <p className="text-slate-500 text-sm mt-1">
                                Image captured on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                            </p>
                        </div>

                        <div className="flex gap-4 w-full md:w-auto">
                            <a
                                href={capturedImage}
                                download="employee_photo.jpg"
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                            >
                                <Download size={18} /> Save
                            </a>
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md shadow-blue-200"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}