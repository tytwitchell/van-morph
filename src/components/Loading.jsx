import { useEffect, useState } from "react";
import { FaVanShuttle } from "react-icons/fa6";
import { HiCloud } from "react-icons/hi";
import { HiMiniCloud } from "react-icons/hi2";

export default function Loading() {
  const [styles1, setStyles1] = useState({ opacity: 0 });
  const [styles2, setStyles2] = useState({ opacity: 0 });
  const [styles3, setStyles3] = useState({ opacity: 0 });

  useEffect(() => {
    const timeout1 = setTimeout(() => setStyles1({ opacity: 1 }), 750);
    const timeout2 = setTimeout(() => setStyles2({ opacity: 1 }), 1100);
    const timeout3 = setTimeout(() => setStyles3({ opacity: 1 }), 1500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  return (
    <div className="loading-container">
      <h2>Loading</h2>
      <HiMiniCloud style={styles3} className="smoke" size="1rem" />
      <HiCloud style={styles2} className="smoke" size=".8rem" />
      <HiCloud style={styles1} className="smoke" size=".5rem" />
      <FaVanShuttle className="loading-van" size="2rem" fill="solid" />
    </div>
  );
}
