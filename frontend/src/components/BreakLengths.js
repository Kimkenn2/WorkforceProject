import { useState } from 'react'

function BreakLengths({tags, setTags}){

    function handleKeyDown(e){
        // If user did not press enter key, return
        if(e.key !== 'Enter') return
        // Get the value of the input
        const value = e.target.value
        // If the value is empty, return
        if(!value.trim()) return
        // Add the value to the tags array
        setTags([...tags, value])
        // Clear the input
        e.target.value = ''
    }
    function removeTag(index){
        setTags(tags.filter((el, i) => i !== index))
    }

    return (
        <div className="breaks-input-container">
             { tags.map((tag, index) => (
            <div className="tag-item" key={index}>
                <span className="text">{tag}</span>
                <span className="close" onClick={() => removeTag(index)}>&times;</span>
            </div>
        )) }
            <input onKeyDown={(e) => handleKeyDown(e)} className="breaks-input" placeholder="Add 1 or More Breaks" />
        </div>
    )
}

export default BreakLengths