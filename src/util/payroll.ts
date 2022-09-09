export type ProfessionType = 'Developer' | 'Teacher' | 'Cashier';
export type CityType = 'Stockholm' | 'Gothenburg';

export type PayrollType = {
  yearsOfExperience: number;
  yearOfIncome: number;
  profession: ProfessionType;
  city: CityType;
}

const TAX_BREAK_POINT = 36000;

const BREAK_POINT_HIGH_TAXES = [
  [45000, .7],
  [36000, .5]
];

const Profession: Record<ProfessionType, number> = {
  Developer: 30000,
  Teacher: 27000,
  Cashier: 25000,
}

const Cities: Record<CityType, {[key: number]: number }> = 
  {
    Stockholm: {
      2020: .29,
      2019: .3,
    },
    Gothenburg: {
      2020: .22,
      2019: .25,
    },
  }

const additionalIncomeBasedOnExperience = (yearsOfExperience: number) => {
  if(yearsOfExperience >= 4 && yearsOfExperience <= 7) return .2;
  if(yearsOfExperience >= 8 && yearsOfExperience <= 10) return .4;
  if(yearsOfExperience >= 11) return .6;
  return 0;
}

export const calculateIncome = (income: number, yearsOfExperience: number) => {
  return income + (income * additionalIncomeBasedOnExperience(yearsOfExperience))
}

export const getBaseIncomeByProfession = (profession: ProfessionType) => {
  return Profession[profession]
}

export const getBaseTaxByCity = (cityType: CityType, incomeYear: number) => {
  return Cities[cityType][incomeYear]
}

export const calculateHighIncomeTax = (incomeByExperience: number) => {
  return BREAK_POINT_HIGH_TAXES.reduce((acc, current) => {
    const [breakPoint, tax] = current;
    const {remainingIncome } = acc;

    if (remainingIncome > breakPoint && breakPoint >= TAX_BREAK_POINT) {
      const incomeToTax = remainingIncome - breakPoint;
      acc = {
        ...acc,
        remainingIncome: remainingIncome - incomeToTax,
        highIncomeTaxToPay: acc.highIncomeTaxToPay + (incomeToTax * tax)
      }
    }
    return acc;
    
  }, { remainingIncome: incomeByExperience, highIncomeTaxToPay: 0 })
}

