'use client'

import { BranchTable } from "@/app/lib/definitions";
import { useAppStore } from "@/app/lib/store";
import { revalidatePath } from "next/cache";
import React from "react";

const BranchSelector = ({ branches }:
    { branches: BranchTable[]}) => {
    const {branchId, updateBranchId} = useAppStore();

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        updateBranchId(Number(e.target.value));
    };

    return (

        <div className="pr-5 pb-2 ">
            <select
                id="branchId"
                name="branchId"
                defaultValue={branchId}
                onChange={(e) => handleChange(e)}
                className="peer block w-full h-9 cursor-pointer rounded-md border border-gray-200 py-2 text-xs outline-2 placeholder:text-gray-500"
            >
                <option value="" disabled>Select Branch</option>
                <option value={0}>All Bracnhes</option>
                {branches.map((data, i) => (
                    <option key={i} value={data.id}>{data.name}</option>
                ))}

            </select>
        </div>
    );
};

export default BranchSelector;
