// import React from 'react'

// function AvatarGroup({avatars, maxVisible=3}) {
//   return (
//     <div>
//         {avatars.slice(0, maxVisible).map((avatar, index)=>(
//             <img
//             key={index}
//             src={avatar}
//             alt={`Avatar ${index}`}
//             className='w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0'/>
//         ))}
//         {avatars.length > maxVisible && (
//             <div className='w-9 h-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full'>+{avatars.length - maxVisible}

//             </div>
//         )}
//     </div>
//   )
// }

// export default AvatarGroup


import React from 'react';

function AvatarGroup({ avatars = [], maxVisible = 3 }) {
  // Only slice (don’t filter falsy ones out)
  const visibleAvatars = avatars.slice(0, maxVisible);

  // fallback placeholder (you can replace with your own image)
  const defaultAvatar =
    'https://cdn-icons-png.flaticon.com/512/847/847969.png';

  return (
    <div className="flex items-center -space-x-2">
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600"
        >
          <img
            src={avatar && avatar.trim() !== '' ? avatar : defaultAvatar}
            alt={`Avatar ${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {avatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  );
}

export default AvatarGroup;

