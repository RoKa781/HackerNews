import { TbLoaderQuarter } from "react-icons/tb";
import st from './Preload.module.css'

const Preload = () => {
  return (
    <div className={st.preloaderContainer}>
        <TbLoaderQuarter size={100} className={st.preloader} />
    </div>
  )
}

export default Preload