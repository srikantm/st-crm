import React from "react";
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import FormGroup from "@mui/material/FormGroup";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from '@mui/material/TextField';
import { Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import Paper from '@mui/material/Paper'
import { font } from "../../fonts";


const TourInformationForm = ({ handleChange, tourInformation, setShowNextButton }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    setShowNextButton(tourInformation.tourInclusion !== '' && tourInformation.tourExclusion !== '' && tourInformation.advancePreparation !== ''
        && tourInformation.tourTotalReviews !== '' && tourInformation.tourRating !== ''
    );
    return (
        <>
            <div className="rounded-md p-4 md:p-6 border border-gray-200">
                <div className="border border-gray-200 bg-gray-50 rounded-md">
                    <label htmlFor="flightDetails" className={`${font.className} mb-2 block text-lg text-blue-500 font-medium pl-2 justify-self-center`}>
                        Tour Information*
                    </label>
                    <div className="flex flex-grow">
                        <div className="p-5 mb-5 basis-1/3">
                            <label htmlFor="tourInclusion" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                Tour Inclusion
                            </label>

                            <textarea
                                type="text"
                                className="peer block cursor-pointer w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                name="tourInclusion"
                                placeholder="Tour Inclusion"
                                value={tourInformation.tourInclusion}
                                onChange={(e) => handleChange(e, 0, "tourInclusion")}
                            />
                            {tourInformation.tourInclusion === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>Tour Inclusion is Mandatory </label>}

                        </div>

                        <div className="p-5 mb-5 basis-1/3">
                            <label htmlFor="tourExclusion" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                Tour Exclusion
                            </label>

                            <textarea
                                type="text"
                                className="peer block cursor-pointer w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                name="tourExclusion"
                                placeholder="Tour Exclusion"
                                value={tourInformation.tourExclusion}
                                onChange={(e) => handleChange(e, 0, "tourExclusion")}
                            />
                            {tourInformation.tourExclusion === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>Tour Exclusion is Mandatory </label>}
                        </div>

                        <div className="p-5 mb-5 basis-1/3">
                            <label htmlFor="advancePreparation" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                Advance Preparation
                            </label>

                            <textarea
                                type="text"
                                className="peer block cursor-pointer w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                name="advancePreparation"
                                placeholder="Advance Preparation"
                                value={tourInformation.advancePreparation}
                                onChange={(e) => handleChange(e, 0, "advancePreparation")}
                            />
                            {tourInformation.advancePreparation === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>Advance Preparation is Mandatory </label>}
                        </div>
                    </div>



                    <div className="flex flex-grow">
                        <div className="p-5 mb-5 basis-1/3">
                            <label htmlFor="packageRating" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                Package Rating
                            </label>

                            <input
                                type="number"
                                className="peer block cursor-pointer w-20 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                name="packageRating"
                                value={tourInformation.tourRating}
                                onChange={(e) => handleChange(e, 0, "tourRating")}
                            />
                            {tourInformation.tourRating === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>Tour Rating is Mandatory </label>}
                        </div>
                        <div className="p-5 mb-5 basis-1/3">
                            <label htmlFor="packageReviewCount" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                Package Review Count
                            </label>

                            <input
                                type="number"
                                className="peer block cursor-pointer w-20 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                name="packageReviewCount"
                                value={tourInformation.tourTotalReviews}
                                onChange={(e) => handleChange(e, 0, "tourTotalReviews")}
                            />
                            {tourInformation.tourTotalReviews === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>Total Reviews is Mandatory </label>}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default TourInformationForm;
