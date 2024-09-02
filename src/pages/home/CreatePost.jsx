import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsEmojiSmileFill } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

import {
	requestGenerateUploadUrl,
	uploadToBucket
} from "../../services/media.service";
import { requestCreatePost } from "../../services/post.service";

const CreatePost = () => {
	const [content, setContent] = useState("");
	const [mediaDataUrl, setMediaDataUrl] = useState(null);
	const [media, setMedia] = useState(null);
	const mediaRef = useRef(null);

	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();

	const {
		mutate: mutateCreatePost,
		isCreatingPost,
		isCreatePostError,
		createPostError,
	} = useMutation({
		mutationFn: async () => {
			try {
				const fileKeys = [];
				if (media) {
					const response = await requestGenerateUploadUrl({ fileNames: [media?.name.replace(" ", "-")]});
					fileKeys.push(response.files[0]?.key);
					await uploadToBucket({ uploadUrl: response.files[0]?.url, media });
				}
				const data = await requestCreatePost({ content, media : fileKeys});
				return data;
			} catch (error) {
				toast.error(error.message);
				throw new Error(error);
			}
		},
		onSuccess: () => {
			setContent("");
			setMediaDataUrl(null);
			toast.success("Post created successfully");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!content) {
			return;
		}
		mutateCreatePost({ content, media })
	};

	const handleMediaChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setMedia(file);
				setMediaDataUrl(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className='flex p-4 items-start gap-4 border-b border-gray-700'>
			<div className='avatar'>
				<div className='w-8 rounded-full'>
					<img src={authUser.avatar || "/avatar-placeholder.png"} />
				</div>
			</div>
			<form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
				<textarea
					className='contentarea w-full p-0 content-lg resize-none border-none focus:outline-none  border-gray-800'
					placeholder='What is happening?!'
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				{mediaDataUrl && (
					<div className='relative w-72 mx-auto'>
						<IoCloseSharp
							className='absolute top-0 right-0 content-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
							onClick={() => {
								setMediaDataUrl(null);
								mediaRef.current.value = null;
							}}
						/>
						<img src={mediaDataUrl} className='w-full mx-auto h-72 object-contain rounded' />
					</div>
				)}

				<div className='flex justify-between border-t py-2 border-t-gray-700'>
					<div className='flex gap-1 items-center'>
						<CiImageOn
							className='fill-primary w-6 h-6 cursor-pointer'
							onClick={() => mediaRef.current.click()}
						/>
						<BsEmojiSmileFill className='fill-primary w-5 h-5 cursor-pointer' />
					</div>
					<input type='file' accept='image/*' name='media' hidden ref={mediaRef} onChange={handleMediaChange} />
					<button className='btn btn-primary rounded-full btn-sm text-white px-4'>
						{isCreatingPost ? "Posting..." : "Post"}
					</button>
				</div>
				{isCreatePostError && <div className='text-red-500'>{createPostError.message}</div>}
			</form>
		</div>
	);
};
export default CreatePost;
