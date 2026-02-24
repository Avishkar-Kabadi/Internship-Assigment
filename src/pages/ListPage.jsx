import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, LogOut, ChevronRight, BarChart3, Map as MapIcon } from 'lucide-react';
import { logout } from '../app/appSlice';

export default function ListPage() {
    const tableData = useSelector((state) => state.app);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        console.log("Clicked");

        dispatch(logout());
        localStorage.removeItem("data");
    };


    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Employee Directory</h1>
                        <p className="text-slate-500 text-sm">Managing {tableData?.length} records</p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/charts')}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all shadow-md"
                        >
                            <BarChart3 size={18} /> Salary Stats
                        </button>
                        <button
                            onClick={() => navigate('/map')}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all shadow-md"
                        >
                            <MapIcon size={18} /> View Map
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all shadow-md"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tableData?.map((employee, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/details/${index}`, { state: { employee } })}
                            className="group bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">{employee[0]}</h3>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                                        <Briefcase size={14} /> {employee[1]}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                                        <MapPin size={14} /> {employee[2]}
                                    </div>
                                </div>
                                <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                                    <ChevronRight size={20} />
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Salary</span>
                                <span className="text-emerald-600 font-bold flex items-center gap-1">
                                    {employee[5]}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}