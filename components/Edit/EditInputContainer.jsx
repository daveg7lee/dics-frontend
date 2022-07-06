const EditInput = ({ children, name }) => {
  return (
    <div className="flex justify-evenly px-4 mb-2">
      <div className="flex flex-col items-center justify-center w-full mx-2">
        <label className="mb-[5px] text-start w-full">{name}</label>
        {children}
      </div>
    </div>
  );
};

export default EditInput;
