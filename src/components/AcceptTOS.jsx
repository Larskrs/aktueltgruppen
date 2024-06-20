"use client"
import { useState } from "react"

export default function Home({children}) {
  let value
  // Get the value from local storage if it exists
  value = localStorage.getItem("tos_accepted") || ""


  // When user submits the form, save the favorite number to the local storage
  const saveToLocalStorage = e => {
    console.log("Setting tos_accepted")
    localStorage.setItem("tos_accepted", "0.0.1")
    console.log(localStorage.getItem("tos_accepted"))
  }

  return (
      <form onSubmit={saveToLocalStorage}>
        <button type="submit" >{children}</button>
      </form>
  )
}
