"use client"

export default function TOSAcceptedWrapper({
    children,
    hideWhenAccepted=true
}) {
    

    let tosAccepted
    if (typeof window !== "undefined") {
        tosAccepted = localStorage.getItem("tos_accepted")
    } else {
        return (<></>)
    }
      
    if (tosAccepted) tosAccepted = tosAccepted === "0.0.1"
    
    if (tosAccepted) {
        if (hideWhenAccepted) {
            return (<></>)
        }
        else {
            return (<>
                {children}
            </>)
        }
    } else {
        if (!hideWhenAccepted) {
            return (<></>)
        }
        else {
            return (<>
                {children}
            </>)
        }
    }
}