// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";

// function CustomBarChart({ data }) {
//   //  Define colors based on priority
//   const getBarColor = (entry) => {
//     switch (entry?.priority) {
//       case "Low":
//         return "#00BC7D";
//       case "Medium":
//         return "#FE9900";
//       case "High":
//         return "#FF1F57";
//       default:
//         return "#00BC7D";
//     }
//   };

//   //  Custom tooltip component
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       const { priority, count } = payload[0].payload;
//       return (
//         <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
//           <p className="text-xs font-semibold text-purple-800 mb-1">
//             {priority}
//           </p>
//           <p className="text-sm text-gray-600">
//             Count: <span>{count}</span>
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="bg-white mt-6">
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data} barSize={50}>
//           {/*  Proper grid setup */}
//           <CartesianGrid strokeDasharray="3 3" vertical={false} />

//           <XAxis
//             dataKey="priority"
//             tick={{ fontSize: 12, fill: "#555" }}
//             stroke="none"
//           />
//           <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

//           {/*  Tooltip now correctly renders custom content */}
//           <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

//           {/*  Fixed Bar with Cell mapping */}
//           <Bar dataKey="count" nameKey="priority" radius={[10, 10, 0, 0]}>
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default CustomBarChart;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function CustomBarChart({ data }) {
  //  Color mapping
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case 'Low':
        return "#00BC7D"; // Green
      case 'Medium':
        return "#FE9900"; // Orange
      case 'High':
        return "#FF1F57"; // Red
      default:
        return "#00BC7D";
    }
  };

  //  Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { priority, count } = payload[0].payload;
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">{priority}</p>
          <p className="text-sm text-gray-600">
            Count: <span>{count}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={50}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="priority" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

          <Bar dataKey="count" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              // FIX: return each <Cell>
              <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomBarChart;

