import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell, LabelList
} from 'recharts';
import { ArrowLeft, TrendingUp, Users } from 'lucide-react';
import CustomTooltip from '../components/CustomToolTip';

export default function ChartPage() {
    const tableData = useSelector((state) => state.app);
    const navigate = useNavigate();

    const chartData = useMemo(() => {
        if (!tableData) return [];

        return tableData.slice(0, 10).map((emp) => {
            const cleanSalary = Number(emp[5].replace(/[^0-9.-]+/g, ""));

            return {
                name: emp[0],
                salary: cleanSalary,
                displaySalary: emp[5]
            };
        });
    }, [tableData]);



    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-2"
                        >
                            <ArrowLeft size={18} /> Back to List
                        </button>
                        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                            <TrendingUp className="text-blue-600" /> Salary Analysis
                        </h1>
                        <p className="text-slate-500">Visualizing compensation for the top 10 employees</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Sample Size</p>
                            <p className="text-xl font-bold text-slate-800">10 Employees</p>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-slate-100">
                    <div className="w-full" style={{ height: 500 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    angle={-45}
                                    textAnchor="end"
                                    interval={0}
                                    height={80}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                />
                                <YAxis
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    tickFormatter={(value) => `$${value / 1000}k`}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />

                                <Bar dataKey="salary" radius={[6, 6, 0, 0]} barSize={40}>
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index % 2 === 0 ? '#3b82f6' : '#6366f1'}
                                        />
                                    ))}
                                    <LabelList
                                        dataKey="salary"
                                        position="top"
                                        formatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                                        style={{ fill: '#64748b', fontSize: '11px', fontWeight: 'bold' }}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}