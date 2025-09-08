import React, { } from "react";
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';
import { Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import AccomodationComponent from "./components/AccomodationComponent";
import ReportingAndDroppingComponent from "./components/ReportingAndDroppingComponent";
import { font } from "../../fonts";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { DatePicker } from "antd";



const TourDetailsForm = ({ handleChange, flightDetails, accomodationDetailsData, updateAccomodationDetailsComponent,
    reportingAndDroppingData, updateReportingAndDroppingComponent, setShowNextButton }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    

    return (
        <>
            <div className="rounded-md p-4 md:p-6 border border-gray-200">
                <div className="bg-gray-50 border border-gray-200 rounded-md">
                    <label htmlFor="flightDetails" className={`${font.className} mb-2 block text-lg text-blue-500 font-medium pt-3 pl-2 justify-self-center`}>
                        Flight Details*
                    </label>

                    <div className="flex flex-grow">
                        <div className="p-5 mb-5 basis-1/3">
                            <label htmlFor="flightSource" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                Source
                            </label>

                            <input
                                type="text"
                                className="peer block cursor-pointer w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                name="flightSource"
                                placeholder="Enter Source"
                                value={flightDetails.source}
                                onChange={(e) => handleChange(e, 0, "flightSource")}
                            />
                        </div>
                        <div className="p-5 mb-5 basis-1/3">

                            <label htmlFor="flightDestination" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                Destination
                            </label>

                            <input
                                type="text"
                                className="peer block cursor-pointer w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                name="flightDestination"
                                placeholder="Enter Destination"
                                value={flightDetails.destination}
                                onChange={(e) => handleChange(e, 0, "flightDestination")}
                            />
                        </div>

                        <div className="p-5 mb-5 basis-1/3">
                            <div className="relative">
                                <label htmlFor="flightDestination" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                    Airline
                                </label>

                                <PaperAirplaneIcon className="pointer-events-none absolute  h-[18px] w-[18px] top-1/3 right-0 text-gray-500" />
                                <select
                                    id="selectAirline"
                                    name="selectAirline"
                                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    value={flightDetails.airline}
                                    onChange={(e) => handleChange(e, 0, "flightName")}
                                >
                                    <option value="" disabled>Select Airline</option>
                                    <option value="Indigo">Indigo</option>
                                    <option value="AirIndia" disabled>AirIndia</option>
                                    <option value="Emirates">Emirates</option>

                                </select>

                            </div>
                        </div>
                    </div>

                    <div className="flex flex-grow">
                        <div className="p-3 mb-5 basis-1/3">
                            <label htmlFor="flightDepatureDateTime" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                Departure Date/Time
                            </label>
                            <div className="relative w-full">
                                <DatePicker style={{ width: '100%' }} format={'YYYY-MM-DD'}
                                    value={flightDetails.depatureDateTime && dayjs(flightDetails.depatureDateTime, 'YYYY-MM-DD')}
                                    onChange={(e) => handleChange(e, 0, 'flightDepatureDateTime')} />
                            </div>
                        </div>
                        <div className="p-3 mb-5 basis-1/3">
                            <label htmlFor="flightArrivalDateTime" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                Arrival Date/Time
                            </label>
                            <div className="relative w-full">
                                <DatePicker style={{ width: '100%' }} format={'YYYY-MM-DD'}
                                    value={flightDetails.arrivalDateTime && dayjs(flightDetails.arrivalDateTime, 'YYYY-MM-DD','en')}
                                    onChange={(e) => handleChange(e, 0, 'flightArrivalDateTime')} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-3"></div>
                <div className="border bg-gray-50 border-gray-200 rounded-md">
                    <label htmlFor="flightDetails" className={`${font.className} mb-2 block text-lg text-blue-500 pt-3 font-medium pl-2 justify-self-center`}>
                        Accomodation Details*
                    </label>
                    <div className="flex flex-col">
                        {accomodationDetailsData.map((data, i) => {
                            return (
                                <div key={i}>
                                    <AccomodationComponent handleChange={handleChange} data={data} dataSize={accomodationDetailsData.length} index={i} update={updateAccomodationDetailsComponent} setShowNextButton={setShowNextButton}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="p-3"></div>
                <div className="p-4 border border-gray-200 bg-gray-50 rounded-md">
                    <label htmlFor="reportingAndDropping" className={`${font.className} mb-2 block text-lg text-blue-500 font-medium pl-2 justify-self-center`}>
                    Reporting And Dropping*
                    </label>
                    <div className="flex flex-col">
                        {reportingAndDroppingData.map((data, i) => {
                            return (
                                <div key={i}>
                                    <ReportingAndDroppingComponent handleChange={handleChange} data={data} dataSize={reportingAndDroppingData.length} index={i} update={updateReportingAndDroppingComponent}
                                     setShowNextButton={setShowNextButton}/>
                                </div>
                            );
                        })}
                    </div>
                </div>


            </div>
        </>
    );
}
export default TourDetailsForm;
