import { navBarItems } from "../../constants/index,jsx";

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <div
      className="flex flex-wrap gap-20 text-2xl p-0 md:p-8 transition-all duration-300"
      onClick={(e) => {
        if (e.target.title === "my") {
          setActiveTab(navBarItems.MY_SHIFTS);
        } else if (e.target.title === "available") {
          setActiveTab(navBarItems.AVAILABLE_SHIFTS);
        }
      }}
    >
      <p
        className={`cursor-pointer ${
          activeTab === navBarItems.MY_SHIFTS ? "text-blue" : "text-blue-50"
        } ${activeTab === navBarItems.MY_SHIFTS ? "active" : ""}`}
        title="my"
      >
        My shifts
      </p>
      <p
        className={`cursor-pointer ${
          activeTab === navBarItems.AVAILABLE_SHIFTS
            ? "text-blue"
            : "text-blue-50"
        } ${activeTab === navBarItems.AVAILABLE_SHIFTS ? "active" : ""}`}
        title="available"
      >
        Available shifts
      </p>
    </div>
  );
};

export default Header;
