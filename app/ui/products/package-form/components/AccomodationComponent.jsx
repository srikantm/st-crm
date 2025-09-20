import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Stack } from "@mui/material";
import { font } from "@/app/ui/fonts";
import { DatePicker } from "antd";


const AccomodationComponent = ({ handleChange, data, dataSize, index, update, setShowNextButton }) => {


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
            countryIds: [data.countryId]
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
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [data.countryId]);

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
    setShowNextButton(data.countryId !== '' && data.cityId !== '' && data.hotelName !== '');
    return (<>

        <div className="flex flex-grow w-full">
            <div className="p-2 basis-1/3">
                <div className="relative">
                    <label htmlFor="accomodationCountry" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                        Country
                    </label>

                    <select
                        id="accomodationCountry"
                        name="accomodationCountry"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        value={data.countryId}
                        onChange={(e) => handleChange(e, index, "accomodationCountry")}
                    >
                        <option value="" disabled>Select Country</option>
                        {countryData.map((data) => (
                            <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                    </select>

                    {data.countryId === '' &&
                        <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>
                                        Country is Mandatory
                                      </label>
                    }

                </div>
            </div>
            <div className="p-2 mb-5 basis-1/3">
                <div className="relative">
                    <label htmlFor="accomodationCity" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                        City
                    </label>

                    <select
                        id="accomodationCity"
                        name="accomodationCity"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        value={data.cityId}
                        onChange={(e) => handleChange(e, index, "accomodationCity")}
                    >
                        <option value="" disabled>Select City</option>
                        {cityData.map((data) => (
                            <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                    </select>
                    {data.cityId === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>City is Mandatory</label>}
                </div>
            </div>
            <div className="p-3 mb-5 basis-1/3">

                <label htmlFor="accomodationHotelName" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                    Hotel Name
                </label>

                <input
                    type="text"
                    className="peer block cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    name="accomodationHotelName"
                    placeholder="Enter Hotel Name"
                    value={data.hotelName}
                    onChange={(e) => handleChange(e, index, "accomodationHotelName")}
                />
                {data.hotelName === '' && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>Hotel is Mandatory</label>}
            </div>
        </div>

        <div className="flex flex-row">
            <div className="p-3 mb-5 basis-1/3">
                <label htmlFor="accomodationCheckInDate" className={`${font.className} mb-2 block text-sm pl-2`}>
                    CheckIn Date
                </label>
                <div className="relative">
                    <DatePicker style={{ width: '100%' }} format={'YYYY-MM-DD'}
                        value={data.checkInDate && dayjs(data.checkInDate, 'YYYY-MM-DD','en')}
                        onChange={(e) => handleChange(e, index, 'accomodationCheckInDate')} />
                </div>
                {(!data.checkInDate || data.checkInDate === '') && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>Check-in Date is Mandatory</label>}
            </div>
            <div className="p-3 basis-1/3">
                <label htmlFor="accomodationCheckOutDate" className={`${font.className} mb-2 block text-sm pl-2`}>
                    CheckOut Date/Time
                </label>
                <div className="relative">
                    <DatePicker style={{ width: '100%' }} format={'YYYY-MM-DD'}
                        value={data.checkOutDate && dayjs(data.checkOutDate, 'YYYY-MM-DD','en')}
                        onChange={(e) => handleChange(e, index, 'accomodationCheckOutDate')} />
                </div>
                {(!data.checkOutDate || data.checkOutDate === '') && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>Check-out Date is Mandatory</label>}
            </div>
            <div className="p-2 basis-1/3 pl-20 pt-12">
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
export default AccomodationComponent;