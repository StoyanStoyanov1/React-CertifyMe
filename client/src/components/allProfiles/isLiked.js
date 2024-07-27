// Function to check if a profile is liked by the authenticated user
export default function isLiked(authId, userId, likes) {
	// If the authenticated user is the owner of the profile, return true
	if (authId === userId) {
		return true;
	}

	// If there are likes, check if the authenticated user's ID is in the likes array
	if (likes) {
		const findUser = likes.find(user => user === authId);
		if (findUser) {
			return true;
		}
	}

	// If none of the above conditions are met, return false
	return false;
}
