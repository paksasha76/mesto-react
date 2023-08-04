function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  function handleChange(event) {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  }

  return { values, handleChange };
}

export default useForm;
