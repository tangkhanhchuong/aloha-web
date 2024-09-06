import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import _ from "lodash";

import { requestUpdateUser } from "../services/user.service";

const useUpdateUserProfile = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: mutateUpdateProfile, isPending: isUpdatingProfile } = useMutation({
		mutationFn: async (updatedUser) => {
			try {
				const data = await requestUpdateUser(_.omitBy(updatedUser, _.isNil));
				return data;
			} catch (error) {
				throw new Error(error.message);
			}
		},
		onSuccess: () => {
			toast.success("Profile updated successfully");
			Promise.all([
				queryClient.invalidateQueries({ queryKey: ["authUser"] }),
				queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
			]);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { mutateUpdateProfile, isUpdatingProfile };
};

export default useUpdateUserProfile;
