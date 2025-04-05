"use client"

import { EmployeeProps } from "@/utils/employee.type";
import Link from "next/link";
import { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";

export function ListEmployee({ employee, token }: { employee: EmployeeProps; token: string|undefined } ) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState({ ...employee });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditedEmployee({
            ...editedEmployee,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        await fetch('/api/employee', {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(editedEmployee),
        })

        setIsEditing(false);
    };

    const handleEditing = () => {
        setIsEditing(true);
    };

    return (
        <tr
            className="text-slate-800 font-medium border-b-2 border-b-slate-300 h-16 
                last:border-b-0 bg-slate-200 hover:bg-gray-300 duration-300">
            <td className="text-left pl-2 border">
                {isEditing ? (
                    <input
                        type="text"
                        name="full_name"
                        value={editedEmployee.full_name}
                        onChange={handleChange}
                        className="border outline-none focus:border-blue-400 duration-300 rounded"
                    />
                ) : (
                    editedEmployee.full_name
                )}
            </td>
            <td className="text-left hidden sm:table-cell">
                {isEditing ? (
                    <input
                        type="text"
                        name="function"
                        value={editedEmployee.function}
                        onChange={handleChange}
                        className="border outline-none focus:border-blue-400 rounded pl-0"
                    />
                ) : (
                    editedEmployee.function
                )}
            </td>
            <td className="text-left hidden sm:table-cell">
                {isEditing ? (
                    <input
                        type="email"
                        name="email"
                        value={editedEmployee.email}
                        onChange={handleChange}
                        className="border outline-none focus:border-blue-400 rounded pl-0"
                    />
                ) : (
                    editedEmployee.email
                )}
            </td>
            <td className="text-left hidden sm:table-cell">
                {isEditing ? (
                    <select
                        name="available"
                        value={editedEmployee.available}
                        onChange={handleChange}
                        className="border outline-none focus:border-blue-400 rounded pl-0"
                    >
                        <option value="1">Available</option>
                        <option value="0">Not Available</option>
                    </select>
                ) : (
                    editedEmployee.available == 0 ? 'Not Available' : 'Available'
                )}
            </td>
            <td className="text-left">
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className="mr-2" title="save">
                            <FaSave size={20} color="#1637f3" />
                        </button>
                        <button onClick={() => setIsEditing(false)} title="cancel">
                            <MdCancel size={20} color="#d9534f" />
                        </button>
                    </>
                ) : (
                    <div className="flex">
                        <button onClick={() => handleEditing()} className="mr-2" title="edit">
                            <FaEdit size={20} color="#007e1f" />
                        </button>
                        <Link href={`/dashboard/employee/settings/${employee.id}`} className="mr-2" title="settings">
                            <IoSettingsSharp size={20} color="#5e5d5d" />
                        </Link>
                        <Link href={`/dashboard/employee/schedule/${employee.id}`}>
                            <RiCalendarScheduleLine size={20} color="#742100" />
                        </Link>
                    </div>
                )}
            </td>
        </tr>
    )
}