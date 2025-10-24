import React from 'react'

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import CustomTooltip from './CustomTooltip';


function CustomPieChart({data, label, colors}) {
  return (
   <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%"  height={325}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey ="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    label
                    outerRadius={80}
                    innerRadius={50}
                    labelLine={false}
                    >
                        {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
                </Pie>
                <Tooltip content={CustomTooltip}/>
                
                {/* <Legend content={<CustomLegend}/> */}
            </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomPieChart

// import React from 'react';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend
// } from "recharts";

// function CustomPieChart({ data, label, colors }) {
//   return (
//     <div style={{ width: '100%', height: 300 }}>
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="count"
//             nameKey="status"
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//             innerRadius={40}
//             labelLine={false}
//             label
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default CustomPieChart;
