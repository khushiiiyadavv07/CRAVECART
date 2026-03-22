
function InputElement({label, placeholder, value, onChange, type, id}){
    
    return(
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
                {label}
            </label>
            <input 
               id = {id} 
               type = {type}
               placeholder = {placeholder}
               value = {value}
               onChange = {onChange}
               className="w-full rounded-lg px-3 py-2 border border-[#ddd] focus:outline-none focus:border-orange-500"
            />
        </div>
    );
}

export default InputElement