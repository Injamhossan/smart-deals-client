import React from 'react';
import { auth } from '../../firebase/firebase'; 

const Profile = () => {
  // eslint-disable-next-line no-undef
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return <div>Loading Profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        My Profile
      </h1>
      {user && (
        <div className="space-y-4">
          {user.photoURL && (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto"
            />
          )}
          <div className='text-center'>
            <p className="text-xl font-semibold">{user.displayName}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-400 mt-2">UID: {user.uid}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;