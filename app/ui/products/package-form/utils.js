
export const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
  if (originalPrice <= 0) {
    throw new Error("Original price must be greater than zero");
  }
  if (discountedPrice < 0) {
    throw new Error("Discounted price cannot be negative");
  }
  if (discountedPrice > originalPrice) {
    throw new Error("Discounted price cannot be greater than original price");
  }

  const discount = originalPrice - discountedPrice;
  const discountPercentage = (discount / originalPrice) * 100;
  return Math.round(discountPercentage);
};

export const groupDatesByMonth = (dateStrings) => {
  const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  let groupedDates = {};
  dateStrings.forEach(dateStr => {
    var date = new Date(dateStr);
    dateStr = date.toLocaleDateString("en-US");
    let [month, day, year] = [1, 2, 2090]
    if (dateStr.includes('/')) {
      [month, day, year] = dateStr.split("/").map(Number);
    } else if (dateStr.includes('-')) {
      [month, day, year] = dateStr.split("-").map(Number);
    }
    const monthName = monthNames[month - 1];
    if (!groupedDates[monthName]) {
      groupedDates = { ...groupedDates, [monthName]: [day] }
    } else {
      groupedDates = { ...groupedDates, [monthName]: [...groupedDates[monthName], day] }
    };
  });
  const result = Object.keys(groupedDates).map(month => ({
    month: month,
    dates: groupedDates[month].sort((a, b) => a - b)
  }));
  return result.sort((a, b) => monthNames.indexOf(a.month) - monthNames.indexOf(b.month));
}

export const addDaysToADate = (dateString, daysToAdd) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return;
  }
  date.setDate(date.getDate() + daysToAdd);
  return ;
};



export const addDaysToDate = (day, month, year, no_of_days) => {
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const monthIndex = monthNames.indexOf(month.toUpperCase());
  if (monthIndex === -1) {
    throw new Error('Invalid month name');
  }
  const date = new Date(year, monthIndex, day);
  date.setDate(date.getDate() + no_of_days + 1);
  const newDay = date.getDate();
  const newMonth = monthNames[date.getMonth()];
  const newYear = date.getFullYear();
  return `${String(newDay).padStart(2, '0')} ${newMonth} ${newYear}`;
}

export const formatDateToYYYYMMDD = (date) => {
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let dateYMD = `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;
  return dateYMD;
}

export const formatDateStringToDDMMYYYY = (dateString) => {
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const date = new Date(dateString);
  let year = date.getFullYear();
  let month = monthNames[date.getMonth()];
  let day = date.getDate();
  let dateYMD = `${day}-${month}-${year}`
  return dateYMD;
}