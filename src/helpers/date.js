export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Function to add suffix to day (e.g., 1st, 2nd, 3rd, 4th, etc.)
    const addSuffix = (day) => {
      if (day >= 11 && day <= 13) {
        return `${day}th`;
      }
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };

    const formattedDate = `${addSuffix(day)} ${monthName} ${year}`;
    return formattedDate;
  };