import ThemeToggler from '../ThemeToggler/ThemeToggler'
import st from './AppHeader.module.css'

const AppHeader: React.FC = () => {
  return (
    <header className={st.header}>
          <h1 className={st.homeTitle}>Hacker News</h1>
          <ThemeToggler />
    </header>

  )
}

export default AppHeader