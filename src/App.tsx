import { useState } from 'react';
import styled from 'styled-components';
import DropDownList from './components/DropDownList';
import FormButton from './components/FormButton';
import InputField from './components/InputField';
import { ProfessionType, CityType, calculateHighIncomeTax, calculateIncome, getBaseIncomeByProfession, getBaseTaxByCity } from './util/payroll';

const Cities: CityType[] = [
  'Stockholm',
  'Gothenburg'
];

const Profession: ProfessionType[] = [
  'Developer',
  'Teacher',
  'Cashier'
];

const IncomeYear = [
  '2020',
  '2019'
];

type InitialValueType = {
  experience: string;
  city: string;
  profession: string;
  yearOfIncome: string;
}

const InitialValue: InitialValueType = {
  city: '',
  experience: '',
  profession: '',
  yearOfIncome: '',
}

const errorHandler = (formData: InitialValueType) => {
  for (const value of Object.values(formData)) {
    if(value.length === 0) {
      return false;
    }
  }
  return true;
}

function App() {
  const [formData, setFormData] = useState(InitialValue);
  const [activateButton, setActivateButton] = useState(false);
  const [incomeByExperience, setIncomeByExperience] = useState<number | null>(null);
  const [highIncomeTaxToPay, setHighIncomeTaxToPay] = useState<number | null>(null);
  const [baseIncomeTaxToPay, setBaseIncomeTaxToPay] = useState<number | null>(null);
  const [incomeAfterTax, setIncomeAfterTax] = useState<number | null>(null);

  const onChange = (value: {[key: string]: string}) => {
    const currentFormState = {
      ...formData,
      ...value,
    }
    setFormData(currentFormState);
    setActivateButton(errorHandler(currentFormState));
  }

  const onCLick = () => {
    const baseIncome = getBaseIncomeByProfession(formData['profession'] as ProfessionType);
    const incomeByExperience = calculateIncome(baseIncome, Number(formData['experience']));
    const cityTaxByYear = getBaseTaxByCity(formData['city'] as CityType, Number(formData['yearOfIncome']));

    const {remainingIncome, highIncomeTaxToPay} = calculateHighIncomeTax(incomeByExperience);
    const baseIncomeTaxToPay = remainingIncome * cityTaxByYear;
    setIncomeByExperience(incomeByExperience);
    setHighIncomeTaxToPay(highIncomeTaxToPay);
    setBaseIncomeTaxToPay(baseIncomeTaxToPay);
    setIncomeAfterTax(incomeByExperience - (baseIncomeTaxToPay + highIncomeTaxToPay));
    console.log(incomeByExperience, highIncomeTaxToPay, baseIncomeTaxToPay)
  }
  return (
    <Main>
      <InputField margin placeholder='Erfarenhet' id='experience' onChange={onChange} value={formData['experience']} type='number' />
      <DropDownList margin defaultValue='Välj ort' id='city' onClick={onChange} value={formData['city']} list={Cities} />
      <DropDownList margin defaultValue='Välj yrke' id='profession' onClick={onChange} value={formData['profession']} list={Profession} />
      <DropDownList margin defaultValue='Inkomstår' id='yearOfIncome' onClick={onChange} value={formData['yearOfIncome']} list={IncomeYear} />
      <FormButton onClick={onCLick} text='Beräkna lön' active={activateButton}/>
      { incomeByExperience && <OutPutContainer>
        <Text><Span>Income:</Span>{incomeByExperience}kr</Text>
        <Text><Span>Income tax:</Span>{baseIncomeTaxToPay}kr</Text>
        <Text><Span>High income tax:</Span>{highIncomeTaxToPay}kr</Text>
        <Text><Span>Income after tax:</Span>{incomeAfterTax}kr</Text>
      </OutPutContainer>}
    </Main>
  );
}

export default App;

const Main = styled.main`
  max-width: 520px;
  margin: 100px auto 0;
  display: flex;
  flex-direction: column;
  @media (max-width: 786px) {
    margin: 100px 12px;
  }
`;

const OutPutContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 28px;
`;

const Text = styled.span`
  font-weight: 600;
  padding: 12px 0;
`;

const Span = styled.span`
  font-weight: 400;
  padding-right: 4px;
`;