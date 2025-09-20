import React from "react";
import Grid from '@mui/material/Grid2';
import { Button, FormGroup, FormLabel, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { font } from "../../fonts";

const TourPricing = ({ handleChange, tourPricing, update, setShowNextButton, uploadedImage }) => {
    const isValidRow = (row) => {
        return row.hotelStarRating !== ''
            && row.singleSharingPrice !== ''
            && row.doubleSharingPrice !== ''
            && row.threeSharingPrice !== ''
            && row.childWithoutBedPrice !== ''
            && row.childWithBedPrice !== ''
            && row.infantPrice !== '';
    };
    const allValid = tourPricing.length > 0 && tourPricing.every(isValidRow) && uploadedImage !== '';
    setShowNextButton(allValid);
    const theme = useTheme();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 150,
            },
        },
    };


    return (
        <>

            <div className="rounded-md p-4 md:p-6 border border-gray-200">
                <div className="pt-5 pb-5 border border-gray-200 rounded-md bg-gray-50">
                    <label htmlFor="itineraryDetails" className={`${font.className} mb-2 block text-lg text-blue-500 font-light pl-2 justify-self-center`}>
                        Tour Pricing*
                    </label>
                    {/* <div className="p-3 mb-5">
                        <label className={`${font.className} mb-2 block text-sm font-medium`}>
                            Selected Image
                        </label>
                        <div className="text-sm pb-2">
                            {uploadedImage ? uploadedImage : 'No image selected'}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                            onChange={(e) => {
                                const file = e.target.files && e.target.files[0];
                                handleChange({ target: { name: 'packageImage', value: file ? file.name : '' } });
                            }}
                        />
                        {uploadedImage === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Image is Mandatory</label>}
                    </div> */}
                    {tourPricing.map((data, index) => {
                        return (
                            <>
                                <div className="flex flex-grow">
                                    <div className="pt-3 pl-2 basis-1/7">
                                        <div className="relative ">
                                            <label htmlFor="itineraryCountrySelect" className={`${font.className} mb-2 block text-xs font-light pl-2`}>
                                                Hotel Star Rating
                                            </label>

                                            <Select
                                                labelId="hotelStarRating"
                                                id="hotelStarRating"
                                                name="hotelStarRating"
                                                defaultValue=""
                                                label="Select City"
                                                onChange={(e) => handleChange(e, index, "hotelStarRating")}
                                                value={data.hotelStarRating}
                                                size="small"
                                                MenuProps={MenuProps}
                                                sx={{ width: '100%', fontSize: '12px' }}
                                            >
                                                ,
                                                <MenuItem value={"FIVE_STAR"} sx={{ fontSize: '12px' }}>FIVE STAR</MenuItem>
                                                <MenuItem value={"FOUR_STAR"} sx={{ fontSize: '12px' }}>FOUR STAR</MenuItem>
                                                <MenuItem value={"THREE_STAR"} sx={{ fontSize: '12px' }}>THREE STAR</MenuItem>

                                </Select>
                                {data.hotelStarRating === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Hotel Star Rating is Mandatory </label>}

                                        </div>
                                    </div>


                                    <div className="p-3 mb-5 basis-1/8">
                                        <label htmlFor="packageName" className={`${font.className} mb-2 block text-xs font-light`}>
                                            Single Sharing Price*
                                        </label>
                                        <input
                                            type="number"
                                            className="peer blockw-10/12 cursor-pointer rounded-md border border-gray-200  text-xs outline-2 placeholder:text-gray-500"
                                            name="singleSharingPrice"
                                            placeholder="Add Price"
                                            onChange={(e) => handleChange(e, index, "singleSharingPrice")}
                                            value={data.singleSharingPrice}
                                        />
                                        {data.singleSharingPrice === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Single Sharing Price is Mandatory</label>}
                                    </div>

                                    <div className="p-3 mb-5 basis-1/8">
                                        <label htmlFor="packageName" className={`${font.className} mb-2 block text-xs font-light`}>
                                            Two Sharing Price*
                                        </label>
                                        <input
                                            type="number"
                                            className="peer block w-10/12 cursor-pointer rounded-md border border-gray-200  text-xs outline-2 placeholder:text-gray-500"
                                            name="doubleSharingPrice"
                                            placeholder="Add Price"
                                            onChange={(e) => handleChange(e, index, "doubleSharingPrice")}
                                            value={data.doubleSharingPrice}
                                        />
                                        {data.doubleSharingPrice === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Two Sharing Price is Mandatory</label>}
                                    </div>

                                    <div className="p-3 mb-5 basis-1/8">
                                        <label htmlFor="threeSharingPrice" className={`${font.className} mb-2 block text-xs font-light`}>
                                            Three Sharing Price*
                                        </label>
                                        <input
                                            type="number"
                                            className="peer block w-10/12 cursor-pointer rounded-md border border-gray-200 text-xs outline-2 placeholder:text-gray-500"
                                            name="threeSharingPrice"
                                            placeholder="Add Price"
                                            onChange={(e) => handleChange(e, index, "threeSharingPrice")}
                                            value={data.threeSharingPrice}
                                        />
                                        {data.threeSharingPrice === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Three Sharing Price is Mandatory</label>}
                                    </div>

                                    <div className="p-3 mb-5 basis-1/8">
                                        <label htmlFor="childWithoutBedPrice" className={`${font.className} mb-2 block text-xs font-light`}>
                                            Child Price (No extra bed)
                                        </label>
                                        <input
                                            type="number"
                                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-xs outline-2 placeholder:text-gray-500"
                                            name="childWithoutBedPrice"
                                            placeholder="Add Price"
                                            onChange={(e) => handleChange(e, index, "childWithoutBedPrice")}
                                            value={data.childWithoutBedPrice}
                                        />
                                        {data.childWithoutBedPrice === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Child (No bed) Price is Mandatory</label>}
                                    </div>

                                    <div className="p-3 mb-5 basis-1/8">
                                        <label htmlFor="childWithBedPrice" className={`${font.className} mb-2 block text-xs font-light`}>
                                            Child Price (Extra bed)
                                        </label>
                                        <input
                                            type="number"
                                            className="peer block w-10/12 cursor-pointer rounded-md border border-gray-200 text-xs outline-2 placeholder:text-gray-500"
                                            name="childWithBedPrice"
                                            placeholder="Add Price"
                                            onChange={(e) => handleChange(e, index, "childWithBedPrice")}
                                            value={data.childWithBedPrice}
                                        />
                                        {data.childWithBedPrice === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Child (Extra bed) Price is Mandatory</label>}
                                    </div>

                                    <div className="p-3 mb-5 basis-1/8">
                                        <label htmlFor="infantPrice" className={`${font.className} mb-2 block text-xs font-light`}>
                                            Infant Price
                                        </label>
                                        <input
                                            type="number"
                                            className="peer block w-10/12 cursor-pointer rounded-md border border-gray-200 text-xs outline-2 placeholder:text-gray-500"
                                            name="infantPrice"
                                            placeholder="Add Price"
                                            onChange={(e) => handleChange(e, index, "infantPrice")}
                                            value={data.infantPrice}
                                        />
                                        {data.infantPrice === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-xs text-red-500`}>Infant Price is Mandatory</label>}
                                    </div>
                                    <div className="pt-9 basis-1/8">
                                        {tourPricing.length === index + 1 ?
                                            <div className="flex flex-grow">
                                                <button onClick={() => update(index, "add")}
                                                    className="bg-blue-200 border-blue-500 text-blue-600 rounded-md w-7 h-7 hover:bg-blue-500 hover:text-white justify-self-end">
                                                    {<AddIcon />}
                                                </button>
                                                
                                            </div>
                                            :
                                            <button onClick={() => update(index, "delete")}
                                                className="bg-red-200 border-red-500 text-red-600 rounded-md w-7 h-7 hover:bg-red-500 hover:text-white justify-self-end">
                                                {<DeleteIcon />}
                                            </button>
                                        }
                                    </div>

                                </div>
                                <div className="flex flex-grow">




                                </div>

                            </>
                        )
                    })}
                </div>
            </div>

        </>
    );
};

export default TourPricing;