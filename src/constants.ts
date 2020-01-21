export interface family {
  id: number;
  color: string;
}

type familyNames = "jane" | "lucile" | "isabel";

export const jane: family = Object.freeze({
  id: 1,
  color: "#CE6C6F"
});

export const lucile: family = Object.freeze({
  id: 2,
  color: "#8D98E1"
});

export const isabel: family = Object.freeze({
  id: 3,
  color: "#3CCC92"
});

export const families: { [key in familyNames]: family } = Object.freeze({
  jane,
  lucile,
  isabel
});

export interface datePeriod {
  start: {
    month: number;
    date: number;
  };
  end: {
    month: number;
    date: number;
  };
}

export const firstPeriod: datePeriod = Object.freeze({
  start: {
    month: 5,
    date: 18
  },
  end: {
    month: 6,
    date: 19
  }
});

export const secondPeriod: datePeriod = Object.freeze({
  start: {
    month: 6,
    date: 19
  },
  end: {
    month: 7,
    date: 13
  }
});

export const thirdPeriod: datePeriod = Object.freeze({
  start: {
    month: 7,
    date: 13
  },
  end: {
    month: 8,
    date: 9
  }
});
