import { useContext } from "react";
import { vanContext } from "../components/Layout";


export default function VansForToday() {
  const { dbVans } = useContext(vanContext);

  

  return <div>Today's Vans Functionality Coming Soon!</div>;
}
