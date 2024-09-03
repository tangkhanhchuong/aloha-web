import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useFollow = () => {
	const queryClient = useQueryClient();

	const { mutate: mutateFollow, isPending: isFollowing } = useMutation({
		mutationFn: async (userId) => {
			try {
				const res = await fetch(`/api/users/mutateFollow/${userId}`, {
					method: "POST",
				});

				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong!");
				}
				return;
			} catch (error) {
				throw new Error(error.message);
			}
		},
		onSuccess: () => {
			Promise.all([
				queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
				queryClient.invalidateQueries({ queryKey: ["authUser"] }),
			]);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { mutateFollow, isFollowing };
};

export default useFollow;
