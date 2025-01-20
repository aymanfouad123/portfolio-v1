import { codeSnippets } from "../codeSnippets"

function CodeView({ language }) {
    return (
        <div>
            <pre>{codeSnippets[language]}</pre>
        </div>
    )
}

export default CodeView