import st from './Error.module.css'
import { VscBracketError } from "react-icons/vsc";

interface ErrorProps {
    error: string
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className={st.errorContainer}>
        <h2 className={st.errorTitle}>{error}</h2>
        <VscBracketError size={100} className={st.error} />
    </div>
  )
}

export default Error