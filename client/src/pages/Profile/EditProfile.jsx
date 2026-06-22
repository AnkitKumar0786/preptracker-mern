import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import profileServices from '../../services/profileServices';

const EditProfile = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    // taking the data from profile
    const existingData = location.state?.user;
    const updatecom = location.isEdi

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        username: existingData?.username || "",
        college: existingData?.college || "",
        branch: existingData?.branch || "",
        graduationYear: existingData?.graduationYear,
        email: existingData?.email || ""
    })

    if (!existingData) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-xl font-bold text-gray-800">Profile not found!</h2>
                <button onClick={() => navigate('/profile')} className="mt-4 text-[#067338] underline">Go back</button>
            </div>
        );
    }

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await profileServices.updateProfile(formData)
            navigate('/profile')
        } catch (err) {
            console.error("Failed to update profile", err);
            setError(err.message || "Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <div className="max-w-3xl mx-auto mt-5 space-y-6 pb-8">

            {/* Header */}
            <div className="flex items-center gap-4">
                <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => navigate('/profile')}>
                    <span className="text-gray-600 font-bold">←</span>
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
                    <p className="text-sm text-gray-500 mt-1">Update your personal details.</p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                name='username'
                                value={formData.username}
                                onChange={handleChanges}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email (can't change)</label>
                            <input
                                type="email"
                                name='email'
                                disabled
                                value={formData.email}
                                onChange={handleChanges}
                                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed  outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">College</label>
                            <input
                                type="text"
                                name='college'
                                value={formData.college}
                                onChange={handleChanges}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Branch</label>
                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleChanges}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] outline-none transition-all cursor-pointer appearance-none"
                            >
                                <option value="" disabled>Select your branch</option>
                                <option value="CSE">Computer Science and Engineering (CSE)</option>
                                <option value="IT">Information Technology (IT)</option>
                                <option value="ECE">Electronics and Communication (ECE)</option>
                                <option value="ICE">Instrumentation and control engineering(ICE)</option>
                                <option value="MECH">Mechanical Engineering</option>
                                <option value="CIVIL">Civil Engineering</option>
                                <option value="MME">Metallurgical and Materials Engineering</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Graduation Year</label>
                        <input
                            type="number"
                            name='graduationYear'
                            value={formData.graduationYear}
                            onChange={handleChanges}
                            className="w-full md:w-1/2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#067338]/20 focus:border-[#067338] outline-none transition-all"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                        <button type="button" className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                            onClick={() => navigate('/profile')}>
                            Cancel
                        </button>
                        <button type="submit"
                            disabled={isLoading}
                            className="px-8 py-2.5 text-sm font-bold text-white bg-[#067338] hover:bg-green-700 rounded-xl shadow-sm transition-colors">
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>

                </form>
            </div>

        </div>
    );
};

export default EditProfile;