interface TimeParts {
    hours: string;
    minutes: string;
    seconds: string;
  }
  
  const formatTime = (totalSeconds: number): TimeParts => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
  
    return { hours, minutes, seconds };
  };
  
  export default formatTime;
  