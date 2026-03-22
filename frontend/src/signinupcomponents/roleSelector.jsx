function RoleSelector({options, selected, setSelected, bgColor, borderColor, name}){
    return (

        <div className="mb-4">

            {/* LABEL */}
            <label htmlFor="role" className="block text-gray-700 font-medium mb-1">
                Role
            </label>

            {/* BUTTONS */}
            <div className="flex gap-2">
                {options.map((currentrole) => (
                    <button 
                        className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                        key = {currentrole}
                        onClick = {() => setSelected(currentrole)}
                        style={
                            selected === currentrole?
                            {backgroundColor : bgColor, color : "white"} : { border : `1px solid ${borderColor}`, color : borderColor} 
                        }
                    >
                        {currentrole}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default RoleSelector