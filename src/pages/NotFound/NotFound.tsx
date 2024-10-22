import { TbError404Off } from "react-icons/tb";
import st from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={st.notfoundContainer}>
        <h2 className={st.notFoundTitle}>Not found</h2>
        <TbError404Off size={300} className={st.notFound} />
    </div>
  )
}

export default NotFound