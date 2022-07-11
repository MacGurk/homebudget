import React from 'react';

interface TransactionsFilterProps {
  month: number;
  year: number;
  years: number[];
  changeMonth: (month: number) => void;
  changeYear: (year: number) => void;
}

const TransactionsFilter: React.FC<TransactionsFilterProps> = ({ month, year, years, changeMonth, changeYear }) => {
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeMonth(parseInt(event.target.value, 10));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeYear(parseInt(event.target.value, 10));
  };

  return (
    <div className="d-flex flex-grow-1 gap-3  flex-justify-center">
      <div>
        <select className="form-select" value={month} onChange={handleMonthChange}>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
      </div>
      <div>
        <select className="form-select" value={year} onChange={handleYearChange}>
          {years.map((availableYear: number) => (
            <option key={availableYear}>{availableYear}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TransactionsFilter;
