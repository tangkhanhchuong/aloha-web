import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";

import { FollowButton } from "../../components/common/FollowButton";
import EditProfileModal from "../../components/profile/EditProfileModal";
import { ProfileInfo } from "../../components/profile/ProfielInfo";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileTabs } from "../../components/profile/ProfileTabs";
import { UpdateButton } from "../../components/profile/UpdateButton";
import { UserTimeline } from "../../components/profile/UserTimeline";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import { requestGetUserProfile } from "../../services/user.service";

const ProfilePage = () => {
	const [coverPath, setCoverPath] = useState(null);
	const [avatarPath, setAvatarPath] = useState(null);
	const [coverFile, setCoverFile] = useState(null);
	const [avatarFile, setAvatarFile] = useState(null);
	const [feedType, setFeedType] = useState("posts");
	const { slug } = useParams();
	const coverImgRef = useRef(null);
	const avatarImgRef = useRef(null);
	
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
				setAvatarPath(data.avatar)
				setCoverPath(data.cover);
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
				switch (state) {
					case "coverPath":
						setCoverFile(file);
						setCoverPath(reader.result);
						break;
					case "avatarPath":
						setAvatarFile(file);
						setAvatarPath(reader.result);
						break;
					default:
						break;
				}
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
									src={coverPath || user?.coverPath || "/cover.png"}
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
									onChange={(e) => handleImgChange(e, "coverPath")}
								/>
								<input
									type='file'
									hidden
									accept='image/*'
									ref={avatarImgRef}
									onChange={(e) => handleImgChange(e, "avatarPath")}
								/>
								{/* USER AVATAR */}
								<div className='avatar absolute -bottom-16 left-4'>
									<div className='w-32 rounded-full relative group/avatar bg-secondary'>
										<img src={avatarPath || user?.avatar || "/avatar-placeholder.png"} />
										<div className='absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>
											{isMyProfile && (
												<MdEdit
													className='w-4 h-4 text-white'
													onClick={() => avatarImgRef.current.click()}
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className='flex justify-end px-4 mt-5'>
								{isMyProfile && <EditProfileModal authUser={authUser} profile={user} />}
								{!isMyProfile && <FollowButton user={user} />}
								{(coverPath || avatarPath) &&
									<UpdateButton
										userId={user.id}
										avatarPath={avatarPath}
										coverPath={coverPath}
										avatarFile={avatarFile}
										coverFile={coverFile}
										
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
