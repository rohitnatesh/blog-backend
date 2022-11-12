let getAge = function (birthdate) {
  let today = new Date();
  let birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  return age;
};

let getCurrentDatetime = function () {
  let currentdate = new Date();
  let datetime =
    addZero(currentdate.getFullYear()) +
    "-" +
    addZero(currentdate.getMonth() + 1) +
    "-" +
    addZero(currentdate.getDate()) +
    " " +
    addZero(currentdate.getHours()) +
    ":" +
    addZero(currentdate.getMinutes()) +
    ":" +
    addZero(currentdate.getSeconds());
  return datetime;
};

let addZero = function (str) {
  return str < 10 ? "0" + str : str;
};

module.exports = {
  getAge: getAge,
  getCurrentDatetime: getCurrentDatetime,
};
