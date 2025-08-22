import React, { useState } from 'react'


export default function SearchBar({ onSearch }) {
    const [input, setInput] = useState('')


    function submit(e) {
        e.preventDefault()
        if (!input.trim()) return
        onSearch(input.trim())
        // keep the input if you want; clearing makes it feel like a search box
        setInput('')
    }


    return (
        <form className="search" onSubmit={submit}>
            <input
                aria-label="Search city"
                className="search-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter city (e.g. London)"
            />
            <button className="btn" type="submit">
                Search
            </button>
        </form>
    )
}