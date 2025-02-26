"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Header } from "@/components/header";
import { Time } from "@/components/time";
import { Day } from "@/components/day";
import { useAuth } from "../context/AuthContext";
import { DashboardHeader } from "./components/header";
import { Container } from "@/components/container";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdOutlineViewHeadline } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";

export default function Dashboard() {
  return (
    <Container>
        <main className="text-slate-200">

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Employees</h1>
                <div className="flex items-center gap-3">
                    <Link href='/dashboard/employe/new' className="flex bg-blue-500 px-4 py-1 rounded text-white gap-2">
                        <IoIosAddCircle size={20} color="#E5E7EB"/>
                        New employee
                    </Link>
                </div>
            </div>

            <table className="min-w-full my-2">
                <thead>
                    <tr>
                        <th className="font-medium text-left pl-1">EMPLOYEE</th>
                        <th className="font-medium text-left hidden sm:block">FUNCTION</th>
                        <th className="font-medium text-left">STATUS</th>
                        <th className="font-medium text-left">#</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="text-slate-800 font-medium border-b-2 border-b-slate-300 h-16 last:border-b-0 bg-slate-200 hover:bg-gray-400 duration-300">
                        <td className="text-left pl-1">
                            Anacleto
                        </td>
                        <td className="text-left hidden sm:table-cell">
                            Doctor Specialist
                        </td>
                        <td className="text-left">
                            Availiable
                        </td>
                        <td className="text-left">
                            {/* edit profile and setting*/}
                            <button className="mr-3">
                                <FaEdit size={20} color="#005c17"/>
                            </button>
                            {/* view profile and setting*/}
                            <button className="mr-3">
                                <MdOutlineViewHeadline size={20} color="#2e2e2e"/>
                            </button>
                            {/** go to schedule */}
                            <button>
                                <RiCalendarScheduleLine size={20} color="#5f1b00"/>
                            </button>
                        </td>
                    </tr>
                    <tr className="text-slate-800 font-medium border-b-2 border-b-slate-300 h-16 last:border-b-0 bg-slate-200 hover:bg-gray-400 duration-300">
                        <td className="text-left pl-1">
                            Anacleto
                        </td>
                        <td className="text-left hidden sm:table-cell">
                            Doctor Specialist
                        </td>
                        <td className="text-left">
                            Availiable
                        </td>
                        <td className="text-left">
                            {/* edit profile and setting*/}
                            <button className="mr-3">
                                <FaEdit size={20} color="#005c17"/>
                            </button>
                            {/* view profile and setting*/}
                            <button className="mr-3">
                                <MdOutlineViewHeadline size={20} color="#2e2e2e"/>
                            </button>
                            {/** go to schedule */}
                            <button>
                                <RiCalendarScheduleLine size={20} color="#5f1b00"/>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    </Container>
  );
};
