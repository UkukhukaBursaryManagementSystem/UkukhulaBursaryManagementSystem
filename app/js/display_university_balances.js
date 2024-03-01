async function displayUniversityRemainingBalances(fetchFunction, url) {
  const remainingBalance = await fetchFunction(url).then((data) =>
    console.log(data)
  );
  const universityBalanceElement = document.getElementById(
    "remaining_university_balance"
  );

  return remainingBalance;
}
