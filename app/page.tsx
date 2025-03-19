import TimerCard from "./components/TimerCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="p-10 text-3xl font-bold">Time Board</p>
      <div className="flex  gap-8">
      <TimerCard />
      <TimerCard />
      </div>
    </div>
  );
}
