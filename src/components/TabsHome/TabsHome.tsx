import st from "./TabsHome.module.css";

interface ITabsProps {
  tabsData: string[];
  currentTab: number;
  setCurrentTab: (index: number) => void;
}

const Tabs: React.FC<ITabsProps> = ({
  tabsData,
  currentTab,
  setCurrentTab,
}) => {
  return (
    <div>
      <div className={st.tabs}>
        {tabsData.map((tab, index) => (
          <button
            key={index}
            className={`${st.tabButton} ${
              index === currentTab ? st.active : ""
            }`}
            onClick={() => setCurrentTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
