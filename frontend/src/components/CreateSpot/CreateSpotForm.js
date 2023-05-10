import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { updateSpotThunk, createSpotThunk } from '../../store/spots';

export default function CreateSpotForm ({ report, formType }) {
    const history = useHistory();

    const [address, setAddress] = useState(report?.address)
    const [city, setCity] = useState(report?.city)
    const [state, setState] = useState(report?.state)
    const [country, setCountry] = useState(report?.country)
    const [name, setName] = useState(report?.name)
    const [description, setDescription] = useState(report?.description)
    const [price, setPrice] = useState(report?.price)
    const [previewUrl, setPreviewUrl] = useState("")

    const [secondUrl, setSecondUrl] = useState("")
    const [thirdUrl, setThirdUrl] = useState("")
    const [fourthUrl, setFourthUrl] = useState("")
    const [fifthUrl, setFifthUrl] = useState("")

    // const [lat, setLat] = useState(report?.lat)
    // const [lng, setLng] = useState(report?.lng)
    const [validate, setValidate] = useState(false)
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const err = {}

    function imageCheck (url) {
        return /\.(jpg|jpeg|png)$/.test(url);
      }

    useEffect(() => {
        // const err = {}

        if (country.length <= 0) {
            const countryError = "Country is required"
            err.countryError = countryError
        }
        if (address.length <= 0) {
            const addressError = "Address is required"
            err.addressError = addressError
        }
        if (city.length <=0) {
            const cityError = "City is required"
            err.cityError = cityError
        }
        if (state.length <=0) {
            const stateError = "State is required"
            err.stateError = stateError
        }
        if (description.length < 30) {
            const descriptionError = "Description needs a minimum of 30 characters"
            err.descriptionError = descriptionError
        }
        if (name.length <= 0) {
            const nameError = "Name is required"
            err.nameError = nameError
        }
        if (price <= 0) {
            const priceError = "Price is required"
            err.priceError = priceError
        }
        if (previewUrl.length <= 0) {
            const imageError = "Preview image is required"
            err.imageError = imageError
        }
        if (!imageCheck(previewUrl)) {
            const imageUrlError = "Image URL must end in .png, .jpg, or .jpeg"
            err.imageUrlError = imageUrlError
        }
        if (secondUrl.length > 0 && !imageCheck(secondUrl)) {
            const secondError = "Image URL must end in .png, .jpg, or .jpeg"
            err.secondError = secondError
        }
        if (thirdUrl.length > 0 && !imageCheck(thirdUrl)) {
            const thirdError = "Image URL must end in .png, .jpg, or .jpeg"
            err.thirdError = thirdError
        }
        if (fourthUrl.length > 0 && !imageCheck(fourthUrl)) {
            const fourthError = "Image URL must end in .png, .jpg, or .jpeg"
            err.fourthError = fourthError
        }
        if (fifthUrl.length > 0 && !imageCheck(fifthUrl)) {
            const fifthError = "Image URL must end in .png, .jpg, or .jpeg"
            err.fifthError = fifthError
        }

        setErrors(err)
    }, [country, address, city, state, description, name, price, previewUrl, secondUrl, thirdUrl, fourthUrl, fifthUrl])




    const handleSubmit = async (e) => {
      e.preventDefault();

    //   report = { ...report, address: address, city: city, state: state, country: country, name: name, description: description, price: price };
      const newSpot = { ...report, address: address, city: city, state: state, country: country, name: name, description: description, price: price };
    //   if (formType === 'Update Report') {
    //     const editedReport = await dispatch(updateReport(report));
    //     report = editedReport;
    //   } else if (formType === 'Create Report') {
    //     const newReport = await dispatch(createReport(report));
    //     report = newReport;
    //   }
    const urlImages = []
    urlImages.push(previewUrl)
    if (secondUrl) urlImages.push(secondUrl)
    if (thirdUrl) urlImages.push(thirdUrl)
    if (fourthUrl) urlImages.push(fourthUrl)
    if (fifthUrl) urlImages.push(fifthUrl)


    if (Object.values(errors).length) {
        console.log("errors", errors)
        setValidate(true)
    } else {
        setValidate(false)
        if (formType === "Update Your Spot") {
          console.log("this is the edited report that is dispatched to the updatespotthunk", newSpot)
          dispatch(updateSpotThunk(newSpot))
          history.push(`/${newSpot.id}`)
        } else if (formType === "Create a New Spot") {
          dispatch(createSpotThunk(newSpot))
          console.log("created a new spot", newSpot)
          history.push("/")
        }



        // urlImages.forEach((url) => {
        //     dispatch(addPreviewImageThunk())
        // })





    }

    };



    return (
        <form onSubmit={handleSubmit}>

          <h2>{formType}</h2>
          <h3>Where's your place located?</h3>
          <h4>Guests will only get your exact address once they booked a reservation.</h4>
          <div className="errors">{}</div>
            {validate && errors.countryError && <p className="formErrors">{errors.countryError}</p>}
          <label>
            <h3>Country</h3>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <div className="errors">{}</div>
            {validate && errors.addressError && <p className="formErrors">{errors.addressError}</p>}
          <label>
            <h3>Street Address</h3>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
            {validate && errors.cityError && <p className="formErrors">{errors.cityError}</p>}
          <label>
            <h3>City</h3>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
            {validate && errors.stateError && <p className="formErrors">{errors.stateError}</p>}
          <label>
            <h3>State</h3>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>

          <div className="create-description-container">
          <label>
          <h3>Describe your place to guests</h3>
          <h4>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h4>
            <textarea
              minLength="30"
              rows="4"
              cols="50"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
            {validate && errors.descriptionError && <p className="formErrors">{errors.descriptionError}</p>}
          </div>
          <div className ="title-container">
            <label>
                <h3>Create a title for your spot</h3>
                <h4>Catch guests' attention with a spot title that highlights what makes your place special.</h4>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
                {validate && errors.nameError && <p className="formErrors">{errors.nameError}</p>}
          </div>
          <div>
            <label>
                <h3>Set a base price for your spot</h3>
                <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </label>
                {validate && errors.priceError && <p className="formErrors">{errors.priceError}</p>}
          </div>
          <div className="url-container">
            <label>
                <h3>Liven up your spot with photos</h3>
                <h4>Submit a link to at least one photo to publish your spot.</h4>
                <input
                    type="url"

                    placeholder="Preview Image URL"
                    value={previewUrl}
                    onChange={e => setPreviewUrl(e.target.value)}
                />
                {validate && errors.imageError && <p className="formErrors">{errors.imageError}</p>}
                {validate && errors.imageUrlError && <p className="formErrors">{errors.imageUrlError}</p>}
                <input
                    type="url"
                    value={secondUrl}
                    onChange={e => setSecondUrl(e.target.value)}
                />
                {validate && errors.secondError && <p className="formErrors">{errors.secondError}</p>}
                <input
                    type="url"
                    value={thirdUrl}
                    onChange={e => setThirdUrl(e.target.value)}
                />
                {validate && errors.thirdError && <p className="formErrors">{errors.thirdError}</p>}
                <input
                    type="url"
                    value={fourthUrl}
                    onChange={e => setFourthUrl(e.target.value)}
                />
                {validate && errors.fourthError && <p className="formErrors">{errors.fourthError}</p>}
                <input
                    type="url"
                    value={fifthUrl}
                    onChange={e => setFifthUrl(e.target.value)}
                />
                {validate && errors.fifthError && <p className="formErrors">{errors.fifthError}</p>}
            </label>
          </div>

          <button type="submit">Create Spot</button>
        </form>
      );


}

// disabled={!!Object.values(errors).length}
