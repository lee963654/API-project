import CreateSpotForm from "./CreateSpotForm"

export default function CreateSpot () {
  const report = {
    address: '',
    city: '',
    state: "",
    country: "",
    name: "",
    description: "",
    price: "",
    // lat: "",
    // lng: "",
  };

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <CreateSpotForm
      report={report}
      formType="Create a New Spot"
    />

  );
};
