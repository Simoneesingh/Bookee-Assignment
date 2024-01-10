// // import Area from "./components/Area";
// import NavigationBar from "./components/earlier/NavigationBar";

// import FilterByDate from "./components/earlier/FilterBydate";

// export default function App() {
//   return (
//     <div className="flex justify-center p-12 bg-w3 h-screen">
//       <div className="flex flex-col gap-4">
//         <NavigationBar />
//         {/* <Area /> */}
//         <FilterByDate />
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./components/header";
import AvailableShifts from "./components/shifts/availableShifts";
import MyShifts from "./components/shifts/myShifts";
import { navBarItems } from "./constants/index,jsx";
import ShiftsContext from "./store/context/ShiftsContext";
import { useApp } from "./useApp";

function App() {
  const [shifts, refreshShifts] = useApp();

  const [activeTab, setActiveTab] = useState(navBarItems.MY_SHIFTS);

  return (
    <ShiftsContext.Provider value={shifts}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="max-w-2xl mx-auto bg-white border-2 border-Blue100 rounded p-5 shadow-md my-4">
        {activeTab === navBarItems.MY_SHIFTS && (
          <MyShifts refreshAPIResults={refreshShifts} />
        )}
        {activeTab === navBarItems.AVAILABLE_SHIFTS && (
          <AvailableShifts refreshAPIResults={refreshShifts} />
        )}
      </div>
      <Toaster position={"bottom-center"} />
    </ShiftsContext.Provider>
  );
}

export default App;
