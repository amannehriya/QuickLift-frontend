import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext();

function CaptainContext({ children }) {
    const [captain, setCaptain] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    }
// console.log(captain);

    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain, error, setError, loading, setLoading }}>
            {children}
        </CaptainDataContext.Provider>
    )
}

export default CaptainContext;