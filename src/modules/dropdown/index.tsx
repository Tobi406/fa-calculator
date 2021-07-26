import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import React, { FC, ReactElement, useState } from "react";
import Icon from "src/common/Icon";
import styled, { css } from "styled-components";

const Wrapper = styled.div<{
  disabled?: boolean,
}>`
  margin: 5px;
  position: relative;
  ${props => props.disabled && css`display: none;`}
`;

const Expandable = styled.div<{
  displayExpandable: boolean,
}>`
  ${props => !props.displayExpandable && css`display: none;`};
`;
const Header = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  padding: 4px;
  display: flex;
  align-items: center;
`;
const WrapperIcon = styled(Icon)`
  position: absolute;
  right: 0;
  margin: 0 4px 0 0;
  > path {
    transition: d .5s ease-in-out;
  }
`;

const Dropdown: FC<{
  title: React.ReactNode | string,
  disabled?: boolean,
}> = ({ title, children, disabled = false }): ReactElement => {
  const [display, setDisplay] = useState(false);
  
  return (
    <Wrapper disabled={disabled}>
      <Header onClick={() => setDisplay(!display)}>
        {title}
        <WrapperIcon icon={display ? faChevronRight : faChevronDown} />
      </Header>
      <Expandable displayExpandable={display}>
        {children}
      </Expandable>
    </Wrapper>
  )
}

export default Dropdown;
