import React, { useEffect, useState } from "react"
import { database, auth, db } from "./firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"

const Context = React.createContext()

function ContextProvider({children}) {

    const [user, setUser] = useState('')
    const [subscription, setSubscription] = useState()

    useEffect(() => {
        getCustomerSubscription().then(sub => setSubscription(sub))
    }, [user])

    onAuthStateChanged(auth, user => {
        if (user) {
            setUser(user)
        } else {
            setUser('')
        }
    })

    function signOutUser() {
        signOut(auth).then(() => window.location.assign('/'))
    }

    async function getCustomerSubscription() {
        await auth.currentUser.getIdToken(true);
        const decodedToken = await auth.currentUser.getIdTokenResult(true);
        return decodedToken.claims.stripeRole;
    }

    const contextValues = {
        user,
        database,
        db,
        signOutUser,
        subscription
    }

    return <Context.Provider value={contextValues}>
        {children}
    </Context.Provider>
}

export { Context, ContextProvider }