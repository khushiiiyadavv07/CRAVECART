
function InputElement({label, placeholder, value, onChange, type, id,maxlength, required}){
    
    return(
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
                {label}
            </label>
            <input 
               id = {id} 
               type = {type}
               placeholder = {placeholder}
               value = {value}
               onChange = {onChange}
               maxLength = {maxlength} 
               className="w-full rounded-lg px-3 py-2 border border-[#ddd] focus:outline-none focus:border-[#064d4f] focus:outline-none"
               required = {required}
            />
        </div>
    );
}

export default InputElement