import { FC, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import ColorDisplay from "src/common/ColorDisplay";
import Text from "src/common/Text";
import styled from "styled-components";
import { addPartyGlobal } from "../parliament/parliamentSlice";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 25px;
  padding: 10px;
  margin: 0 10px 10px 0;
  height: fill-available;
`;

const Input = styled.input`
  width: 60px;
`;

const ColorData = styled.div`
  display: flex;
  align-items: center;
`;

const PartyAdder: FC<{}> = (): ReactElement => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const dispatch = useDispatch();
  
  return (
    <Wrapper>
      <Text type="h2" color="$primary">
        Add Party
      </Text>
      <table>
        <tbody>
          <tr>
            <td>
              Name
            </td>
            <td>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              Color
            </td>
            <td>
              <ColorData>
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />&nbsp;
                <ColorDisplay color={color} />
              </ColorData>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={() => {
          if (color !== '' && name !== '') {
            dispatch(addPartyGlobal({
              name: name,
              colour: color,
            }));
          }
        }}
      >
        Add party
      </button>
    </Wrapper>
  );
}

export default PartyAdder;