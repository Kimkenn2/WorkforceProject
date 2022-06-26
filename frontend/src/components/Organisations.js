

function Organisations({org}) {
    return (
        <div>
            <span>{org.name}   </span>
            <span className="orgButton">Edit </span>
            <span className="orgButton">Join</span>
        </div>
    )
}

export default Organisations