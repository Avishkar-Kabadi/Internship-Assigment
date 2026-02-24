import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../app/appSlice';
import { useNavigate } from 'react-router-dom';
import { User, Eye, EyeOff, Lock, Loader2 } from 'lucide-react';


export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showHidePassword, setShowHidePassword] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            setError("");

            const res = await fetch('https://backend.jotish.in/backend_dev/gettabledata.php', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "username": username, "password": password })
            });

            if (!res.ok) throw new Error("API Connection Failed");

            const data = await res.json();

            dispatch(login(data.TABLE_DATA.data));
            localStorage.setItem("data", JSON.stringify(data.TABLE_DATA.data));

            navigate("/list");

        } catch (err) {
            setError(err.ErrorDescription || "API Connection Failed");
            console.error(err);
        } finally {
            setIsLoading(false);
            setUsername("");
            setPassword("");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
                    <p className="text-slate-500 mt-2">Sign in to your dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <label className="text-sm font-medium text-slate-700 block mb-2">Username</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <User size={18} />
                            </span>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Enter Username"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="text-sm font-medium text-slate-700 block mb-2">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <Lock size={18} />
                            </span>
                            <input
                                type={showHidePassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                            />
                            {!showHidePassword ?
                                <span onClick={() => setShowHidePassword(prev => !prev)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400">
                                    <Eye size={18} />
                                </span> :
                                <span onClick={() => setShowHidePassword(prev => !prev)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400">
                                    <EyeOff size={18} />
                                </span>
                            }
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 animate-pulse">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-200"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-slate-400 text-xs mt-6">
                </p>
            </div>
        </div>
    );
}