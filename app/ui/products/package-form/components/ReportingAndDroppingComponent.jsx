import React from "react";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid2';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Stack } from "@mui/material";
import { font } from "@/app/ui/fonts";


const ReportingAndDroppingComponent = ({ handleChange, data, dataSize, index, update, setShowNextButton }) => {

    setShowNextButton(data.guestType !== '' && data.reportingPoint !== '' && data.droppingPoint !== '');
    return (<>
        <div className="flex flex-grow">
            <div className="p-2 basis-1/4">
                <div className="relative">
                    <label htmlFor="guestType" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                        Guest Type
                    </label>

                    <select
                        id="guestType"
                        name="guestType"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        value={data.guestType}
                        onChange={(e) => handleChange(e, index, "guestType")}
                    >
                        <option value="" disabled>Select Guest</option>
                        <option key={"Scheduled Tour Guests"} value={"Scheduled Tour Guests"}>Scheduled Tour Guests</option>
                        <option key={"Joining & Leaving Guests"} value={"Joining & Leaving Guests"}>Joining & Leaving Guests</option>
                    </select>
                    {data.guestType === ''  && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>Guest Type is Mandatory</label>}
                </div>
            </div>
            <div className="p-3 mb-5 basis-1/4">

                <label htmlFor="reportingPoint" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                    Reporting Point
                </label>

                <input
                    type="text"
                    className="peer block cursor-pointer w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    name="reportingPoint"
                    placeholder="Reporting Point"
                    value={data.reportingPoint}
                    onChange={(e) => handleChange(e, index, "reportingPoint")}
                />
                {data.reportingPoint === ''  && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>ReportingPoint is Mandatory</label>}
            </div>
            <div className="p-3 mb-5 basis-1/4">

                <label htmlFor="droppingPoint" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                    Dropping Point
                </label>

                <input
                    type="text"
                    className="peer block cursor-pointer w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    name="droppingPoint"
                    placeholder="Dropping Point"
                    value={data.droppingPoint}
                    onChange={(e) => handleChange(e, index, "droppingPoint")}
                />
                {data.droppingPoint === ''  && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>DroppingPoint is Mandatory</label>}
            </div>

            <div className="p-2 pl-20 pt-12">
                {dataSize === index + 1 ?
                    <button onClick={() => update(index, "add")}
                        className="bg-blue-200 border-blue-500 text-blue-600 rounded-md w-10 h-7 hover:bg-blue-500 hover:text-white justify-self-end">
                        {<AddIcon />}
                    </button>
                    :
                    <button onClick={() => update(index, "delete")}
                        className="bg-red-200 border-red-500 text-red-600 rounded-md w-10 h-7 hover:bg-red-500 hover:text-white justify-self-end">
                        {<DeleteIcon />}
                    </button>
                }
            </div>
        </div>

    

    </>);
}
export default ReportingAndDroppingComponent;