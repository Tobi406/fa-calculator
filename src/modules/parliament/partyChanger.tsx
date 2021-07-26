import { faCheck, faChevronDown, faChevronUp, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FC, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorDisplay from "src/common/ColorDisplay";
import Icon from "src/common/Icon";
import { RootState } from "src/store";
import styled, { css } from "styled-components";
import { addParty, removeParty, moveParty, partySeats, movePartyGlobal } from "./parliamentSlice";

const PartyData = styled.td`
  display: flex;
  align-items: center;
`;
const PercentData = styled.td`
  text-align: right;
`;

const Input = styled.input`
  width: 40px;
`;

const MoveWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PartyChanger: FC<{
  parties: {
    [key: string]: {
      colour: string,
      seats: number,
    },
  },
  state: string,
  moveDisabled?: boolean,
  inputDisabled?: boolean,
  addDisabled?: boolean,
  removeDisabled?: boolean,
}> = ({
  parties,
  state, 
  moveDisabled = false,
  inputDisabled = false,
  removeDisabled = false,
  addDisabled = false
}): ReactElement => {
  const addParties = Object
    .entries(useSelector((state: RootState) => state.parliaments.parties))
    .filter(([key, value]) => !Object.keys(parties).includes(key));
  const [selectedParty, setSelectedParty] = useState(addParties[0]?.[0] ?? '');
  const dispatch = useDispatch();
  const partiesTotalIndex = Object.entries(parties).length;
  const totalSeats = Object.values(parties)
    .map(data => data.seats)
    .reduce((a, b) => a + b);


  return (
    <table>
      <tbody>
        {Object.entries(parties).map(([key, value], index) => {
          return <tr key={index}>
            <PartyData>
              {!moveDisabled && <>
                <MoveWrapper>
                  <Icon
                    icon={faChevronUp}
                    size="xs"
                    onClick={() => {
                      if (!((index - 1) < 0)) {
                        if (state === 'FA') {
                          dispatch(movePartyGlobal({
                            oldIndex: index,
                            newIndex: index - 1,
                          }))
                        } else {
                          dispatch(moveParty({
                            state: state,
                            oldIndex: index,
                            newIndex: index - 1,
                          }));
                        }
                      }
                    }}
                  />
                  <Icon
                    icon={faChevronDown}
                    size="xs"
                    onClick={() => {
                      if (!((index + 1) > partiesTotalIndex)) {
                        if (state === 'FA') {
                          dispatch(movePartyGlobal({
                            oldIndex: index,
                            newIndex: index + 1,
                          }))
                        } else {
                          dispatch(moveParty({
                            state: state,
                            oldIndex: index,
                            newIndex: index + 1,
                          }));
                        }
                      }
                    }}
                  />
                </MoveWrapper>&nbsp;
              </>}
              <ColorDisplay color={value.colour} />{key}
            </PartyData>
            <td>
              <Input
                value={value.seats}
                disabled={inputDisabled}
                type="number"
                onChange={(e) => {console.log(e.target.value);dispatch(partySeats({
                  state: state,
                  party: key,
                  seats: e.target.value !== '' ? parseInt(e.target.value) : 0,
                }))}}
                />
            </td>
            <td>
              {!removeDisabled && <Icon
                icon={faTimes}
                color="red"
                onClick={() => {
                  dispatch(removeParty({
                    state: state,
                    party: key,
                  }));
                  if (addParties.length < 1) {
                    setSelectedParty([
                      ...addParties,
                      ...[[key, parties[key].colour]]
                    ][0]?.[0] ?? '');
                  }
                }}
              />}
            </td>
            <PercentData>
              ({(value.seats/totalSeats*100).toFixed(2)}%)
            </PercentData>
          </tr>
        })}
        {addParties.length > 0 && !addDisabled && <tr>
          <td>
            <select
              value={selectedParty}
              onChange={(e) => setSelectedParty(e.target.value)}
            >
              {addParties.map(([key, value], index) => <option key={index} value={key}>
                {key}
              </option>)}
            </select>
          </td>
          <td></td>
          <td>
            <Icon
              icon={faCheck}
              color="green"
              onClick={(e) => {
                if (selectedParty !== '') {
                  dispatch(addParty({
                    state: state,
                    party: selectedParty,
                    seats: 0,
                  }));
                  setSelectedParty(addParties.filter(([key, value]) => key !== selectedParty)[0]?.[0] ?? '');
                }
              }}
            />
          </td>
        </tr>}
      </tbody>
    </table>
  )
}

export default PartyChanger;