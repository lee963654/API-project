import CreateSpotForm from "./CreateSpotForm"

export default function CreateSpot () {
  const report = {
    understanding: '',
    improvement: '',
  };

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <CreateSpotForm
      report={report}
      formType="Create Report"
    />
  );
};
