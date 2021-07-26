import React, { FC } from 'react';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import Parliament from 'src/modules/parliament';
import PopulationChanger from 'src/modules/populationChanger';
import PartyAdder from 'src/modules/partyAdder';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;
const ParliamentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 10px 0;

  > * {
    flex: 0 0 20%;
    min-width: 330px;
    margin: 5px 0;
  }
`;

interface Parties {
  [key: string]: number,
}
interface PartiesResult {
  [key: string]: {
    colour: string,
    seats: number,
  }
}
const Break = styled.div`
  height: 0;
  flex: 0 0 100%;
`;
const TopContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 5px;
`;

const UtilitiesContainer = styled.div`
  position: relative;
`;
const UtilitiesWrapper = styled.div`
  right: 0;
  display: flex;

  @media screen and (min-width: 960px) {
    position: absolute;
  }
  @media screen and (max-width: 960px) {
    flex-wrap: wrap;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;


const Home: FC<{}> = (): ReactElement => {
  const data = useSelector((state: RootState) => state.parliaments);

  const getParties = (parties: Parties): PartiesResult | boolean => {
    if (parties === undefined) return false;
    return Object.fromEntries(
      Object.entries(parties).map(([key, value]) => {
        return [key, {
          seats: value,
          colour: data.parties[key],
        }];
      })
    );
  }

  const getSeats = (seatsByState: {[key: string]: {[key: string]: number}}) => {
    const participatingParties = Object.values(seatsByState)
      .map(partySeats => Object.keys(partySeats))
      .reduce((a, b) => [...new Set([...a, ...b])]);

    const seatsModified = Object.fromEntries(
      Object.keys(data.parties)
        .filter(key => participatingParties.includes(key))
        .map(key => ([key, 0]))
    );

    Object.values(seatsByState).forEach((value) => {
      Object.entries(value).forEach(([keyParty, valueParty]) => {
        seatsModified[keyParty] += valueParty;
      });
    });

    return seatsModified;
  }

  return (
    <>
      <LogoContainer>
        <img
          width="500px"
          src='/logo.svg'
          alt="Logo showing text FA-Calculator"
        />
      </LogoContainer>
      <TopContainer>
        <Title>
          Federal Assembly Distribution
        </Title>
        <UtilitiesContainer>
          <UtilitiesWrapper>
            <PartyAdder />
            <PopulationChanger />
          </UtilitiesWrapper>
        </UtilitiesContainer>
      </TopContainer>

      <ParliamentContainer>
        <Parliament
          title="FA"
          parties={getParties(getSeats(data.seats))}
          faParties={false}
        />
        <Break />
        {Object.entries(data.parliaments).map(([key, value], index) => {
          return <React.Fragment key={index}>
            <Parliament
              title={key}
              parties={getParties(value)}
              faParties={getParties(data.seats[key])}
            />
            {key === 'DE' && <Break />}
          </React.Fragment>
        })}
      </ParliamentContainer>
    </>
  );
}

export default Home;
