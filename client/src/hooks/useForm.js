import {useState} from "react";

// Custom hook for form handling
export default function useForm(submitHandler, initialValues) {
	const [values, setValues] = useState(initialValues);

	// Handler for input change event
	const onChange = (e) => {
		setValues(state => ({
			...state,
			[e.target.name]: e.target.value
		}));
	}

	// Handler for form submit event
	const onSubmit = (e) => {
		e.preventDefault();
		submitHandler(values);
	}

	return {
		values, // Current form values
		onChange, // Function to handle input changes
		onSubmit, // Function to handle form submission
	}
}
