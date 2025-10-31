import React from 'react'

function UserCard({userInfo}) {
  return (
    <div className='user-card p-2'>
        <div className='flex items-center justify-between'>
            <div className=' flex items-center gap-3'>
                <img
                className='w-12 h-12 rounded-full border-2 border-white'
                src={userInfo?.profileImageUrl}
                alt={`Avatar`}/>

                <div>
                    <p className='text-sm font-medium'>{userInfo?.name}</p>
                    <p className='text-sm  text-gray-500'>{userInfo?.email}</p>
                </div>
            </div>
        </div>

        <div className='flex items-center g3 mt-5'>

        </div>
    </div>
  )
}

export default UserCard