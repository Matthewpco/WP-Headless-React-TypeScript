export const checkEmailValid = (email: string):boolean => (
  !!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
);

export const checkPhoneValid = (phone: string):boolean => {
    if (phone.length < 6 || phone.length > 15) {
        return false;
    }

    return !!String(phone)
      .toLowerCase()
      .match(/^\d+$/);
};
