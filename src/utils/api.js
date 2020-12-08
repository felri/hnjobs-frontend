const getPieChart = async ({ year, month }) => {
  const rawResponse = await fetch(
    `${process.env.REACT_APP_DEFAULT_URL}getFullJobsPercentage`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ year, month: month.toString() }),
    }
  );
  const content = await rawResponse.json();
  return content;
};

const getJobsFromMonthLanguage = async ({ year, month }) => {
  const rawResponse = await fetch(
    `${process.env.REACT_APP_DEFAULT_URL}getJobsFromMonthLanguage`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ year, month: month.toString() }),
    }
  );
  const content = await rawResponse.json();
  return content;
};

const getLineChart = async ({ year, month, languages }) => {
  const rawResponse = await fetch(
    `${process.env.REACT_APP_DEFAULT_URL}getHistoryLanguage`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        year,
        month: month.toString(),
        languages,
      }),
    }
  );
  const content = await rawResponse.json();

  return content;
};

export default {
  getPieChart,
  getLineChart,
  getJobsFromMonthLanguage,
};
