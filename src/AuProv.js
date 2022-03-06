// I watched this tutorial to create the source code of this Login Screen: https://www.youtube.com/watch?v=X3qyxo_UTR4&ab_channel=DaveGray

import { createContext, useState } from "react";

const AuCon = createContext({});

export const AuProv = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuCon.Provider value={{ auth, setAuth }}>
            {children}
        </AuCon.Provider>
    )
}

export default AuCon;