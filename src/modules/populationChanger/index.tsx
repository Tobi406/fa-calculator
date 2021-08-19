import { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import Text from "src/common/Text";
import { RootState } from "src/store";
import styled from "styled-components";
import { changePopulation } from "../parliament/parliamentSlice";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 25px;
  padding: 5px;
`;

const Input = styled.input`
  text-align: right;
  width: 80px;
`;

const PopulationChanger: FC<{}> = (): ReactElement => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Text type="h2" color="$primary">
        Population
      </Text>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th></th>
            <th>
              Seats
            </th>
          </tr>
          {Object.entries(useSelector((state: RootState) => state.parliaments.population))
            .map(([key, value], index) => {
              return <tr key={index}>
                <td>
                  {key}
                </td>
                <td>
                  <Input
                    value={value}
                    type="number"
                    onChange={(e) => {dispatch(changePopulation({
                      state: key,
                      population: e.target.value !== '' ? parseInt(e.target.value) : 0,
                    }))}}
                  />
                </td>
                <td>
                  {useSelector((state: RootState) => state.parliaments.seatsCount[key])}
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </Wrapper>
  );
}

export default PopulationChanger;
