import { useParams } from "react-router-dom";

function EditEmployee() {
  const { id } = useParams();

  return <h1>Edit Employee : {id}</h1>;
}

export default EditEmployee;