import React from "react";

const BannerContext = React.createContext();
export { BannerContext };

export default function Banner({ children }) {
  const [bannerType, setBannerType] = React.useState("");
  const [bannerDescription, setBannerDescription] = React.useState("");

  return (
    <BannerContext.Provider
      value={{
        bannerType,
        setBannerType,
        bannerDescription,
        setBannerDescription,
      }}
    >
      <div className="banner-container">{children}</div>
    </BannerContext.Provider>
  );
}


/* 
  <Banner.Element varient="success" />
  <Banner.Element varient="warning" />
  <Banner.Element varient="error" />
  <Banner.Element varient="neutral" /> 
*/
