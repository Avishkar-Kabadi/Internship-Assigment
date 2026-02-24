import { useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Camera, ArrowLeft, User, MapPin, BadgeDollarSign } from 'lucide-react';

export default function DetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const webcamRef = useRef(null);

    const { employee } = location.state || {};

    if (!employee) {
        return <div className="p-10 text-center text-red-500">No employee data found. Please return to the list.</div>;
    }

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        navigate('/result', { state: { image: imageSrc } });
    }, [webcamRef, navigate]);

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-8"
            >
                <ArrowLeft size={20} /> Back to Directory
            </button>

            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-blue-600 p-8 text-white">
                        <div className="w-20 h-20 bg-blue-400 rounded-2xl flex items-center justify-center mb-4 border-2 border-blue-300">
                            <User size={40} />
                        </div>
                        <h1 className="text-3xl font-bold">{employee[0]}</h1>
                        <p className="opacity-80">{employee[1]}</p>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-100 rounded-lg text-slate-500"><MapPin /></div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Location</p>
                                <p className="text-slate-700 font-medium">{employee[2]}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-100 rounded-lg text-slate-500"><BadgeDollarSign /></div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Annual Salary</p>
                                <p className="text-emerald-600 font-bold text-lg">{employee[5]}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100">
                            <p className="text-sm text-slate-500 italic">ID: {employee[3]} • Joined: {employee[4]}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-6 flex flex-col items-center justify-center text-white shadow-2xl">
                    <div className="mb-4 text-center">
                        <h2 className="text-xl font-semibold">Verification Camera</h2>
                        <p className="text-slate-400 text-sm">Capture a photo to proceed</p>
                    </div>

                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border-2 border-slate-700">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full h-full object-cover"
                            videoConstraints={{ facingMode: "user" }}
                        />
                        <div className="absolute inset-0 border-20 border-white/5 pointer-events-none" />
                    </div>

                    <button
                        onClick={capture}
                        className="mt-8 flex items-center gap-3 bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all transform active:scale-95"
                    >
                        <Camera size={20} /> Take Photo
                    </button>
                </div>

            </div>
        </div>
    );
}