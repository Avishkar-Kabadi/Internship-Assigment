import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ArrowLeft, MapPin, Users } from 'lucide-react';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const CITY_COORDINATES = {
    "Edinburgh": [55.9533, -3.1883],
    "Tokyo": [35.6762, 139.6503],
    "San Francisco": [37.7749, -122.4194],
    "New York": [40.7128, -74.0060],
    "London": [51.5074, -0.1278],
    "Singapore": [1.3521, 103.8198],
    "Sidney": [-33.8688, 151.2093]
};

export default function MapPage() {
    const tableData = useSelector((state) => state.app);
    const navigate = useNavigate();

    const cityGroups = useMemo(() => {
        const groups = {};

        tableData.forEach(emp => {
            if (!Array.isArray(emp)) return;

            const cityItem = emp.find(item =>
                Object.keys(CITY_COORDINATES).some(city =>
                    item?.includes(city)
                )
            );

            if (!cityItem) return;

            const matchedCity = Object.keys(CITY_COORDINATES).find(city =>
                cityItem.includes(city)
            );

            if (!matchedCity) return;

            if (!groups[matchedCity]) {
                groups[matchedCity] = {
                    coords: CITY_COORDINATES[matchedCity],
                    employees: []
                };
            }

            const name = emp[0] || "Unknown";
            const role = emp.find(item =>
                item?.includes('Developer') ||
                item?.includes('Architect') ||
                item?.includes('Engineer')
            ) || "Staff";

            groups[matchedCity].employees.push({ name, role });
        });

        return groups;
    }, [tableData]);


    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <div className="bg-white border-b border-slate-200 p-4 md:px-12 flex justify-between items-center z-1000">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">Global Offices</h1>
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Employee Distribution</p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100">
                    <Users size={18} />
                    <span className="font-semibold">{Object.keys(cityGroups).length} Cities Mapped</span>
                </div>
            </div>

            <div style={{ height: "calc(100vh - 80px)", width: "100%" }}>
                <MapContainer
                    center={[20, 0]}
                    zoom={3}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {Object.entries(cityGroups).map(([cityName, data]) => (
                        <Marker key={cityName} position={data.coords}>
                            <Popup className="custom-popup">
                                <div className="p-2">
                                    <div className="flex items-center gap-2 mb-2 border-b pb-1">
                                        <MapPin size={16} className="text-blue-600" />
                                        <span className="font-bold text-slate-800">{cityName}</span>
                                    </div>
                                    <div className="max-h-32 overflow-y-auto space-y-2">
                                        {data.employees.map((emp, i) => (
                                            <div key={i} className="text-xs">
                                                <p className="font-semibold text-slate-700">{emp.name}</p>
                                                <p className="text-slate-500">{emp.role}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="mt-2 pt-2 border-t text-[10px] text-blue-600 font-bold uppercase">
                                        {data.employees.length} Employees Total
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                <div className="absolute bottom-6 right-6 bg-white p-4 rounded-2xl shadow-2xl z-1000 border border-slate-200 max-w-xs hidden sm:block">
                    <h3 className="font-bold text-slate-800 mb-2 text-sm">Map Instructions</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Click on the markers to see the names and roles of employees stationed at each global office location.
                    </p>
                </div>
            </div>
        </div>
    );
}