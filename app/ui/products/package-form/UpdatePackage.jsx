"use client"

import React, {useEffect, useState } from "react";

import { Typography, Box, StepConnector, stepConnectorClasses, styled } from "@mui/material";
import AddPackageForm from "./AddPackageForm"
import TourDetailsForm from "./TourDetailsForm";
import TourInformationForm from "./TourInformationForm";
import TourItineraryForm from "./TourItineraryForm";
import ItineraryForm from "./components/ItineraryForm"
import TourPricing from "./TourPricing";
import { saveProduct, updateProduct } from "@/app/lib/actions";


const UpdatePackage = ({ packageId }) => {



    const [formData, setFormData] = useState({
        packageName: "",
        packageCode: "",
        packageTypeDomesticTours: false,
        packageTypeInternationalTours: false,
        packageThemeFamily: false,
        packageThemeHoneymoonSpecial: false,
        packageThemeCustomizedHolidays: false,
        packageThemePopular: false,
        packageThemeSpecialValueFD: false,
        packageThemePiligrimage: false,
        packageIncludesMeals: false,
        packageIncludesHotels: false,
        packageIncludesSightSeeing: false,
        packageIncludesTransfers: false,
    });

    const [pacakageData, setPackageData] = useState(null);
    const [isUpdateRequest, setIsUpdateRequest] = useState(false);
    useEffect(() => {
        if (packageId !== null) {
            getPackageDetails(packageId);
            setIsUpdateRequest(true);
        }
    }, []);



    const checkBoxIds = ["packageTypeDomesticTours",
        "packageTypeInternationalTours",
        "packageThemeFamily",
        "packageThemeHoneymoonSpecial",
        "packageThemeCustomizedHolidays",
        "packageThemePopular",
        "packageThemeSpecialValueFD",
        "packageThemePiligrimage",
        "packageIncludesMeals",
        "packageIncludesHotels",
        "packageIncludesSightSeeing",
        "packageIncludesTransfers"
    ];

    const steps = ['Package', 'Tour Details', 'Tour Information', 'Tour Itinerary', 'Package Pricing'];

    const [departureCityDateData, setDepartureCityDateData] = useState([{ cityId: '', departureDate: "" }]);
    const [accomodationDetailsData, setAccomodationDetailsData] = useState([{ countryId: '', cityId: '', hotelName: "", checkInDate: "", checkOutDate: "" }]);
    const [reportingAndDroppingData, setReportingAndDroppingData] = useState([{ guestType: "", reportingPoint: "", droppingPoint: "" }]);
    const [tourInformation, setTourInformation] = useState({
        tourInclusion: "",
        tourExclusion: "",
        advancePreparation: "",
        tourRating: "",
        tourTotalReviews: ""
    });
    const [flightDetails, setFlightDetails] = useState(
        {
            source: "",
            destination: "",
            airline: "",
            depatureDateTime: "",
            arrivalDateTime: ""

        }
    );
    const [itineraryDetails, setItineraryDetails] = useState({
        countryIds: [],
        cityIds: [],
        durationDays: "",
        durationNights: "",
        itineraryStartDate: ""
    });

    const [itineraries, setItineraries] = useState([
        {
            itineraryTitle: "",
            cityIds: [],
            description: "",
            note: "",
            itineraryDate: "",
            itineraryAddons: [{
                itineraryAddonType: "",
                description: ""
            }]
        }
    ]);

    const [tourPricing, setTourPricing] = useState([
        {
            hotelStarRating: "",
            singleSharingPrice: "",
            doubleSharingPrice: "",
            threeSharingPrice: "",
            childWithoutBedPrice: "",
            childWithBedPrice: "",
            infantPrice: ""
        }
    ]);

    useEffect(() => {
        if (pacakageData === null) {
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            packageName: pacakageData.packageName,
            packageCode: pacakageData.packageCode,
            packageTypeDomesticTours: pacakageData.packageTypes.includes('DOMESTIC_TOURS'),
            packageTypeInternationalTours: pacakageData.packageTypes.includes("INTERNATIONAL_TOURS"),
            packageThemeFamily: pacakageData.packageThemes.includes("FAMILY"),
            packageThemeHoneymoonSpecial: pacakageData.packageThemes.includes("HONEYMOON_SPECIAL"),
            packageThemeCustomizedHolidays: pacakageData.packageThemes.includes("CUSTOMIZED_HOLIDAYS"),
            packageThemePopular: pacakageData.packageThemes.includes("POPULAR"),
            packageThemeSpecialValueFD: pacakageData.packageThemes.includes("SPECIAL_VALUE_FD"),
            packageThemePiligrimage: pacakageData.packageThemes.includes("PILIGRIMAGE"),
            packageIncludesMeals: pacakageData.tourIncludes.includes("MEALS"),
            packageIncludesHotels: pacakageData.tourIncludes.includes("HOTELS"),
            packageIncludesSightSeeing: pacakageData.tourIncludes.includes("SIGHTSEEING"),
            packageIncludesTransfers: pacakageData.tourIncludes.includes("TRANSFERS"),
        }));

        const depCityDateMap = [];
        Object.keys(pacakageData.departureCityDatesMappings).map((key) => {
            {
                pacakageData.departureCityDatesMappings[key].length > 0 ?
                    pacakageData.departureCityDatesMappings[key].map((value, index) => {
                        depCityDateMap.push({ cityId: key, departureDate: value });
                    }) :
                    depCityDateMap.push({ cityId: key, departureDate: "" });
            };
        });
        //console.log("depCityDateMap", depCityDateMap);
        setDepartureCityDateData(depCityDateMap);

        //console.log("pacakageData", pacakageData);

        setFlightDetails({
            source: pacakageData.tourDetails.flightDetails[0].departureCity,
            destination: pacakageData.tourDetails.flightDetails[0].arrivalCity,
            airline: pacakageData.tourDetails.flightDetails[0].flightName,
            depatureDateTime: pacakageData.tourDetails.flightDetails[0].departureDate,
            arrivalDateTime: pacakageData.tourDetails.flightDetails[0].arrivalDate
        });

        const editAccDetails = [];
        pacakageData.tourDetails.accommodationDetails.map((data, i) => {
            editAccDetails.push({
                countryId: data.city.state.country.id,
                cityId: data.city.id,
                hotelName: data.hotelName,
                checkInDate: data.checkInDate,
                checkOutDate: data.checkOutDate
            });
        });
        setAccomodationDetailsData(editAccDetails);

        const editReportingAndDropping = [];
        pacakageData.tourDetails.reportingAndDroppings.map((d, i) => {
            editReportingAndDropping.push({
                guestType: d.guestType,
                reportingPoint: d.reportingPoint,
                droppingPoint: d.droppingPoint
            });
        })
        setReportingAndDroppingData(editReportingAndDropping);

        pacakageData.tourInformation.map((d, i) => {
            setTourInformation({
                tourInclusion: d.informationType === "TOUR_INCLUSION" && d.description,
                tourExclusion: d.informationType === "TOUR_EXCLUSION" && d.description,
                advancePreparation: d.informationType === "ADVANCE_PREPARATION" && d.description,
                tourRating: pacakageData.packageRating,
                tourTotalReviews: pacakageData.totalPackageReviews
            });

        });



        const editItineriesData = [];
        const countryIds = [];
        const itiCityIds = [];

        pacakageData.itineraries.map((d, i) => {
            const addons = [];
            d.itineraryAddons.map((da, i) => {
                addons.push({
                    itineraryAddonType: da.itineraryAddonType,
                    description: da.description
                });
            });
            const cityIds = [];
            d.cities.map((ci) => {
                cityIds.push(ci.id);
                if (!itiCityIds.includes(ci.id)) {
                    itiCityIds.push(ci.id);
                }
                if (!countryIds.includes(ci.state.country.id)) {
                    countryIds.push(ci.state.country.id);
                }
            });
            editItineriesData.push(
                {
                    itineraryTitle: d.itineraryTitle,
                    cityIds: cityIds,
                    description: d.description,
                    note: d.note,
                    itineraryDate: d.itineraryDate,
                    itineraryAddons: addons
                }
            );
        });

        setItineraries(editItineriesData);

        setItineraryDetails({
            countryIds: countryIds,
            cityIds: itiCityIds,
            durationDays: pacakageData.durationDays,
            itineraryStartDate: ""
        });

        const editTourPricing = [];
        let pricingMap = {};
        pacakageData.packageRates.map((rate, i) => {

            if (rate.packageRateType === 'FIVE_STAR') {
                mapPrice(pricingMap, rate, 'FIVE_STAR');
            }
            if (rate.packageRateType === 'FOUR_STAR') {
                mapPrice(pricingMap, rate, 'FOUR_STAR');
            }
            if (rate.packageRateType === 'THREE_STAR') {
                mapPrice(pricingMap, rate, 'THREE_STAR');
            }
        });

        if (pricingMap["FIVE_STAR"]) {
            editTourPricing.push({
                hotelStarRating: "FIVE_STAR",
                singleSharingPrice: pricingMap["FIVE_STAR"].singleSharingPrice ? pricingMap["FIVE_STAR"].singleSharingPrice : null,
                doubleSharingPrice: pricingMap["FIVE_STAR"].doubleSharingPrice ? pricingMap["FIVE_STAR"].doubleSharingPrice : null,
                threeSharingPrice: pricingMap["FIVE_STAR"].threeSharingPrice ? pricingMap["FIVE_STAR"].threeSharingPrice : null,
                childWithoutBedPrice: pricingMap["FIVE_STAR"].childWithoutBedPrice ? pricingMap["FIVE_STAR"].childWithoutBedPrice : null,
                childWithBedPrice: pricingMap["FIVE_STAR"].childWithBedPrice ? pricingMap["FIVE_STAR"].childWithBedPrice : null,
                infantPrice: pricingMap["FIVE_STAR"].infantPrice ? pricingMap["FIVE_STAR"].infantPrice : null
            });
        }
        if (pricingMap["FOUR_STAR"]) {
            editTourPricing.push({
                hotelStarRating: "FOUR_STAR",
                singleSharingPrice: pricingMap["FOUR_STAR"].singleSharingPrice ? pricingMap["FOUR_STAR"].singleSharingPrice : null,
                doubleSharingPrice: pricingMap["FOUR_STAR"].doubleSharingPrice ? pricingMap["FOUR_STAR"].doubleSharingPrice : null,
                threeSharingPrice: pricingMap["FOUR_STAR"].threeSharingPrice ? pricingMap["FOUR_STAR"].threeSharingPrice : null,
                childWithoutBedPrice: pricingMap["FOUR_STAR"].childWithoutBedPrice ? pricingMap["FOUR_STAR"].childWithoutBedPrice : null,
                childWithBedPrice: pricingMap["FOUR_STAR"].childWithBedPrice ? pricingMap["FOUR_STAR"].childWithBedPrice : null,
                infantPrice: pricingMap["FOUR_STAR"].infantPrice ? pricingMap["FOUR_STAR"].infantPrice : null
            });
        }
        if (pricingMap["THREE_STAR"]) {
            editTourPricing.push({
                hotelStarRating: "THREE_STAR",
                singleSharingPrice: pricingMap["THREE_STAR"].singleSharingPrice ? pricingMap["THREE_STAR"].singleSharingPrice : null,
                doubleSharingPrice: pricingMap["THREE_STAR"].doubleSharingPrice ? pricingMap["THREE_STAR"].doubleSharingPrice : null,
                threeSharingPrice: pricingMap["THREE_STAR"].threeSharingPrice ? pricingMap["THREE_STAR"].threeSharingPrice : null,
                childWithoutBedPrice: pricingMap["THREE_STAR"].childWithoutBedPrice ? pricingMap["THREE_STAR"].childWithoutBedPrice : null,
                childWithBedPrice: pricingMap["THREE_STAR"].childWithBedPrice ? pricingMap["THREE_STAR"].childWithBedPrice : null,
                infantPrice: pricingMap["THREE_STAR"].infantPrice ? pricingMap["THREE_STAR"].infantPrice : null
            });
        }

        setTourPricing(editTourPricing);

    }, [pacakageData]);

    async function getPackageDetails(packageId) {

        const url =  process.env.NEXT_PUBLIC_API_URL+"/v1/package/details/" + packageId;
        // POST request options
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Make the POST request
        await fetch(url)
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    console.error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();
            })
            .then(d => {
                // Handle the data returned from the server
                setPackageData(d.response.packageDetails);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('There was a problem with the fetch operation:', error);
            });
    }


    const handleChange = (e, i, n, ni) => {
        if (n === 'departureDate' && e !== null) {
            const date = e.format('YYYY-MM-DD');
            const list = [...departureCityDateData];
            list[i].departureDate = date;
            setDepartureCityDateData(list);
            return;
        }
        if (n === 'accomodationCheckInDate' && e !== null) {
            const date = e.format('YYYY-MM-DD');
            const list = [...accomodationDetailsData];
            list[i].checkInDate = date;
            setAccomodationDetailsData(list);
            return;
        }
        if (n === 'accomodationCheckOutDate' && e !== null) {
            const date = e.format('YYYY-MM-DD');
            const list = [...accomodationDetailsData];
            list[i].checkOutDate = date;
            setAccomodationDetailsData(list);
            return;
        }
        if (n === 'flightDepatureDateTime' && e !== null) {
            const date = e.format('YYYY-MM-DD');
            setFlightDetails((prevData) => ({ ...prevData, depatureDateTime: date }));
            return;
        }
        if (n === 'flightArrivalDateTime' && e !== null) {
            const date = e.format('YYYY-MM-DD');
            setFlightDetails((prevData) => ({ ...prevData, arrivalDateTime: date }));
            return;
        }

        if (n === 'itineraryStartDate' && e !== null) {
            const date = e.format('YYYY-MM-DD');
            setItineraryDetails((prevData) => ({ ...prevData, itineraryStartDate: date, }));
            return;
        }
        const { name, value, checked } = e.target;

        if (n === 'hotelStarRating') {
            const list = [...tourPricing];
            list[i].hotelStarRating = value;
            setTourPricing(list);
            return;
        }
        if (n === 'singleSharingPrice') {
            const list = [...tourPricing];
            list[i].singleSharingPrice = value;
            setTourPricing(list);
            return;
        }
        if (n === 'doubleSharingPrice') {
            const list = [...tourPricing];
            list[i].doubleSharingPrice = value;
            setTourPricing(list);
            return;
        }
        if (n === 'threeSharingPrice') {
            const list = [...tourPricing];
            list[i].threeSharingPrice = value;
            setTourPricing(list);
            return;
        }
        if (n === 'childWithoutBedPrice') {
            const list = [...tourPricing];
            list[i].childWithoutBedPrice = value;
            setTourPricing(list);
            return;
        }
        if (n === 'childWithBedPrice') {
            const list = [...tourPricing];
            list[i].childWithBedPrice = value;
            setTourPricing(list);
            return;
        }
        if (n === 'infantPrice') {
            const list = [...tourPricing];
            list[i].infantPrice = value;
            setTourPricing(list);
            return;
        }
        if (n === 'itineraryCityIds') {
            const list = [...itineraries];
            list[i].cityIds = value;
            setItineraries(list);
            return;
        }
        if (n === 'addOnDescription') {
            const list = [...itineraries];
            list[i].itineraryAddons[ni].description = value
            setItineraries(list);
            return;
        }
        if (n === 'addOnType') {
            const list = [...itineraries];
            list[i].itineraryAddons[ni].itineraryAddonType = value
            setItineraries(list);
            return;
        }
        if (n === 'itineraryNote') {
            const list = [...itineraries];
            list[i].note = value;
            setItineraries(list);
            return;
        }
        if (n === 'itineraryDescription') {
            const list = [...itineraries];
            list[i].description = value;
            setItineraries(list);
            return;
        }
        if (n === 'itineraryTitle') {
            const list = [...itineraries];
            list[i].itineraryTitle = value;
            setItineraries(list);
            return;
        }
        if (n === 'itineraryCountrySelect') {
            setItineraryDetails((prevData) => ({ ...prevData, countryIds: value, cityIds: [] }));
            itineraries.map((data, i) => {
                data.cityIds = [];
            })
            setItineraries(itineraries);
            return;
        }
        if (n === 'itineraryCitySelect') {
            setItineraryDetails((prevData) => ({ ...prevData, cityIds: value }));
            return;
        }
        if (n === 'durationDays') {
            setItineraryDetails((prevData) => ({ ...prevData, durationDays: value }));
            return;
        }
        if (n === 'durationNights') {
            setItineraryDetails((prevData) => ({ ...prevData, durationNights: value }));
            return;
        }
        if (n === 'tourInclusion') {
            setTourInformation((prevData) => ({ ...prevData, tourInclusion: value }));
            return;
        }
        if (n === 'tourExclusion') {
            setTourInformation((prevData) => ({ ...prevData, tourExclusion: value }));
            return;
        }
        if (n === 'advancePreparation') {
            setTourInformation((prevData) => ({ ...prevData, advancePreparation: value }));
            return;
        }
        if (n === 'tourRating') {
            setTourInformation((prevData) => ({ ...prevData, tourRating: value }));
            return;
        }
        if (n === 'tourTotalReviews') {
            setTourInformation((prevData) => ({ ...prevData, tourTotalReviews: value }));
            return;
        }
        if (n === 'flightSource') {
            setFlightDetails((prevData) => ({ ...prevData, source: value }));
            return;
        }
        if (n === 'flightDestination') {
            setFlightDetails((prevData) => ({ ...prevData, destination: value }));
            return;
        }
        if (n === 'flightName') {
            setFlightDetails((prevData) => ({ ...prevData, airline: value }));
            return;
        }
        if (n === 'departureCity') {
            const list = [...departureCityDateData];
            list[i].cityId = value;
            setDepartureCityDateData(list);
            return;
        }
        if (checkBoxIds.some(v => { return v === name })) {
            setFormData((prevData) => ({ ...prevData, [name]: checked }));
            return;
        }
        if (n === "accomodationCountry") {
            const list = [...accomodationDetailsData];
            list[i].countryId = value;
            setAccomodationDetailsData(list);
            return;
        }
        if (n === "accomodationCity") {
            const list = [...accomodationDetailsData];
            list[i].cityId = value;
            setAccomodationDetailsData(list);
            return;
        }
        if (n === "accomodationHotelName") {
            const list = [...accomodationDetailsData];
            list[i].hotelName = value;
            setAccomodationDetailsData(list);
            return;
        }
        if (n === "guestType") {
            const list = [...reportingAndDroppingData];
            list[i].guestType = value;
            setReportingAndDroppingData(list);
            return;
        }
        if (n === "reportingPoint") {
            const list = [...reportingAndDroppingData];
            list[i].reportingPoint = value;
            setReportingAndDroppingData(list);
            return;
        }
        if (n === "droppingPoint") {
            const list = [...reportingAndDroppingData];
            list[i].droppingPoint = value;
            setReportingAndDroppingData(list);
            return;
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const updateTourPriceComponent = (index, type) => {

        if (type === "add") {
            const newArr = [...tourPricing,
            {
                hotelStarRating: "",
                singleSharingPrice: "",
                doubleSharingPrice: "",
                threeSharingPrice: "",
                childWithoutBedPrice: "",
                childWithBedPrice: "",
                infantPrice: ""
            }];
            setTourPricing(newArr);
        }
        if (type === "delete") {
            const newArr = [...tourPricing];
            newArr.splice(index, 1);
            setTourPricing(newArr);
        }
    }

    const updateItineraryComponent = (index, type, nIndex) => {

        if (type === "add") {
            const newArr = [...itineraries, {
                itineraryTitle: "",
                cityIds: [],
                description: "",
                itineraryAddons: [{
                    itineraryAddonType: "",
                    description: ""
                }]
            }];
            setItineraries(newArr);
        }
        if (type === "addAddOn") {
            const newArr = [...itineraries];
            newArr[index].itineraryAddons.push({
                itineraryAddonType: "",
                description: ""
            });
            setItineraries(newArr);
        }
        if (type === "deleteAddOn") {
            const newArr = [...itineraries];
            newArr[index].itineraryAddons.splice(nIndex, 1);
            setItineraries(newArr);
        }
        if (type === "delete") {
            const newArr = [...itineraries];
            newArr.splice(index, 1);
            setItineraries(newArr);
        }
    }

    const updateReportingAndDroppingComponent = (index, type) => {

        if (type === "add") {
            const newArr = [...reportingAndDroppingData, { guestType: "", reportingPoint: "", droppingPoint: "" }];
            setReportingAndDroppingData(newArr);
        }
        if (type === "delete") {
            const newArr = [...reportingAndDroppingData];
            newArr.splice(index, 1);
            setReportingAndDroppingData(newArr);
        }
    }

    const updateCityDateComponent = (index, type) => {

        if (type === "add") {
            const newArr = [...departureCityDateData, { cityId: "", departureDate: null }];
            setDepartureCityDateData(newArr);
        }
        if (type === "delete") {
            const newArr = [...departureCityDateData];
            newArr.splice(index, 1);
            setDepartureCityDateData(newArr);
        }
    }

    const updateAccomodationDetailsComponent = (index, type) => {

        if (type === "add") {
            const newArr = [...accomodationDetailsData, { countryId: "", cityId: "", hotelName: "", checkInDate: null, checkOutDate: null }];
            setAccomodationDetailsData(newArr);
        }
        if (type === "delete") {
            const newArr = [...accomodationDetailsData];
            newArr.splice(index, 1);
            setAccomodationDetailsData(newArr);
        }

    }

    const [itineraryForms, setItineraryForms] = useState([<ItineraryForm handleChange={handleChange} />]);
    const updateItinerary = (index, type) => {
        if (type === "add") {
            index++;
            setItineraryForms([...itineraryForms,
            <ItineraryForm handleChange={handleChange} />]);
            return;
        }
        if (type === "delete") {
            const newArray = itineraryForms.filter((item, i) => i !== index);
            setItineraryForms(newArray);
        }
    }

    const [selectedCities, setSelectedCities] = useState([]);

    const [showNextButton, setShowNextButton] = useState(false);
    const handleSteps = (step) => {
        switch (step) {
            case 1:
                return <AddPackageForm handleChange={handleChange}
                    values={formData}
                    departureCityDateData={departureCityDateData}
                    updateCityDateComponent={updateCityDateComponent}
                    setShowNextButton={setShowNextButton} 
                    isUpdateRequest={isUpdateRequest}/>;
            case 2:
                return <TourDetailsForm
                    handleChange={handleChange}
                    flightDetails={flightDetails}
                    accomodationDetailsData={accomodationDetailsData}
                    updateAccomodationDetailsComponent={updateAccomodationDetailsComponent}
                    reportingAndDroppingData={reportingAndDroppingData}
                    updateReportingAndDroppingComponent={updateReportingAndDroppingComponent}
                    setShowNextButton={setShowNextButton}
                />;
            case 3:
                return <TourInformationForm handleChange={handleChange} tourInformation={tourInformation} setShowNextButton={setShowNextButton} />;
            case 4:
                return <TourItineraryForm handleChange={handleChange}
                    itineraryDetails={itineraryDetails}
                    itineraries={itineraries}
                    updateItineraryComponent={updateItineraryComponent}
                    selectedCities={selectedCities}
                    setSelectedCities={setSelectedCities}
                    setShowNextButton={setShowNextButton} />;
            case 5:
                return <TourPricing handleChange={handleChange}
                    tourPricing={tourPricing}
                    update={updateTourPriceComponent}
                    setShowNextButton={setShowNextButton} />
            default:
                <Typography variant="h4" align="center">
                    Multi Step Form
                </Typography>
        }
    };

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        // if(showNextButton === false){
        //     return;
        // }
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ?
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    function populateFormatData() {
        let populateFormData = {
            packages: [
                {
                    id:packageId,
                    packageName: formData.packageName,
                    packageCode: formData.packageCode,
                    packageListImages: [],
                    packageDetailImages: [],
                    departureCityDatesMappings: populateDepCityDateMap(),
                    touringCities: itineraryDetails.cityIds,
                    tourIncludes: populateTourIncludes(),
                    durationDays: itineraryDetails.durationDays,
                    durationNights: itineraryDetails.durationNights,
                    packageRating: tourInformation.tourRating,
                    totalPackageReviews: tourInformation.tourTotalReviews,
                    packageRates: populatePackagePricing(),
                    packageTypes: populatePackageTypes(),
                    packageThemes: populatePackageThemes(),
                    itineraries: itineraries,
                    tourInformation: populateTourInformation(),
                    tourDetails: populateTourDetails()
                }
            ]
        }
        return populateFormData;
    }

    const savePackage =  () => {
        const postData = populateFormatData();
        console.log("postData --- ",postData);
        if (packageId == null) {
            saveProduct(postData);
        }else{
           updateProduct(postData);
           
        }

    };

    function populateTourDetails() {
        let tourDetails = {};
        tourDetails["flightDetails"] = [{
            departureCity: flightDetails.source,
            arrivalCity: flightDetails.destination,
            departureDate: (flightDetails.depatureDateTime),
            arrivalDate: (flightDetails.arrivalDateTime),
            flightName: flightDetails.airline
        }]
        tourDetails["accommodationDetails"] = populateAccomodationDetails();
        tourDetails["reportingAndDroppings"] = reportingAndDroppingData;
        return tourDetails;
    }

    function populateAccomodationDetails() {
        let accDetails = [];
        accomodationDetailsData.map((data, i) => {
            accDetails = [...accDetails, {
                sequenceCount: i,
                cityIds: [data.cityId],
                hotelName: data.hotelName,
                checkInDate: (data.checkInDate && (data.checkInDate)),
                checkOutDate: (data.checkOutDate && (data.checkOutDate)),
            }]
        });
        return accDetails;
    }

    function populateTourInformation() {
        let tourInfo = [];
        if (tourInformation.tourInclusion) {
            tourInfo = [...tourInfo, {
                "informationType": "TOUR_INCLUSION",
                "description": tourInformation.tourInclusion
            }]
        }
        if (tourInformation.tourExclusion) {
            tourInfo = [...tourInfo, {
                "informationType": "TOUR_EXCLUSION",
                "description": tourInformation.tourExclusion
            }]
        }
        if (tourInformation.advancePreparation) {
            tourInfo = [...tourInfo, {
                "informationType": "ADVANCE_PREPARATION",
                "description": tourInformation.advancePreparation
            }]
        }
        return tourInfo;
    }

    function populatePackagePricing() {
        let packageRates = [];
        tourPricing.map((data) => {

            if (data.singleSharingPrice > 0) {
                packageRates = [...packageRates, {
                    packageRateType: data.hotelStarRating,
                    guestSharingType: "SINGLE_SHARING",
                    adultRate: data.singleSharingPrice,
                    childRateWithBed: data.childWithBedPrice,
                    childRateWithoutBed: data.childWithoutBedPrice,
                    infantRate: data.infantPrice
                }]
            }
            if (data.doubleSharingPrice > 0) {
                packageRates = [...packageRates, {
                    packageRateType: data.hotelStarRating,
                    guestSharingType: "TWIN_SHARING",
                    adultRate: data.doubleSharingPrice,
                    childRateWithBed: data.childWithBedPrice,
                    childRateWithoutBed: data.childWithoutBedPrice,
                    infantRate: data.infantPrice
                }]
            }
            if (data.threeSharingPrice > 0) {
                packageRates = [...packageRates, {
                    packageRateType: data.hotelStarRating,
                    guestSharingType: "THREE_SHARING",
                    adultRate: data.threeSharingPrice,
                    childRateWithBed: data.childWithBedPrice,
                    childRateWithoutBed: data.childWithoutBedPrice,
                    infantRate: data.infantPrice
                }]
            }

        });
        return packageRates;
    }

    function populatePackageThemes() {
        let packageThemes = [];
        if (formData.packageThemeCustomizedHolidays) {
            packageThemes = [...packageThemes, "CUSTOMIZED_HOLIDAYS"];
        }
        if (formData.packageThemeFamily) {
            packageThemes = [...packageThemes, "FAMILY"];
        }
        if (formData.packageThemeHoneymoonSpecial) {
            packageThemes = [...packageThemes, "HONEYMOON_SPECIAL"];
        }
        if (formData.packageThemePiligrimage) {
            packageThemes = [...packageThemes, "PILIGRIMAGE"];
        }
        if (formData.packageThemePopular) {
            packageThemes = [...packageThemes, "POPULAR"];
        }
        if (formData.packageThemeSpecialValueFD) {
            packageThemes = [...packageThemes, "SPECIAL_VALUE_FD"];
        }
        return packageThemes;
    }

    function populatePackageTypes() {
        let packageTypes = [];
        if (formData.packageTypeDomesticTours) {
            packageTypes = [...packageTypes, "DOMESTIC_TOURS"];
        }
        if (formData.packageTypeInternationalTours) {
            packageTypes = [...packageTypes, "INTERNATIONAL_TOURS"];
        }
        return packageTypes;
    }

    function populateTourIncludes() {
        let tourIncludes = [];
        if (formData.packageIncludesHotels) {
            tourIncludes = [...tourIncludes, "HOTELS"];
        }
        if (formData.packageIncludesMeals) {
            tourIncludes = [...tourIncludes, "MEALS"];
        }
        if (formData.packageIncludesSightSeeing) {
            tourIncludes = [...tourIncludes, "SIGHTSEEING"];
        }
        if (formData.packageIncludesTransfers) {
            tourIncludes = [...tourIncludes, "TRANSFERS"];
        }
        return tourIncludes;
    }


    function populateDepCityDateMap() {
        const populatedData = {};
        departureCityDateData.map((data, i) => {
            const cityId = data.cityId;
            if (data.departureDate) {
                const dateYMD = (data.departureDate);
                if (populatedData[cityId]) {
                    const subArr = populatedData[cityId];
                    let contains = false;
                    for (let i = 0; i < subArr.length; i++) {
                        if (subArr[i] === dateYMD) {
                            contains = true;
                            break;
                        }
                    }
                    if (!contains) {
                        populatedData[cityId] = [...subArr, dateYMD];
                    }
                } else {
                    populatedData[cityId] = [dateYMD];
                }
            }else{
                populatedData[cityId] = [];
            }
        })
        return populatedData;
    }


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        setCompleted({
            ...completed,
            [activeStep]: true,
        });
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const QontoConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 10,
            left: 'calc(-50% + 16px)',
            right: 'calc(50% + 16px)',
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#784af4',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#784af4',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#eaeaf0',
            borderTopWidth: 3,
            borderRadius: 1,
            ...theme.applyStyles('dark', {
                borderColor: theme.palette.grey[800],
            }),
        },
    }));

    return (
        <>

            <Box sx={{ width: '100%' }}>
                {/* <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector/>}>
                    {steps.map((label, index) => (
                        <Step key={`label`+index} completed={completed[index]}>
                                <StepButton onClick={handleStep(index)}>
                                    <StepLabel sx={{ fontSize: '6' }}>{label}</StepLabel>
                                </StepButton>
                        </Step>
                    ))}
                </Stepper> */}
                <div>
                    {(
                        <React.Fragment>

                            {handleSteps(activeStep + 1)}
                            <div className="flex justify-between pt-3">
                                {activeStep !== 0 &&
                                    <button onClick={handleBack}
                                        className="bg-blue-200 border-blue-500 text-blue-600 rounded-md w-20 h-10 hover:bg-blue-500 hover:text-white justify-self-end">Back</button>
                                }
                                <Box sx={{ flex: '1 1 auto' }} />

                                {activeStep + 1 === steps.length ? (
                                    <button onClick={savePackage}
                                        className="bg-green-200 border-green-500 text-green-600 rounded-md w-40 h-10 hover:bg-green-500 hover:text-white">
                                        Save Package
                                    </button>
                                ) : (

                                    <button onClick={handleNext}
                                        className="bg-blue-200 border-blue-500 text-blue-600 rounded-md w-20 h-10 hover:bg-blue-500 hover:text-white">
                                        Next
                                    </button>
                                )}
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </Box>
        </>
    );
}

export default UpdatePackage;





function mapPrice(pricingMap, rate, hotelPref) {
    if (!pricingMap[hotelPref]) {
        pricingMap[hotelPref] = {};
    }
    if (rate.guestSharingType === 'SINGLE_SHARING') {
        pricingMap[hotelPref] = {
            ...pricingMap[hotelPref],
            singleSharingPrice: rate.adultRate,
            childWithoutBedPrice: rate.childRateWithoutBed,
            childWithBedPrice: rate.childRateWithBed,
            infantPrice: rate.infantRate
        };
    }
    if (rate.guestSharingType === 'TWIN_SHARING') {
        pricingMap[hotelPref] = {
            ...pricingMap[hotelPref],
            doubleSharingPrice: rate.adultRate,
            childWithoutBedPrice: rate.childRateWithoutBed,
            childWithBedPrice: rate.childRateWithBed,
            infantPrice: rate.infantRate
        };
    }
    if (rate.guestSharingType === 'THREE_SHARING') {
        pricingMap[hotelPref] = {
            ...pricingMap[hotelPref],
            threeSharingPrice: rate.adultRate,
            childWithoutBedPrice: rate.childRateWithoutBed,
            childWithBedPrice: rate.childRateWithBed,
            infantPrice: rate.infantRate
        };
    }
}

