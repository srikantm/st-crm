import React, { useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormGroup from "@mui/material/FormGroup";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Typography, Box, useTheme, Chip, Stack, Button } from "@mui/material";
import { tokens } from "../theme";
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { font } from "@/app/ui/fonts";

const ItineraryForm = ({ handleChange, itinerary, dataSize, index, update, selectedCities, setShowNextButton }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
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
    setShowNextButton(itinerary.itineraryTitle !== '' && itinerary.description !== '' &&  itinerary.cityIds.length > 0);
    return (
        <>
            <div className="border border-gray-200 bg-gray-50 rounded-md">
            <label htmlFor="reportingAndDropping" className={`${font.className} mb-2 block text-lg text-blue-500 font-medium pt-3 pl-2 justify-self-center`}>
                                 Day : { index+1 } Itinerary
                            </label>
            <div className="flex flex-grow">
                <div className="p-2 basis-1/3">
                    <label htmlFor="guestType" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                        Itinerary Title
                    </label>
                    <input
                        type="text"
                        className="peer block cursor-pointer w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        name="itineraryTitle"
                        placeholder="Title"
                        value={itinerary.itineraryTitle}
                        onChange={(e) => handleChange(e, index, "itineraryTitle")}
                    />
                    {itinerary.itineraryTitle === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>Itinerary Title is Mandatory</label>}
                </div>

                <div className="p-2 basis-1/3">
                    <label htmlFor="itineraryCity" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                        City
                    </label>
                    <Select
                        id="itineraryCity"
                        name="itineraryCity"
                        label="Select City"
                        onChange={(e) => handleChange(e, index, "itineraryCityIds")}
                        value={itinerary.cityIds}
                        size="small"
                        defaultValue=""
                        multiple
                        sx={{ width: '100%', backgroundColor: "white" }}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value}
                                        label={selectedCities.length > 0 && selectedCities.find((item) => item.id === value).name} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {selectedCities.map((data) => (
                            <MenuItem key={data.id} name={data.name} value={data.id}>{data.name}</MenuItem>
                        ))}
                    </Select>
                    {itinerary.cityIds.length === 0 && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>Itinerary City is Mandatory</label>}
                </div>


            </div>
            <div className="flex flex-grow">
                <div className="p-2 basis-1/2">
                    <label htmlFor="itineraryDescription" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                        Itinerary Description
                    </label>
                    <textarea
                        type="text"
                        className="peer block cursor-pointer w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        name="itineraryDescription"
                        placeholder="Description"
                        value={itinerary.description}
                        onChange={(e) => handleChange(e, index, "itineraryDescription")}
                    />
                    {itinerary.description === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>Itinerary Description is Mandatory</label>}
                </div>
                <div className="p-2 basis-1/2">
                    <label htmlFor="itineraryNote" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                        Note
                    </label>
                    <textarea
                        type="text"
                        className="peer block cursor-pointer w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        name="itineraryNote"
                        placeholder="Note"
                        value={itinerary.note}
                        onChange={(e) => handleChange(e, index, "itineraryNote")}
                    />
                </div>
            </div>



            {itinerary.itineraryAddons.map((data, ni) => {
                return (
                    <>
                        <div className="flex flex-grow pt-4 pb-4">
                            <div className="p-2 basis-1/3">
                                <label htmlFor="guestType" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                    AddOn Type
                                </label>
                                <Select
                                    labelId="addOnType"
                                    id="addOnType"
                                    name="addOnType"
                                    defaultValue=""
                                    label="Select City"
                                    sx={{ width: "70%", backgroundColor: "white", }}
                                    onChange={(e) => handleChange(e, index, "addOnType", ni)}
                                    value={data.itineraryAddonType}
                                    size="small"
                                    MenuProps={MenuProps}
                                >
                                    ,
                                    <MenuItem value={"BREAKFAST"}>BREAKFAST</MenuItem>
                                    <MenuItem value={"LUNCH"}>LUNCH</MenuItem>
                                    <MenuItem value={"DINNER"}>DINNER</MenuItem>
                                    <MenuItem value={"COFFEE"}>COFFEE</MenuItem>
                                    <MenuItem value={"ACTIVITY"}>ACTIVITY</MenuItem>
                                    <MenuItem value={"SIGHTSEEING"}>SIGHTSEEING</MenuItem>
                                    <MenuItem value={"PRIVATE_TRANSFER"}>PRIVATE_TRANSFER</MenuItem>
                                    <MenuItem value={"TRANSFER"}>TRANSFER</MenuItem>
                                    <MenuItem value={"STAY"}>STAY</MenuItem>
                                    <MenuItem value={"BREAKFAST_DINNER"}>BREAKFAST_DINNER</MenuItem>
                                    <MenuItem value={"BREAKFAST_LUNCH_DINNER"}>BREAKFAST_LUNCH_DINNER</MenuItem>
                                </Select>
                            </div>

                            <div className="p-2 basis-1/3">
                                <label htmlFor="addOnDescription" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                    AddOn Details
                                </label>
                                <input
                                    type="text"
                                    className="peer block cursor-pointer w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
                                    name="addOnDescription"
                                    placeholder="Description"
                                    value={data.description}
                                    onChange={(e) => handleChange(e, index, "addOnDescription", ni)}
                                />
                            </div>
                            <div className="p-2 basis-1/3 pl-20 pt-12">

                                {itinerary.itineraryAddons.length === ni + 1 ?
                                    <button onClick={() => update(index, "addAddOn", ni)}
                                        className="bg-blue-200 border-blue-500 text-blue-600 rounded-md w-10 h-7 hover:bg-blue-500 hover:text-white justify-self-end">
                                        {<AddIcon />}
                                    </button>
                                    :
                                    <button onClick={() => update(index, "deleteAddOn", ni)}
                                        className="bg-red-200 border-red-500 text-red-600 rounded-md w-10 h-7 hover:bg-red-500 hover:text-white justify-self-end">
                                        {<DeleteIcon />}
                                    </button>
                                }
                            </div>

                        </div>
                    </>

                )
            })}


            <div className="pt-5 flex flex-grow">
                <div className="p-2 basis-1/4"></div>
                <div className="p-2 basis-1/4"></div>
                <div className="p-2 basis-1/4"></div>
                <div className="p-2 basis-1/4 pb-3">
                    {dataSize === index + 1 ?
                        <Stack direction="row" alignContent={"center"} spacing={1}>
                            

                            <button onClick={() => update(index, "add")}
                                className="bg-blue-200 border-blue-500 text-blue-600 text-sm rounded-md w-40 h-9 hover:bg-blue-500 hover:text-white justify-self-end">
                                {"Add Itinerary "} {<AddIcon label="Add Itinerary}" />}
                            </button>
                            {1 < index + 1 && <button onClick={() => update(index, "delete")}
                                className="bg-red-200 border-red-500 text-red-600 text-sm rounded-md w-40 h-9 hover:bg-red-500 hover:text-white justify-self-end">
                                {"Delete Itinerary"}{<DeleteIcon label="Delete Itinerary}" />}
                            </button>
                            }
                        </Stack>
                        :

                        <button onClick={() => update(index, "delete")}
                            className="bg-red-200 border-red-500 text-red-600 text-sm rounded-md w-40 h-9 hover:bg-red-500 hover:text-white justify-self-end">
                            {"Delete Itinerary "}<DeleteIcon />
                        </button>
                    }
                </div>
            </div>

            </div>

        </>
    );
}
export default ItineraryForm;