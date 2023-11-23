import React from "react";
import { BannerContext } from "./Banner";
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { MdUpdate } from "react-icons/md";

export default function BannerElement({ varient, text }) {
  const bannerData = {
    success: {
      titleText: "Congratulations!",
      bannerImg: <AiOutlineCheckCircle className="banner-img" />,
    },
    warning: {
      titleText: "Attention",
      bannerImg: <AiOutlineExclamationCircle className="banner-img" />,
    },
    error: {
      titleText: "There is a problem with your application",
      bannerImg: <VscError className="banner-img" />,
    },
    neutral: {
      titleText: "Update available",
      bannerImg: <MdUpdate className="banner-img" />,
    },
  };
  const { titleText, bannerImg } = bannerData[varient] || {
    titleText: "",
    bannerImg: "",
  };

  return (
    <div className={`banner-el-container ${varient}`}>
      {bannerImg}
      <h4 className="banner-title">{titleText}</h4>
      <p className="banner-description">{text}</p>
    </div>
  );
}
