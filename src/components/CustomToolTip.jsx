const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 shadow-lg rounded-lg border border-slate-200">
                <p className="font-bold text-slate-800">{payload[0].payload.name}</p>
                <p className="text-blue-600 font-semibold">{payload[0].payload.displaySalary}</p>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;