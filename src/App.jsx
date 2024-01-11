import NavigationBar from "./components/NavigationBar";
import { ShiftsProvider } from "./context/ShiftsContext";

export default function App() {
  return (
    <ShiftsProvider>
      <div className="min-h-screen flex justify-center p-12 bg-WhiteSmoke">
        <div className="flex flex-col gap-4">
          <NavigationBar />
        </div>
      </div>
    </ShiftsProvider>
  );
}
