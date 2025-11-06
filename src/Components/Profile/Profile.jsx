import React, { useContext, useState } from 'react'; // ✅ useState যোগ করা হয়েছে
import { AuthContext } from '../../Auth/AuthProvider';

const Profile = () => {
  // ✅ আপডেটের জন্য updateUserProfile ফাংশনটি Context থেকে আনতে হবে
  const { user, loading, updateUserProfile } = useContext(AuthContext);

  // ✅ এডিট মোড চালু/বন্ধ করার জন্য স্টেট
  const [isEditing, setIsEditing] = useState(false);
  
  // ✅ ফর্মের ডাটা রাখার জন্য স্টেট
  // (user ?... ) দিয়েছি যেন user লোড না হলে এরর না দেয়
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || '',
  });

  if (loading && !user) { // লোডিং state একটু ভালো করা হলো
    return <div>Loading Profile...</div>;
  }

  // ইউজার না থাকলে
  if (!user) {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }
  
  // ফর্ম ইনপুট চেঞ্জ হলে
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ সেভ বাটন চাপলে
  const handleSave = async () => {
    if (!updateUserProfile) {
      console.error("updateUserProfile function is missing from AuthContext!");
      return; // ফাংশন না থাকলে কাজ করবে না
    }
    
    try {
      // AuthContext থেকে পাওয়া ফাংশনটি কল করুন
      await updateUserProfile(formData.displayName, formData.photoURL);
      setIsEditing(false); // এডিট মোড বন্ধ করুন
    } catch (error) {
      console.error("Failed to update profile", error);
      // এখানে ইউজারকে এরর দেখাতে পারেন
    }
  };

  // ✅ কেন্সেল বাটন চাপলে
  const handleCancel = () => {
    setIsEditing(false);
    // ফর্মের ডাটা আবার আগের মতো করে দিন
    setFormData({
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
    });
  };


  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg my-46">
      <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#632EE3] to-[#9F62F2]">
        My Profile
      </h1>

      {isEditing ? (
        /* ==================== 
             এডিট মোড (ফর্ম)
           ==================== */
        <div className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block text-sm font-semibold text-gray-700">Display Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleFormChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="photoURL" className="block text-sm font-semibold text-gray-700">Photo URL</label>
            <input
              type="text"
              id="photoURL"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleFormChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="text-center">
            <p className="text-gray-600">(Email cannot be changed)</p>
          </div>
          <div className="flex justify-between gap-4 pt-4">
            <button
              onClick={handleCancel}
              className="w-full py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="w-full py-2 font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </div>

      ) : (

        /* ==================== 
             ভিউ মোড (আপনার আগের কোড)
           ==================== */
        <div className="space-y-4">
          {user.photoURL && (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto"
            />
          )}
          <div className='text-center'>
            <p className="text-xl font-semibold text-black">{user.displayName}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-400 mt-2">UID: {user.uid}</p>
          </div>
          
          {/* ✅ এডিট বাটন */}
          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-2 font-semibold text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mt-4"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;