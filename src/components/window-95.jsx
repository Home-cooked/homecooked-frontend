import React from "react";
import propTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

import styled, { css } from "styled-components";

const headers = {
  headerMaterialDark: "#000080",
  headerMaterialLight: "#1034a6"
};

const borders = {
  borderDarkest: "#050608",
  borderLightest: "#ffffff",
  borderDark: "#888c8f",
  borderLight: "#dfe0e3"
};

const shadow = "4px 4px 10px 0 rgba(0, 0, 0, 0.35)";

const SlyledWindowHeader = styled.div`
  height: 33px;
  line-height: 33px;
  padding: 0 0.5rem;
  margin-right: 2px;
  margin-bottom: 4px;
  font-weight: bold;
  color: white;
  background: linear-gradient(
    to right,
    ${headers.headerMaterialDark},
    ${headers.headerMaterialLight}
  );
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WindowHeader = ({ className, style, children, ...otherProps }) => (
  <SlyledWindowHeader className={className} style={style} {...otherProps}>
    {children}
  </SlyledWindowHeader>
);

const createBoxStyles = () => css`
  box-sizing: border-box;
  display: inline-block;
  background-color: #ced0cf;
  color: #050608;
`;

const createBorderStyles = (invert = false) =>
  invert
    ? css`
        border-style: solid;
        border-width: 2px;
        border-left-color: ${borders.borderDarkest};
        border-top-color: ${borders.borderDarkest};
        border-right-color: ${borders.borderLightest};
        border-bottom-color: ${borders.borderLightest};
        box-shadow: ${shadow} inset 1px 1px 0px 1px ${borders.borderDark},
          inset -1px -1px 0 1px ${borders.borderLight};
      `
    : css`
        border-style: solid;
        border-width: 2px;
        border-left-color: ${borders.borderLightest};
        border-top-color: ${borders.borderLightest};
        border-right-color: ${borders.borderDarkest};
        border-bottom-color: ${borders.borderDarkest};
        box-shadow: ${shadow} inset 1px 1px 0px 1px ${borders.borderLight},
          inset -1px -1px 0 1px ${borders.borderDark};
      `;

const StyledWindow = styled.div`
  position: relative;
  padding: 2px;
  max-width: 800px;
  ${createBorderStyles()} ${createBoxStyles()};
`;

const StyledOverlay = styled.div`
  background-color: white;
  opacity: 0.8;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  text-align: center;
`;

const CircularContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Window = ({
  title,
  className,
  children,
  loading = false,
  ...otherProps
}) => (
  <StyledWindow shadow={shadow} className={className} {...otherProps}>
    <WindowHeader>
      <span>{title}</span>
    </WindowHeader>
    <div style={{ position: "relative", overflow: "hidden" }}>
      {loading && (
        <StyledOverlay onClick={e => e.preventDefualt()}>
          <CircularContainer>
            <CircularProgress size={75} />
          </CircularContainer>
        </StyledOverlay>
      )}
      <div>{children}</div>
    </div>
  </StyledWindow>
);

export default Window;
