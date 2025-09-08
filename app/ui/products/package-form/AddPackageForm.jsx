import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DepartureCityDateComponent from "./components/DepartureCityDateComponent";
import { font } from "../../fonts";

const AddPackageForm = ({ handleChange, values, departureCityDateData, updateCityDateComponent, setShowNextButton, isUpdateRequest }) => {

  console.log("isUpdateRequest", isUpdateRequest)
  if (isUpdateRequest && values.packageName === '') {
    return <div>
      <label htmlFor="packageName" className={`${font.className} mb-2 block text-lg font-bold`}>
        Loading.....
      </label>
    </div>
  }
  const [cityData, setCityData] = useState([]);
  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_API_URL;
    const url = `${domain}/v1/fetch/cities`;

    const postData = {
      countryIds: [101]
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
  }, []);

  setShowNextButton(values.packageName !== '' && values.packageCode !== ''
    && (values.packageTypeDomesticTours === true || values.packageTypeInternationalTours === true)
    && (values.packageThemeFamily === true || values.packageThemeHoneymoonSpecial === true ||
      values.packageThemeCustomizedHolidays === true || values.packageThemePopular === true || values.packageThemeSpecialValueFD === true)
    && (values.packageIncludesMeals === true || values.packageIncludesHotels === true ||
      values.packageIncludesSightSeeing === true || values.packageIncludesTransfers === true));


  return (
    <>
      <div className="rounded-md border border-gray-200 p-4 md:p-6">

        <div className="flex flex-wrap border border-gray-200 rounded-md bg-gray-50">

          <div className="p-3 mb-5 basis-1/2">
            <label htmlFor="packageName" className={`${font.className} mb-2 block text-sm font-medium`}>
              Package Name*
            </label>
            <input
              type="text"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              name="packageName"
              placeholder="Package Name"
              value={values.packageName}
              onChange={handleChange}
            />
            {values.packageName === '' && <label htmlFor="packageName" className={`${font.className} mb-2 block text-sm text-red-500`}>
              Package Name is Mandatory
            </label>}
          </div>
          <div className="p-3 mb-5 basis-1/2">
            <label htmlFor="packageName" className={`${font.className} mb-2 block text-sm font-medium`}>
              Package Code
            </label>
            <input
              type="text"
              className="peer block cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              name="packageCode"
              placeholder="Package Code"
              value={values.packageCode}
              onChange={handleChange}
            />
            {values.packageCode === '' && <label htmlFor="packageName" className={`${font.className} mb-2 block text-sm text-red-500`}>
              Package Code is Mandatory
            </label>}
          </div>
        </div>

        <div className="p-3"></div>

        <div className="flex flex-col p-3 mb-5 rounded-md border border-gray-200 bg-gray-50">
          <div className="flex flex-col p-3 mb-5">
            <label htmlFor="packageTheme" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
              Package Type*
            </label>
            {values.packageTypeDomesticTours === false && values.packageTypeInternationalTours === false
              && <label htmlFor="packageName" className={`${font.className} mb-2 block text-sm text-red-500`}>
                Package Type is Mandatory
              </label>}
            <div className="flex flex-grow">

              <input
                type="checkbox"
                className="peer block cursor-pointer rounded-md border border-gray-400 pt-4 pl-4 text-sm outline-2 placeholder:text-gray-500"
                name="packageTypeDomesticTours"
                checked={values.packageTypeDomesticTours}
                onChange={handleChange}
              />
              <label htmlFor="packageTypeDomesticTours" className={`${font.className} mb-2 block text-sm font-medium pl-2 pr-5`}>
                Domestic Tours
              </label>

              <input
                type="checkbox"
                className="peer block cursor-pointer rounded-md border border-gray-400 pt-4 pl-4 text-sm outline-2 placeholder:text-gray-500"
                name="packageTypeInternationalTours"
                checked={values.packageTypeInternationalTours}
                onChange={handleChange}
              />
              <label htmlFor="packageTypeInternationalTours" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                International Tours
              </label>
            </div>
          </div>


          <div className="flex flex-col p-3 mb-5">
            <label htmlFor="packageTheme" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
              Package Theme*
            </label>
            {values.packageThemeFamily === false && values.packageThemeHoneymoonSpecial === false &&
              values.packageThemeCustomizedHolidays === false && values.packageThemePopular === false && values.packageThemeSpecialValueFD === false
              && <label htmlFor="packageName" className={`${font.className} mb-2 block text-sm text-red-500`}>
                Package Theme is Mandatory
              </label>}
            <div className="flex flex-grow">
              <input
                type="checkbox"
                className="peer block cursor-pointer rounded-md border border-gray-400 pt-4 pl-4 text-sm outline-2 placeholder:text-gray-500"
                name="packageThemeFamily"
                checked={values.packageThemeFamily}
                onChange={handleChange}
              />
              <label htmlFor="packageThemeFamily" className={`${font.className} mb-2 block text-sm font-medium pl-2 pr-5`}>
                Family
              </label>

              <input
                type="checkbox"
                className="peer block cursor-pointer rounded-md border border-gray-400 pt-4 pl-4 text-sm outline-2 placeholder:text-gray-500"
                name="packageThemeHoneymoonSpecial"
                checked={values.packageThemeHoneymoonSpecial}
                onChange={handleChange}
              />
              <label htmlFor="packageThemeHoneymoonSpecial" className={`${font.className} mb-2 block text-sm font-medium pl-2 pr-5`}>
                Honeymoon Special
              </label>


              <input
                type="checkbox"
                className="peer block cursor-pointer rounded-md border border-gray-400 pt-4 pl-4 text-sm outline-2 placeholder:text-gray-500"
                name="packageThemeCustomizedHolidays"
                checked={values.packageThemeCustomizedHolidays}
                onChange={handleChange}
              />
              <label htmlFor="packageThemeCustomizedHolidays" className={`${font.className} mb-2 block text-sm font-medium pl-2 pr-5`}>
                Customized Holidays
              </label>

              <input
                type="checkbox"
                className="peer block cursor-pointer rounded-md border border-gray-400 pt-4 pl-4 text-sm outline-2 placeholder:text-gray-500"
                name="packageThemePopular"
                checked={values.packageThemePopular}
                onChange={handleChange}
              />
              <label htmlFor="packageThemePopular" className={`${font.className} mb-2 block text-sm font-medium pl-2 pr-5`}>
                Popular
              </label>


              <input
                type="checkbox"
                className="peer block cursor-pointer rounded-md border border-gray-400 pt-4 pl-4 text-sm outline-2 placeholder:text-gray-500"
                name="packageThemeSpecialValueFD"
                checked={values.packageThemeSpecialValueFD}
                onChange={handleChange}
              />
              <label htmlFor="packageThemeSpecialValueFD" className={`${font.className} mb-2 block text-sm font-medium pl-2 pr-5`}>
                Special value FD
              </label>

              <input
                type="checkbox"
                className="peer block cursor-pointer rounded-md border border-gray-400 pt-4 pl-4 text-sm outline-2 placeholder:text-gray-500"
                name="packageThemePiligrimage"
                checked={values.packageThemePiligrimage}
                onChange={handleChange}
              />
              <label htmlFor="packageThemePiligrimage" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                Piligrimage
              </label>
            </div>
          </div>

          <div className="flex flex-col p-3 mb-5">
            <label htmlFor="tourIncludes" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
              Tour Includes*
            </label>
            {values.packageIncludesMeals === false && values.packageIncludesHotels === false &&
              values.packageIncludesSightSeeing === false && values.packageIncludesTransfers === false
              && <label htmlFor="error" className={`${font.className} mb-2 block text-sm text-red-500`}>Package Theme is Mandatory </label>}
            <div className="flex flex-grow">
              <input
                type="checkbox"
                className="peer block cursor-pointer rounded-md border border-gray-400 pt-4 pl-4 text-sm outline-2 placeholder:text-gray-500"
                name="packageIncludesMeals"
                checked={values.packageIncludesMeals}
                onChange={handleChange}
              />
              <label htmlFor="packageIncludesMeals" className={`${font.className} mb-2 block text-sm font-medium pl-2 pr-5`}>
                Meals
              </label>

              <input
                type="checkbox"
                className="peer block cursor-pointer rounded-md border border-gray-400 pt-4 pl-4 text-sm outline-2 placeholder:text-gray-500"
                name="packageIncludesHotels"
                checked={values.packageIncludesHotels}
                onChange={handleChange}
              />
              <label htmlFor="packageIncludesHotels" className={`${font.className} mb-2 block text-sm font-medium pl-2 pr-5`}>
                Hotels
              </label>


              <input
                type="checkbox"
                className="peer block cursor-pointer rounded-md border border-gray-400 pt-4 pl-4 text-sm outline-2 placeholder:text-gray-500"
                name="packageIncludesSightSeeing"
                checked={values.packageIncludesSightSeeing}
                onChange={handleChange}
              />
              <label htmlFor="packageIncludesSightSeeing" className={`${font.className} mb-2 block text-sm font-medium pl-2 pr-5`}>
                Sightseeing
              </label>

              <input
                type="checkbox"
                className="peer block cursor-pointer rounded-md border border-gray-400 pt-4 pl-4 text-sm outline-2 placeholder:text-gray-500"
                name="packageIncludesTransfers"
                checked={Boolean(values.packageIncludesTransfers)}
                onChange={handleChange}
              />
              <label htmlFor="packageIncludesTransfers" className={`${font.className} mb-2 block text-sm font-medium pl-2`}>
                Transfers
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-3 mb-5 bg-gray-50 rounded-md border border-gray-200">
          {departureCityDateData.map((data, i) => {
            return (
              <div key={i} className="flex flex-row">
                <DepartureCityDateComponent
                  index={i}
                  handleChange={handleChange}
                  cityData={cityData}
                  departureCity={data.cityId}
                  departureDate={data.departureDate}
                  setShowNextButton={setShowNextButton} />
                <div className="p-2 pl-20 pt-10">
                  {departureCityDateData.length === i + 1 ?

                    <button onClick={() => updateCityDateComponent(i, "add")}
                      className="bg-blue-200 border-blue-500 text-blue-600 rounded-md w-10 h-7 hover:bg-blue-500 hover:text-white justify-self-end">
                      {<AddIcon />}
                    </button>
                    :
                    <button onClick={() => updateCityDateComponent(i, "delete")}
                      className="bg-red-200 border-red-500 text-red-600 rounded-md w-10 h-7 hover:bg-red-500 hover:text-white justify-self-end">
                      {<DeleteIcon />}
                    </button>
                  }
                </div>
              </div>
            );
          })}
        </div>

        <div>

        </div>

      </div>
    </>
  );
}
export default AddPackageForm;




