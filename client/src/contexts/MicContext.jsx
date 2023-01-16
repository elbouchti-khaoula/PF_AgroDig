import React, { useContext, useEffect, useState } from "react";


const MicContext = React.createContext();

export const useMic = () => {
	return useContext(MicContext);
};

export const MicProvider = ({ children }) => {
    
const [showMicModal, setShowMicModal] = useState(false);

return (
    <MicContext.Provider
        value={{
            showMicModal,
            setShowMicModal
        }}
    >
        {children}
    </MicContext.Provider>
);

}
