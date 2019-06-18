/* This is a version of the csrf token cookie retreival
as shown in the official django docs here:
https://docs.djangoproject.com/en/1.10/ref/csrf/#ajax

We use the js-cookie library in this code however.
*/

export const getCsrfToken = name => {
  let cookieValue = null;
  // Only search if the cookie exists
  if (document.cookie && document.cookie !== "") {
    // Get a dictionary of the cookies
    cdict = document.cookie.split(";").reduce((obj, x) => {
      let y = x.split("=");
      if (y.length == 2) {
        obj[y[0].trim()] = y[1].trim();
      }
      return obj;
    }, {});
    // decode the cookie if it is in the dictionary
    cookieValue = name in cdict ? decodeURIComponent(cdict[name]) : null;
  }
  return cookieValue;
};
