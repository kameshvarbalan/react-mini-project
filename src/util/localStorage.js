import { useEffect, useState } from "react"

const USER_DB_KEY = "Account-Database"
const AUTH_USER_KEY = "Account-Authentication"

export function logoutUser() {
    localStorage.removeItem(AUTH_USER_KEY)
}

export function useLoggedInUser() {
    const [username, setUsername] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState('unknown')

    useEffect(() => {
        const username = localStorage.getItem(AUTH_USER_KEY)
        if(username) {
            setUsername(username)
            setIsLoggedIn('yes')
        }
        else {
            setIsLoggedIn('no')
        }
    }, [])

    return [
        isLoggedIn,
        username
    ]
}

export function _dumpLocalStorage() {
    console.log(localStorage.getItem(USER_DB_KEY))
}

export function loginUser({username,password}) {
    let usersKey = localStorage.getItem(USER_DB_KEY)
    if(!usersKey) {
        return {
            status: "error",
            error: "Invalid Creditials"
        }
    }
    const usersArray = JSON.parse(usersKey)
    const user = usersArray.find(user => user.username === username && user.password === password)
    if(user) {
        localStorage.setItem(AUTH_USER_KEY,username)
        return {
            status: "success"
        }

    }
    else {
        return {
            status: "error",
            error: "Invalid Credintials"
        }
    }
}

export function createUser({username,password}) {
    let usersKey = localStorage.getItem(USER_DB_KEY)
    if(!usersKey) {
        usersKey = "[]"
    }
    const usersArray = JSON.parse(usersKey)
    const duplicate = usersArray.find(user => user.username === username)
    if(username === ''){
        return{
            status: "error",
            error: "Enter username"
        }
    }
    else if(duplicate) {
        return {
            status: "error",
            error: "User already exists"
        }
    }
    if(password.length < 5) {
        return {
            status: "error",
            error: "Password too weak"
        }
    }
    usersArray.push({username,password})
    localStorage.setItem(USER_DB_KEY, JSON.stringify(usersArray))
    return {
        status: 'success'
    }
}