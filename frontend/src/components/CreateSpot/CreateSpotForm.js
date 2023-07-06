import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./CreateSpot.css"

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


    const newSpot = { ...report, address: address, city: city, state: state, country: country, name: name, description: description, price: price, lat: 1, lng: 1 };

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

        dispatch(updateSpotThunk(newSpot))
        history.push(`/${newSpot.id}`)
      }
      if (formType === "Create a New Spot") {
        const result = await dispatch(createSpotThunk(newSpot, urlImages))


        await history.push(`/${result.id}`)


      }


    }

  };



  return (
    // <div className="form-container">
    <div className={formType === "Create a New Spot" ? "form-container" : "form-container-update"}>
      <form className="form-section" onSubmit={handleSubmit}>
        <h2 className="form-header">{formType}</h2>
        <div className="form-section-container">
          <h3 className="description">Where's your place located?</h3>
          <h4 className="description-text">Guests will only get your exact address once they booked a reservation.</h4>
          {/* </div>
            <div className="form-section-container"> */}
          <div className="location-container">
            <div className="country-container">
              <label>
                <div>Country {validate && errors.countryError && <span className="formErrors">{errors.countryError}</span>}</div>
                <input
                  className="create-input-bar"
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </label>
            </div>

            <div className="address-container">
              <label>
                <div>Street Address {validate && errors.addressError && <span className="formErrors">{errors.addressError}</span>}</div>
                <input
                  className="create-input-bar"
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
            </div>
            <div className="city-state-group">
              <div className="city-container">
                <label>
                  <div>City {validate && errors.cityError && <span className="formErrors">{errors.cityError}</span>}</div>
                  <input
                    className="city-bar"
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </label>
              </div>

              <div className="state-container">
                <label>
                  <div>State {validate && errors.stateError && <span className="formErrors">{errors.stateError}</span>}</div>
                  <input
                    className="state-bar"
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section-container-description">
          <label>
            <h3 className="description">Describe your place to guests</h3>
            <h4 className="description-text">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h4>
            <textarea
              className="create-spot-textarea"
              minLength="30"
              rows="8"
              cols="50"
              type="text"
              placeholder="Please write at least 30 characters"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {validate && errors.descriptionError && <div className="formErrors">{errors.descriptionError}</div>}
          </label>
        </div>
        <div className="form-section-container-title">
          <label>
            <h3 className="description">Create a title for your spot</h3>
            <h4 className="description-text">Catch guests' attention with a spot title that highlights what makes your place special.</h4>
            <input
              className="create-input-bar"
              type="text"
              placeholder="Name of your spot"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {validate && errors.nameError && <div className="formErrors">{errors.nameError}</div>}
          </label>
        </div>
        <div className="form-section-container-title">
          <label>
            <h3 className="description">Set a base price for your spot</h3>
            <h4 className="description-text">Competitive pricing can help your listing stand out and rank higher in search results.</h4>
            <div className="dollar-sign-container">
              <div className="dollar-sign"><i class="fa-sharp fa-solid fa-dollar-sign fa-lg"></i></div>
              <input
                className="price-input-bar"
                type="number"
                placeholder="Price per night (USD)"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            {validate && errors.priceError && <span className="formErrors">{errors.priceError}</span>}
          </label>
        </div>
        {formType === "Create a New Spot" &&
          <div className="form-section-container-url">
            <label>
              <h3 className="description">Liven up your spot with photos</h3>
              <h4 className="description-text">Submit a link to at least one photo to publish your spot.</h4>
              <div className="url-container">
                <div className="single-url">
                  <input
                    className="create-input-bar"
                    type="text"
                    placeholder="Preview Image URL"
                    value={previewUrl}
                    onChange={e => setPreviewUrl(e.target.value)}
                  />
                  <div className="two-url-errors">
                    {validate && errors.imageError && <div className="formErrors">{errors.imageError}</div>}
                    {validate && errors.imageUrlError && <div className="formErrors">{errors.imageUrlError}</div>}
                  </div>
                </div>
                <div className="single-url">
                  <input
                    className="create-input-bar"
                    type="text"
                    placeholder="Image URL"
                    value={secondUrl}
                    onChange={e => setSecondUrl(e.target.value)}
                  />
                  {validate && errors.secondError && <div className="formErrors">{errors.secondError}</div>}
                </div>
                <div className="single-url">
                  <input
                    className="create-input-bar"
                    type="text"
                    placeholder="Image URL"
                    value={thirdUrl}
                    onChange={e => setThirdUrl(e.target.value)}
                  />
                  {validate && errors.thirdError && <div className="formErrors">{errors.thirdError}</div>}
                </div>
                <div className="single-url">
                  <input
                    className="create-input-bar"
                    type="text"
                    placeholder="Image URL"
                    value={fourthUrl}
                    onChange={e => setFourthUrl(e.target.value)}
                  />
                  {validate && errors.fourthError && <div className="formErrors">{errors.fourthError}</div>}
                </div>
                <div className="single-url">
                  <input
                    className="create-input-bar"
                    type="text"
                    placeholder="Image URL"
                    value={fifthUrl}
                    onChange={e => setFifthUrl(e.target.value)}
                  />
                  {validate && errors.fifthError && <div className="formErrors">{errors.fifthError}</div>}
                </div>
              </div>
            </label>
          </div>
        }
        {/* <div className="create-button-container"> */}
        <div className={formType === "Create a New Spot" ? "create-button-container" : "create-button-container-update"}>
          <button className="create-submit-button" type="submit">{formType === "Create a New Spot" ? "Create Spot" : "Update Your Spot"}</button>
        </div>
      </form>

    </div>
  );


}

// disabled={!!Object.values(errors).length}
