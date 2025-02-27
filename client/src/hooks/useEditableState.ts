import { useState } from 'react';

export function useEditableState() {
	const [isEditing, setIsEditing] = useState(false);
	return { isEditing, setIsEditing };
}