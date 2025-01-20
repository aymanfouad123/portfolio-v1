import React from 'react'

function PrettyPrintToggle({ enabled, onToggle }) {
    return (
        <div>
            pretty-print 
            <input type="checkbox" checked={enabled} onChange={(e) => onToggle(e.target.checked)} />
        </div>
    )
}

export default PrettyPrintToggle