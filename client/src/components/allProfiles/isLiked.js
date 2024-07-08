export default function isLiked(authId, userId, likes) {
	if (authId === userId) {
		return true;
	}

	if (likes) {
		const findUser = likes.find(user => user === authId);
		if (findUser) {
			return true;
		}
	}

	return false;
}