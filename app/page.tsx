"use client";
// import TimerCard from "./components/TimerCard";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { Modal } from "antd";
import TimerCard from "./components/TimerCard";

export default function Home() {
  const [modal1Open, setModal1Open] = useState(false);

  return (
    <div className="p-16">
      <div>
        <p className="text-3xl font-bold mb-8 upp">Time plan</p>
        <div
          onClick={() => setModal1Open(true)}
          className="flex w-[200px] h-[200px] text-gray-500 flex-col items-center justify-center gap-2 p-2 rounded-xl cursor-pointer  border border-gray-200 bg-gray-50  hover:bg-gray-100 duration-150 font-semibold text-3xl"
        >
          <FaPlus />
          <p className="text-sm font-medium pt-2 ">Create your time plan</p>
        </div>
      </div>

      <div>
        <Modal
          title="Configure your time plan"
          centered
          style={{ top: 20 }}
          open={modal1Open}
          onOk={() => setModal1Open(false)}
          onCancel={() => setModal1Open(false)}
        >
          <div className="flex flex-col gap-4 py-6">
            <div>
              <label htmlFor="">Name of Your plan</label>
              <input
                type="text"
                className="p-2 border border-gray-300 w-full mt-2"
              />
            </div>
            <div>
              <label htmlFor="">Allocate your time</label>
              <input
                type="text"
                className="p-2 border border-gray-300 w-full mt-2"
              />
            </div>
          </div>
        </Modal>
      </div>
      <div className="flex flex-col mt-8">
        <p className="text-3xl font-bold mb-6">All time Plans</p>
        <div className="flex  gap-8 ">
          <TimerCard />
          <TimerCard />
        </div>
      </div>
    </div>
  );
}
