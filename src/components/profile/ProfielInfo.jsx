import { FaLink } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";

import { formatMemberSinceDate } from "../../utils/date";

export const ProfileInfo = ({ user }) => {
	const memberSinceDate = formatMemberSinceDate(user?.joinedAt);

	return (
		<div className='flex flex-col gap-4 mt-14 px-4'>
			<div className='flex flex-col'>
				<span className='font-bold text-lg'>{user?.fullname}</span>
				<span className='text-sm text-slate-500'>@{user?.username}</span>
				<span className='text-sm my-1'>{user?.bio}</span>
			</div>

			<div className='flex gap-2 flex-wrap'>
				{user?.website && (
					<div className='flex gap-1 items-center '>
						<>
							<FaLink className='w-3 h-3 text-slate-500' />
							<a
								href='https://youtube.com/@asaprogrammer_'
								target='_blank'
								rel='noreferrer'
								className='text-sm text-blue-500 hover:underline'
							>
								{user?.website}
							</a>
						</>
					</div>
				)}
				<div className='flex gap-2 items-center'>
					<IoCalendarOutline className='w-4 h-4 text-slate-500' />
					<span className='text-sm text-slate-500'>{memberSinceDate}</span>
				</div>
			</div>
			<div className='flex gap-2'>
				<div className='flex gap-1 items-center'>
					<span className='font-bold text-xs'>{user?.numberOfFollowees}</span>
					<span className='text-slate-500 text-xs'>Following</span>
				</div>
				<div className='flex gap-1 items-center'>
					<span className='font-bold text-xs'>{user?.numberOfFollowers}</span>
					<span className='text-slate-500 text-xs'>Followers</span>
				</div>
			</div>
		</div>
	)
}