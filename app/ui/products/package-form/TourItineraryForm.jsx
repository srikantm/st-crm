import React, { useState, useEffect } from "react";
import { styled } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box, useTheme, OutlinedInput, Chip } from "@mui/material";
import { tokens } from "./theme";
import ItineraryForm from "./components/ItineraryForm";
import dayjs from "dayjs";
import { font } from "../../fonts";
import { DatePicker } from "antd";




const TourItineraryForm = ({ handleChange, itineraryDetails, itineraries, updateItineraryComponent, selectedCities, setSelectedCities, setShowNextButton }) => {

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
    const [countryData, setCountryData] = useState([]);
    useEffect(() => {
        const domain =  process.env.NEXT_PUBLIC_API_URL;
        const url = `${domain}/v1/fetch/countries`;

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(url, requestOptions)
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();
            })
            .then(d => {
                // Handle the data returned from the server

                setCountryData(d.response.countries);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [])

    const [cityData, setCityData] = useState([]);
    useEffect(() => {
        const domain =  process.env.NEXT_PUBLIC_API_URL;
        const url = `${domain}/v1/fetch/cities`;

        const postData = {
            countryIds: itineraryDetails.countryIds
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        };

        fetch(url, requestOptions)
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();
            })
            .then(d => {
                // Handle the data returned from the server

                setCityData(d.response.cities);
                if (itineraryDetails.cityIds.length > 0) {
                    const newArray = d.response.cities.filter(({ id }) => itineraryDetails.cityIds.includes(id));
                    setSelectedCities(newArray);
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [itineraryDetails.countryIds]);


    const Div = styled('div')(({ theme }) => ({
        ...theme.typography,
        backgroundColor: theme.palette.background,
        padding: theme.spacing(1),
        fontWeight: "bold",
        fontSize: 15
    }));

    useEffect(() => {
        const newArray = cityData.filter(({ id }) => itineraryDetails.cityIds.includes(id));
        setSelectedCities(newArray);

    }, [itineraryDetails.cityIds]);

    setShowNextButton(itineraryDetails.countryIds.length > 0 && itineraryDetails.cityIds.length > 0 && itineraryDetails.durationDays !== '');
    console.log("selectedCities", selectedCities);
    return (
        <>

            <div className="rounded-md p-4 md:p-6 border border-gray-200">
                <div className="pt-5 pb-5 border border-gray-200 rounded-md bg-gray-50">
                    <label htmlFor="itineraryDetails" className={`${font.className} mb-2 block text-lg text-blue-500 font-medium pl-2 justify-self-center`}>
                        Itinerary Details*
                    </label>
                    <div className="flex flex-grow">
                        <div className="p-5 mb-5 basis-1/3">
                            <div className="relative">
                                <label htmlFor="itineraryCountrySelect" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                    Country
                                </label>

                                <Select
                                    name="itineraryCountrySelect"
                                    id="itineraryCountrySelect"
                                    label="Select Country"
                                    onChange={(e) => handleChange(e, 0, "itineraryCountrySelect")}
                                    value={itineraryDetails.countryIds}
                                    size="small"
                                    defaultValue=""
                                    multiple
                                    sx={{ backgroundColor: "white", width: "100%" }}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value}
                                                    label={countryData.length > 0 ? (countryData.find((item) => item.id === value).name) : ""} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value={""} disabled>Select Country</MenuItem>
                                    {countryData.map((data) => (
                                        <MenuItem key={data.id} name={data.name} value={data.id}>{data.name}</MenuItem>
                                    ))}

                                </Select>
                                {itineraryDetails.countryIds.length === 0 && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>Country is Mandatory </label>}

                            </div>
                        </div>

                        <div className="p-5 mb-5 basis-1/3">
                            <div className="relative">
                                <label htmlFor="flightDestination" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                    City
                                </label>

                                <Select
                                    name="itineraryCitySelect"
                                    id="itineraryCitySelect"
                                    label="Select City"
                                    onChange={(e) => handleChange(e, 0, "itineraryCitySelect")}
                                    value={itineraryDetails.cityIds}
                                    size="small"
                                    defaultValue=""
                                    multiple
                                    sx={{ backgroundColor: "white", width: "100%" }}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value}
                                                    label={cityData.length > 0 && cityData.find((item) => item.id === value).name} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {cityData.map((data) => (
                                        <MenuItem key={data.id} name={data.name} value={data.id}>{data.name}</MenuItem>
                                    ))}
                                </Select>
                                {itineraryDetails.cityIds.length === 0 && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>City is Mandatory </label>}
                            </div>
                        </div>


                        {/* <div className="p-3 mb-5 basis-1/3">
                            <label htmlFor="itineraryStartDate" className={`${font.className} mb-2 block text-sm font-medium pl-2 pb-3`}>
                                Itinerary Start Date
                            </label>
                            <div className="relative">
                                <DatePicker style={{ width: '100%', height: '100%' }} format={'YYYY-MM-DD'}
                                    value={itineraryDetails.itineraryStartDate && dayjs(itineraryDetails.itineraryStartDate, 'YYYY-MM-DD', 'en')}
                                    onChange={(e) => handleChange(e, 0, 'itineraryStartDate')} />
                            </div>

                        </div> */}


                        <div className="p-5 mb-5 basis-1/5">
                            <div className="relative">
                                <label htmlFor="durationDays" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                    Duration Days
                                </label>

                                <Select
                                    name="durationDays"
                                    id="durationDays"
                                    label="Select Duration Days"
                                    sx={{ backgroundColor: "white", width: "100%" }}
                                    onChange={(e) => handleChange(e, 0, "durationDays")}
                                    value={itineraryDetails.durationDays}
                                    size="small"
                                    defaultValue=""
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={11}>11</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                    <MenuItem value={13}>13</MenuItem>
                                    <MenuItem value={14}>14</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={16}>16</MenuItem>
                                </Select>
                                {itineraryDetails.durationDays === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>DurationDays is Mandatory</label>}
                            </div>
                        </div>


                        <div className="p-5 mb-5 basis-1/5">
                            <div className="relative">
                                <label htmlFor="durationNights" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                                    Duration Nights
                                </label>

                                <Select
                                    name="durationNights"
                                    id="durationNights"
                                    label="Select Duration Nights"
                                    onChange={(e) => handleChange(e, 0, "durationNights")}
                                    value={itineraryDetails.durationDays !== '' && itineraryDetails.durationDays - 1}
                                    size="small"
                                    sx={{ backgroundColor: "white", width: "100%" }}
                                    defaultValue=""
                                    disabled
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={11}>11</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                    <MenuItem value={13}>13</MenuItem>
                                    <MenuItem value={14}>14</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                </Select>

                            </div>
                        </div>

                    </div>
                </div>


                <div className="flex flex-col gap-4 pt-5">
                    {itineraries.map((data, i) => {

                        return (
                            <div key={i}>
                                <ItineraryForm handleChange={handleChange} itinerary={data} dataSize={itineraries.length} index={i} update={updateItineraryComponent} selectedCities={selectedCities} setShowNextButton={setShowNextButton} />
                            </div>
                        );
                    })}
                </div>
            </div>





        </>
    );
}
export default TourItineraryForm;
