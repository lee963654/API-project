import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { updateSpotThunk, createSpotThunk, addSpotImageThunk } from '../../store/spots';

export default function CreateSpotForm({ report, formType }) {
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

  function imageCheck(url) {
    return /\.(jpg|jpeg|png)$/.test(url);
  }

  useEffect(() => {


    if (country.length <= 0) {
      const countryError = "Country is required"
      err.countryError = countryError
    }
    if (address.length <= 0) {
      const addressError = "Address is required"
      err.addressError = addressError
    }
    if (city.length <= 0) {
      const cityError = "City is required"
      err.cityError = cityError
    }
    if (state.length <= 0) {
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
    if (previewUrl.length <= 0 && formType === "Create a New Spot") {
      const imageError = "Preview image is required"
      err.imageError = imageError
    }
    if (!imageCheck(previewUrl) && formType === "Create a New Spot") {
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


    const newSpot = { ...report, address: address, city: city, state: state, country: country, name: name, description: description, price: price };

    const urlImages = [{ url: previewUrl, preview: true }]
    if (secondUrl) urlImages.push({ url: secondUrl, preview: false })
    if (thirdUrl) urlImages.push({ url: thirdUrl, preview: false })
    if (fourthUrl) urlImages.push({ url: fourthUrl, preview: false })
    if (fifthUrl) urlImages.push({ url: fifthUrl, preview: false })


    if (Object.values(errors).length) {

      setValidate(true)
    } else {
      setValidate(false)
      if (formType === "Update Your Spot") {
        console.log("this is the edited report that will be dispatched to the updatespotthunk", newSpot)
        dispatch(updateSpotThunk(newSpot))
        history.push(`/${newSpot.id}`)
      }
      if (formType === "Create a New Spot") {
        const result = await dispatch(createSpotThunk(newSpot, urlImages))

        console.log("created a new spot", newSpot)
        console.log("the result of the spot after the createspotthunk", result)
        await history.push(`/${result.id}`)


      }


    }

  };



  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>

        <h2 className="form-header">{formType}</h2>
        <div className="form-section-container">
          <h3 className="description">Where's your place located?</h3>
          <h4 className="description-text">Guests will only get your exact address once they booked a reservation.</h4>
        </div>
        <div className="form-section-container">
          <div className="country-container">
            <label>
              <h3>Country {validate && errors.countryError && <span className="formErrors">{errors.countryError}</span>}</h3>
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
          </div>
          <div className="address-container">
            <label>
              <h3>Street Address {validate && errors.addressError && <span className="formErrors">{errors.addressError}</span>}</h3>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div>
          <div className="city-container">
            <label>
              <h3>City {validate && errors.cityError && <span className="formErrors">{errors.cityError}</span>}</h3>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
          </div>
          <div className="state-container">
            <label>
              <h3>State {validate && errors.stateError && <span className="formErrors">{errors.stateError}</span>}</h3>
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="form-section-container">
          <label>
            <h3 className="description">Describe your place to guests</h3>
            <h4 className="description-text">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h4>
            <textarea
              minLength="30"
              rows="4"
              cols="50"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {validate && errors.descriptionError && <span className="formErrors">{errors.descriptionError}</span>}
          </label>
        </div>
        <div className="form-section-container">
          <label>
            <h3 className="description">Create a title for your spot</h3>
            <h4 className="description-text">Catch guests' attention with a spot title that highlights what makes your place special.</h4>
            <input
              type="text"
              placeholder="Name of your spot"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {validate && errors.nameError && <span className="formErrors">{errors.nameError}</span>}
          </label>
        </div>
        <div className="form-section-container">
          <label>
            <h3 className="description">Set a base price for your spot</h3>
            <h4 className="description-text">Competitive pricing can help your listing stand out and rank higher in search results.</h4>
            <input
              type="number"
              placeholder="Price per night (USD)"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            {validate && errors.priceError && <span className="formErrors">{errors.priceError}</span>}
          </label>
        </div>
        {formType === "Create a New Spot" &&
          <div className="form-section-container">
            <label>
              <h3 className="description">Liven up your spot with photos</h3>
              <h4 className="description-text">Submit a link to at least one photo to publish your spot.</h4>
              <div className="single-url">
                <input
                  type="text"
                  placeholder="Preview Image URL"
                  value={previewUrl}
                  onChange={e => setPreviewUrl(e.target.value)}
                />
                {validate && errors.imageError && <span className="formErrors">{errors.imageError}</span>}
                {validate && errors.imageUrlError && <span className="formErrors">{errors.imageUrlError}</span>}
              </div>
              <div className="single-url">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={secondUrl}
                  onChange={e => setSecondUrl(e.target.value)}
                />
                {validate && errors.secondError && <p className="formErrors">{errors.secondError}</p>}
              </div>
              <div className="single-url">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={thirdUrl}
                  onChange={e => setThirdUrl(e.target.value)}
                />
                {validate && errors.thirdError && <p className="formErrors">{errors.thirdError}</p>}
              </div>
              <div className="single-url">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={fourthUrl}
                  onChange={e => setFourthUrl(e.target.value)}
                />
                {validate && errors.fourthError && <p className="formErrors">{errors.fourthError}</p>}
              </div>
              <div className="single-url">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={fifthUrl}
                  onChange={e => setFifthUrl(e.target.value)}
                />
                {validate && errors.fifthError && <p className="formErrors">{errors.fifthError}</p>}
              </div>
            </label>
          </div>
        }
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );


}

// disabled={!!Object.values(errors).length}
