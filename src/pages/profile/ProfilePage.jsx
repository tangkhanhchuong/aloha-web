import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

import { FollowButton } from "../../components/common/FollowButton";
import EditProfileModal from "../../components/profile/EditProfileModal";
import { ProfileInfo } from "../../components/profile/ProfielInfo";
import { ProfileTabs } from "../../components/profile/ProfileTabs";
import { UpdateButton } from "../../components/profile/UpdateButton";
import { UserTimeline } from "../../components/profile/UserTimeline";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import { requestGetUserProfile } from "../../services/user.service";

export const ProfileHeader = ({ user }) => {
	return (
		<div className='flex gap-10 px-4 py-2 items-center'>
			<Link to='/'>
				<FaArrowLeft className='w-4 h-4' />
			</Link>
			<div className='flex flex-col'>
				<p className='font-bold text-lg'>{user?.fullname}</p>
				<span className='text-sm text-slate-500'>{user.numberOfPosts} posts</span>
			</div>
		</div>
	)
}


const ProfilePage = () => {
	const [coverImg, setCoverImg] = useState(null);
	const [avatarImg, setAvatarImg] = useState(null);
	const [feedType, setFeedType] = useState("posts");
	const { slug } = useParams();
	const coverImgRef = useRef(null);
	const profileImgRef = useRef(null);
	
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	
	const {
		data: user,
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["userProfile"],
		queryFn: async () => {
			try {
				const data = await requestGetUserProfile({ slug });
				setAvatarImg(data.avatar)
				setCoverImg(data.cover);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	const isMyProfile = authUser.userId === user?.userId;

	const handleImgChange = (e, state) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				state === "coverImg" && setCoverImg(reader.result);
				state === "avatarImg" && setAvatarImg(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		refetch();
	}, [slug, refetch]);

	return (
		<>
			<div className='flex-[4_4_0]  border-r border-gray-700 min-h-screen '>
				{(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
				{!isLoading && !isRefetching && !user && <p className='text-center text-lg mt-4'>User not found</p>}
				<div className='flex flex-col'>
					{!isLoading && !isRefetching && user && (
						<>
							<ProfileHeader user={user} />
							{/* COVER IMG */}
							<div className='relative group/cover'>
								<img
									src={coverImg || user?.coverImg || "/cover.png"}
									className='h-52 w-full object-cover'
									alt='cover image'
								/>
								{isMyProfile && (
									<div
										className='absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
										onClick={() => coverImgRef.current.click()}
									>
										<MdEdit className='w-5 h-5 text-white' />
									</div>
								)}

								<input
									type='file'
									hidden
									accept='image/*'
									ref={coverImgRef}
									onChange={(e) => handleImgChange(e, "coverImg")}
								/>
								<input
									type='file'
									hidden
									accept='image/*'
									ref={profileImgRef}
									onChange={(e) => handleImgChange(e, "avatarImg")}
								/>
								{/* USER AVATAR */}
								<div className='avatar absolute -bottom-16 left-4'>
									<div className='w-32 rounded-full relative group/avatar bg-secondary'>
										<img src={avatarImg || user?.avatar || "/avatar-placeholder.png"} />
										<div className='absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>
											{isMyProfile && (
												<MdEdit
													className='w-4 h-4 text-white'
													onClick={() => profileImgRef.current.click()}
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className='flex justify-end px-4 mt-5'>
								{isMyProfile && <EditProfileModal authUser={authUser} profile={user} />}
								{!isMyProfile && <FollowButton user={user} />}
								{(coverImg || avatarImg) &&
									<UpdateButton
										coverImg={coverImg}
										avatarImg={avatarImg}
										setAvatarImg={setAvatarImg}
										setCoverImg={setCoverImg}
									/>}
							</div>
							<ProfileInfo user={user} />
							<ProfileTabs feedType={feedType} setFeedType={setFeedType} />
						</>
					)}
					{ user?.userId && <UserTimeline userId={user?.userId} /> }
				</div>
			</div>
		</>
	);
};
export default ProfilePage;
