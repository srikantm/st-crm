import React from "react";
import Grid from '@mui/material/Grid2';
import FormGroup from "@mui/material/FormGroup";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Box, Chip, OutlinedInput } from "@mui/material";
import { font } from "@/app/ui/fonts";


const DepartureCityDateComponent = ({ index, handleChange, cityData, departureCity, departureDate, setShowNextButton }) => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    setShowNextButton(departureCity !== '' && departureCity !== 0);
    return (<>
        <div className="flex flex-grow">
            <div className="p-3 mb-5 basis-1/3">
                <label htmlFor="departureCityLabel" className={`${font.className} mb-2 block text-sm font-medium pl-2 pr-5`}>
                    Departure City
                </label>
                <Select
                    id="departureCity"
                    label="DepartureCity"
                    name="departureCity"
                    defaultValue=""
                    value={departureCity}
                    onChange={(e) => handleChange(e, index, "departureCity")}
                    size="small"
                    sx={{ width: "100%", backgroundColor: "white" }}
                    MenuProps={MenuProps}
                >
                    <MenuItem key={0} value={0}>{'None'}</MenuItem>
                    {cityData.map((data) => (
                        <MenuItem key={data.id} name={data.name} value={data.id}>{data.name}</MenuItem>
                    ))}
                </Select>
                {(departureCity === '' || departureCity === 0) && <label htmlFor="packageName" className={`${font.className} mb-2 block text-sm text-red-500`}>
                    Departure City is Mandatory
                </label>}
            </div>
            <div className="p-3 mb-5 basis-1/3">
                <label htmlFor="departureDate" className={`${font.className} mb-2 block text-sm font-medium pl-2 pr-5`}>
                    Departure Date
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        id="departureDate"
                        name="departureDate"
                        slotProps={{ textField: { size: 'small', }, field: { clearable: true } }}
                        minDate={dayjs()}
                        value={departureDate ? dayjs(departureDate, 'YYYY-MM-DD') : null}
                        format="YYYY-MM-DD"
                        onChange={(e) => handleChange(e, index, "departureDate")}
                        sx={{ backgroundColor: "white" }}
                    />
                </LocalizationProvider>
            </div>
        </div>

    </>);
}
export default DepartureCityDateComponent