import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";

const EditProfileModal = ({ authUser, profile }) => {
	const [formData, setFormData] = useState({
		fullname: "",
		bio: "",
		location: "",
		website: "",
		gender: "MALE",
		birthday: ""
	});

	const { mutateUpdateProfile, isUpdatingProfile } = useUpdateUserProfile();

	const handleInputChange = (e) => {
		if (!profile.fullname) {
			toast.error("Fullname can't be blank!")
		}
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (authUser) {
			setFormData({
				fullname: profile.fullname,
				bio: profile.bio || "",
				location: profile.location || "",
				website: profile.website || "",
				gender: profile.gender || "MALE",
				birthday: profile.birthday ? moment(profile.birthday).format("YYYY-MM-DD") : ""
			});
		}
	}, [authUser, profile]);

	return (
		<>
			<button
				className='btn btn-primary text-white rounded-full btn-sm'
				onClick={() => document.getElementById("edit_profile_modal").showModal()}
			>
				Edit profile
			</button>
			<dialog id='edit_profile_modal' className='modal'>
				<div className='modal-box border rounded-md border-gray-700 shadow-md'>
					<h3 className='font-bold text-lg my-3'>Edit Profile</h3>
					<form
						className='flex flex-col gap-4'
						onSubmit={(e) => {
							e.preventDefault();
							mutateUpdateProfile(formData);
						}}
					>
						<div className='flex flex-wrap gap-2'>
							<input
								type='text'
								placeholder='Full Name'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.fullname}
								name='fullname'
								onChange={handleInputChange}
							/>
						</div>
						<div className='flex flex-wrap gap-2'>
							<textarea
								placeholder='Bio'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.bio}
								name='bio'
								rows={3}
								onChange={handleInputChange}
							/>
						</div>
						<div className='flex flex-wrap gap-2'>
							<input
								placeholder='Website'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.website}
								name='website'
								onChange={handleInputChange}
							/>
						</div>
						<div className='flex flex-wrap gap-2'>
							<input
								type='text'
								placeholder='Location'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.location}
								name='location'
								onChange={handleInputChange}
							/>
						</div>
						<div className='flex flex-wrap gap-2'>
							<select
								id="gender"
								name="gender"
								value={formData.gender}
								onChange={handleInputChange}
								className="flex-1 input border border-gray-700 rounded p-2 input-md"
							>
								<option value="MALE">Male</option>
								<option value="FEMALE">Female</option>
							</select>
						</div>
						<div className='flex flex-wrap gap-2'>
							<input
								type='date'
								placeholder='Birthday'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.birthday}
								name='birthday'
								onChange={handleInputChange}
							/>
						</div>
						<button className='btn btn-primary rounded-full btn-sm text-white'>
							{isUpdatingProfile ? "Updating..." : "Update"}
						</button>
					</form>
				</div>
				<form method='dialog' className='modal-backdrop'>
					<button className='outline-none'>close</button>
				</form>
			</dialog>
		</>
	);
};
export default EditProfileModal;
