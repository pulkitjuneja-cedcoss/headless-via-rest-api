import React, { useEffect, useState } from "react";
import { FlexLayout } from "@cedcommerce/ounce-ui";

const StarRated = ({
  activeColor = "#FFD700",
  defaultColor = "gray",
  maximum = 5,
  present = 1,
  size = 25,
  spacing = "loose",
}) => {
  const [hover, sethover] = useState(present);
  useEffect(() => {
    sethover(present);
  }, [present]);
  const temp = [];
  for (let index = 1; index <= maximum; index++) {
    temp.push(
      <label
        key={index}
        // onMouseEnter={() => sethover(index)}
        // onMouseLeave={() => sethover(present)}
        // onClick={() => onClick(index)}
      >
        <svg id="svg2" height={size} viewBox="0 0 750 750" version="1.1">
          <g
            id="layer1"
            transform="translate(0 -302.36)"
            stroke="green"
            strokeWidth="1px"
            display="none"
            fill={index <= (hover || present) ? activeColor : defaultColor}
          >
            <path id="path3961" d="m375 705.67v-296.54" />
            <path id="path3963" d="m375 705.67 282.1-91.66" />
            <path id="path3965" d="m375 705.67 174.31 239.92" />
            <path id="path3967" d="m375 705.67-174.31 239.92" />
            <path id="path3969" d="m375 705.67-282.1-91.66" />
          </g>
          <g id="layer2" display="none">
            <path
              id="path3971"
              d="m92.899 614.01 564.2 0.00001l-456.41 331.58 174.31-536.46 174.31 536.46z"
              transform="translate(0 -302.36)"
              stroke="green"
              strokeWidth="1px"
              fill={
                index <= (hover || present)
                  ? activeColor || "#FFD700"
                  : defaultColor || "lightgray"
              }
            />
          </g>
          <g id="g3016">
            <path
              id="path3018"
              stroke="green"
              strokeWidth="1px"
              fill={
                index <= (hover || present)
                  ? activeColor || "#FFD700"
                  : defaultColor || "lightgray"
              }
              d="m375 106.78-66.562 204.88h-215.53l174.38 126.66-66.6 204.9 174.31-126.63 174.31 126.62-66.594-204.91 174.38-126.66h-215.53l-66.57-204.86z"
            />
          </g>
        </svg>
      </label>
    );
  }
  return (
    <React.Fragment>
      <FlexLayout spacing={spacing} halign="start" wrap="wrap">
        {temp.map((e) => e)}
      </FlexLayout>
    </React.Fragment>
  );
};
export default StarRated;
