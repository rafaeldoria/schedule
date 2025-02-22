"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Header } from "@/components/header";
import { Time } from "@/components/time";
import { Day } from "@/components/day";
import { useAuth } from "../context/AuthContext";
import { DashboardHeader } from "./components/header";

export default function Dashboard() {
  return (
    <main>
        <Header />

        <DashboardHeader />
        
    </main>
  );
};
