"use client";

import { useState } from "react";

import LinkImage from "@/components/link";
import ProgramList from "@/components/program/program-list";
import WorkoutList from "@/components/workout/workout-list";

export default function Home() {
  const [menu, setMenu] = useState("programs");
  function handleClick(m: string) {
    setMenu(m);
  }

  return (
    <>
      <ul className="w-full flex flex-row justify-center items-center border-b border-slate-300">
        <li
          className={`w-1/2 ${
            menu === "programs" ? "bg-slate-300" : ""
          } rounded-t-lg flex flex-row gap-x-1 p-2`}
          onClick={() => handleClick("programs")}
        >
          <h1 className="w-full text-xl text-center font-bold">Plans</h1>
          <LinkImage link="/programs/edit/0" color="blue" img="add" size={20} />
        </li>
        <li
          className={`w-1/2 ${
            menu === "workouts" ? "bg-slate-300" : ""
          } rounded-t-lg flex flex-row gap-x-1 p-2`}
          onClick={() => handleClick("workouts")}
        >
          <h1 className="w-full text-xl text-center font-bold">Séances</h1>
          <LinkImage link="/workouts/edit/0" color="blue" img="add" size={20} />
        </li>
      </ul>

      {menu === "programs" ? <ProgramList /> : null}
      {menu === "workouts" ? <WorkoutList /> : null}
    </>
  );
}
