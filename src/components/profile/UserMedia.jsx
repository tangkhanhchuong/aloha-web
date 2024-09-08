import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { requestGetUserMedia } from "../../services/user.service";

const MediaSkeleton = () => {
    return <div className='skeleton h-40 w-full'></div>;
}

export const UserMedia = ({ userId }) => {
	const {
		data: mediaItems,
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["user-media"],
		queryFn: async () => {
			try {
				if (!userId) {
					return [];
				}
				const data = await requestGetUserMedia({ userId });
				return data.items;
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

    console.log(mediaItems, isLoading, isRefetching)

    return (
		<div>
            {
                (isLoading || isRefetching) && (
                    <div className="flex flex-row flex-wrap">
                        <div className="flex flex-row flex-wrap">
                            <div className="flex-none w-1/3 p-1">
                                <MediaSkeleton />
                            </div>
                            <div className="flex-none w-1/3 p-1">
                                <MediaSkeleton />
                            </div>
                            <div className="flex-none w-1/3 p-1">
                                <MediaSkeleton />
                            </div>
                        </div>
                    </div>
                )
            }
            {
                !isLoading && !isRefetching && (
                    mediaItems?.length === 0 ? (
                        <p className='text-center my-4'>No media</p>
                    ) : (
                        <div className="flex flex-row flex-wrap h-40">
                            {
                                mediaItems.map(item => (
                                    <div key={item.mediaId} className="flex items-center w-1/3 p-1 h-full">
                                        <img src={item.url}/>
                                    </div>
                                ))
                            }
                        </div>
                    )
                )
            }
		</div>
	);
};
