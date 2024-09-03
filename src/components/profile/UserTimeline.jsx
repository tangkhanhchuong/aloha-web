import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { requestGetUserTimeline } from "../../services/user.service";
import { Posts } from "../common/posts/Posts";

export const UserTimeline = ({ userId }) => {
	const {
		data: posts,
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			try {
				if (!userId) {
					return [];
				}
				const data = await requestGetUserTimeline({ userId });
				return data.items;
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	return (
        <>
            <Posts posts={posts} isRefetching={isRefetching} isLoading={isLoading} />
		</>
	);
};
