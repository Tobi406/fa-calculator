import { faEllipsisV, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FC, ReactElement, useState } from "react";
import Icon from "src/common/Icon";
import Text from "src/common/Text";
import styled, { css } from "styled-components";
import Semicircle from "src/modules/parliament/semicircle";
import PartyChanger from "src/modules/parliament/partyChanger";
import { useDispatch } from "react-redux";
import Dropdown from "../dropdown";

const Container = styled.div`
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  padding: 2px 10px;
`;
const Top = styled.div`
  display: flex;
  justify-content: center;
`;
const EllipsisIcon = styled(Icon)`
  position: absolute;
  right: 0;
  padding: 2px 10px;
`;
const Popup = styled.div<{
  displayPopup?: boolean
}>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  right: 0;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 25px;
  z-index: 10;

  ${props => !props.displayPopup && css`display: none;`}
`;
const Close = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2px;
`;

interface Parties {
  [key: string]: {
    colour: string,
    seats: number,
  }
}

const Parliament: FC<{
  title: string,
  parties: Parties | boolean,
  faParties: Parties | boolean,
}> = ({ title, parties, faParties }): ReactElement => {
  const [display, setDisplay] = useState(false);
  const [displayDelegates, setDisplayDelegates] = useState(false);
  const dispatch = useDispatch();

  return (
    <Container>
      {typeof parties !== 'boolean' && <>
        <Top>
          <Text type="h2">
            {title}
          </Text>
          <EllipsisIcon
            icon={faEllipsisV}
            onClick={() => setDisplay(!display)}
          />
          <Popup
            displayPopup={display}
          >
            <PartyChanger
              parties={parties}
              state={title}
              inputDisabled={typeof faParties === 'boolean'}
              addDisabled={typeof faParties === 'boolean'}
              removeDisabled={typeof faParties === 'boolean'}              
            />
            <Close>
              <Text color="$primary">
                Close
              </Text>&nbsp;
              <Icon
                icon={faTimes}
                color="$primary"
                onClick={() => setDisplay(!display)}
              />
            </Close>
          </Popup>
        </Top>
        <Semicircle
          parties={parties}
        />
      </>}
      {typeof faParties !== 'boolean' && <Dropdown
        title={
          <Text color="$primary">
            View delegates to Federal Assembly
          </Text>
        }
      >
        <EllipsisIcon
          icon={faEllipsisV}
          onClick={() => setDisplayDelegates(!displayDelegates)}
        />
        <Popup
          displayPopup={displayDelegates}
        >
          <PartyChanger
            parties={faParties}
            state={`${title}-FA`}
            moveDisabled={true}
            inputDisabled={true}
            addDisabled={true}
            removeDisabled={true}
          />
          <Close>
            <Text color="$primary">
              Close
            </Text>&nbsp;
            <Icon
              icon={faTimes}
              color="$primary"
              onClick={() => setDisplayDelegates(!displayDelegates)}
            />
          </Close>
        </Popup>
        <Semicircle
          parties={faParties}
        />
      </Dropdown>}
    </Container>
  )
}

export default Parliament;
