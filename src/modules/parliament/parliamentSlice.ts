import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import dataRaw from 'public/data.json';

const dhondt = require('dhondt');
const sainteLague = require('sainte-lague');

interface Data {
  parties: {
    [key: string]: string,
  },
  population: {
    [key: string]: number,
  },
  parliaments: {
    [key: string]: {
      [key: string]: number,
    },
  },
}

const data: Data = dataRaw;

interface PartySeats {
  [key: string]: number,
}

interface ParliamentState {
  parties: {
    [key: string]: string,
  },
  parliaments: {
    [key: string]: PartySeats
  },
  population: {
    [key: string]: number,
  },
  seatsCount: {
    [key: string]: number,
  },
  seats: {
    [key: string]: PartySeats,
  }
}
const getTotal = (object: object) => {
  return Object.values(object).reduce((a, b) => a + b, 0);
};
const assignSeats = (data: {[key: string]: number}, totalSeats: number) => {
  const modifiedData = Object.entries(data).flatMap(([key, value]) => {
    return {
      party: key,
      votes: value,
    };
  });
  const results = dhondt.compute(modifiedData, totalSeats, {
    resultProperty: 'seats',
    voteAccessor: (obj: {party: string, votes: number}) => obj.votes
  });
  const modifiedResults = Object.fromEntries(results
    .map((result: {party: string, votes: number, seats: number}) => {
      return [result.party, result.seats];
    })
    .filter((item: Array<string | number>) => {
      return item[1] > 0;
    })
  );
  console.log(modifiedResults);
  return modifiedResults;
};
const assignSeatsSainteLague = (data: {[key: string]: number}, totalSeats: number) => {
  const results: {[key: string]: number} = sainteLague(data, totalSeats, {
    draw: true,
  });
  const modifiedResults = Object.fromEntries(
    Object.entries(results)
      .filter(([party, seats]) => {
        return seats > 0;
      })
  );
  console.log(modifiedResults);
  return modifiedResults;
}
const getSeatsCount = (popData: {[key: string]: number}, totalSeats: number) => {
  return {
    ...assignSeatsSainteLague(popData, totalSeats),
    "DE": totalSeats,
  };
}
const getSeatsCountStates = (population: {[key: string]: number}, totalSeats: number) => getSeatsCount(
  Object.fromEntries(
    Object.entries(population)
      .filter(([key, value]) => key !== 'DE')
  ),
  totalSeats
);
const getSeats = (seatsCount: {[key: string]: number}) => {
  return Object.fromEntries(Object.entries(seatsCount).map(([key, value]) => {
    return [key, assignSeats(data.parliaments[key], seatsCount[key])];
  }));
}


const getInititalSeatsCount = getSeatsCountStates(data.population, getTotal(data.parliaments['DE']));

const initialState: ParliamentState = {
  parties: data.parties,
  parliaments: data.parliaments,
  population: data.population,
  seatsCount: getInititalSeatsCount,
  seats: getSeats(getInititalSeatsCount),
}

export const parliamentSlice = createSlice({
  name: 'parliament',
  initialState,
  reducers: {
    addPartyGlobal: (state, action: PayloadAction<{name: string, colour: string}>) => {
      state.parties[action.payload.name] = action.payload.colour;
    },
    partySeats: (state, action: PayloadAction<{state: string, party: string, seats: number}>) => {
      state.parliaments[action.payload.state][action.payload.party] = action.payload.seats;
      if (action.payload.state === 'DE') {
        state.seatsCount = {
          ...getSeatsCountStates(state.population, getTotal(state.parliaments['DE'])),
          DE: getTotal(state.parliaments['DE']),
        };
        state.seats = getSeats(state.seatsCount);
      }
      state.seats[action.payload.state] = assignSeats(state.parliaments[action.payload.state], state.seatsCount[action.payload.state]);
    },
    changePopulation: (state, action: PayloadAction<{state: string, population: number}>) => {
      state.population[action.payload.state] = action.payload.population;
      state.seatsCount = getSeatsCountStates(state.population, getTotal(state.parliaments['DE']));
      state.seats = getSeats(state.seatsCount);
    },
    addParty: (state, action: PayloadAction<{state: string, party: string, seats: number}>) => {
      state.parliaments[action.payload.state][action.payload.party] = action.payload.seats;
      if (action.payload.state === 'DE') {
        state.seatsCount = {
          ...getSeatsCountStates(state.population, getTotal(state.parliaments['DE'])),
          DE: getTotal(state.parliaments['DE']),
        };
        state.seats = getSeats(state.seatsCount);
      }
      state.seats[action.payload.state] = assignSeats(state.parliaments[action.payload.state], state.seatsCount[action.payload.state]);
    },
    removeParty: (state, action: PayloadAction<{state: string, party: string}>) => {
      delete state.parliaments[action.payload.state][action.payload.party];
      if (action.payload.state === 'DE') {
        state.seatsCount = {
          ...getSeatsCountStates(state.population, getTotal(state.parliaments['DE'])),
          DE: getTotal(state.parliaments['DE']),
        };
        state.seats = getSeats(state.seatsCount);
      }
      state.seats[action.payload.state] = assignSeats(state.parliaments[action.payload.state], state.seatsCount[action.payload.state]);
    },
    removePartyGlobal: (state, action: PayloadAction<{party: string}>) => {
      delete state.parties[action.payload.party];
      const parliamentKeys = Object.keys(state.parliaments);
      parliamentKeys.forEach(parliament => {
        if (action.payload.party in state.parliaments[parliament]) {
          delete state.parliaments[parliament][action.payload.party];
          if (parliament === 'DE') {
            state.seatsCount = {
              ...getSeatsCountStates(state.population, getTotal(state.parliaments['DE'])),
              DE: getTotal(state.parliaments['DE']),
            };
          }
        }
      });

      parliamentKeys.forEach(parliament => {
        state.seats[parliament] = assignSeats(state.parliaments[parliament], state.seatsCount[parliament]);
      });
    },
    moveParty: (state, action: PayloadAction<{state: string, oldIndex: number, newIndex: number}>) => {
      const parties = Object.entries(state.parliaments[action.payload.state]);
      const party = parties[action.payload.oldIndex];
      parties.splice(action.payload.oldIndex, 1);
      parties.splice(action.payload.newIndex, 0, party);
      state.parliaments[action.payload.state] = Object.fromEntries(parties);
      if (action.payload.state === 'DE') {
        state.seats = getSeats(state.seatsCount);
      }
      state.seats[action.payload.state] = assignSeats(state.parliaments[action.payload.state], state.seatsCount[action.payload.state]);
    },
    movePartyGlobal: (state, action: PayloadAction<{oldIndex: number, newIndex: number}>) => {
      const parties = Object.entries(state.parties);
      const party = parties[action.payload.oldIndex];
      parties.splice(action.payload.oldIndex, 1);
      parties.splice(action.payload.newIndex, 0, party);
      state.parties = Object.fromEntries(parties);
    },
  },
})

export const { addParty, removeParty, moveParty, movePartyGlobal, removePartyGlobal, addPartyGlobal, partySeats, changePopulation } = parliamentSlice.actions

export default parliamentSlice.reducer
