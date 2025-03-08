import { CustomKanban } from "./components/CustomKanban";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="p-10 text-3xl font-bold">Kanban Board</p>
      
      <CustomKanban />
    </div>
  );
}
