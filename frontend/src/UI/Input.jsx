const Input = (props) => {
  return (
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      className={`w-full py-1.5 px-3 bg-white border border-gray-200 rounded-tr-md rounded-br-md outline-none text-gray-600 ${
        props.className || ""
      } ${
        props.inputError && "!bg-red-100 border-red-200 focus:!bg-orange-100"
      }`}
    />
  );
};

export default Input;
