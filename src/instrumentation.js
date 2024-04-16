import { CreateServer } from "./server/socket"

export function register () {
    console.log("BOOTING UP...")

    console.log(`Starting up in [${process.env.ENVIRONMENT === 'production' ? 'production' : 'development'}]`)
    CreateServer()
    
}