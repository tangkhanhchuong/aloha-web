import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
    );
}