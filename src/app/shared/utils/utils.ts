

export const getDateFormatt = (date: string) => {
  let dateFormatt: string[];

  if(date.includes('/'))
    dateFormatt = date.split('/');
  else
    dateFormatt = date.split('-');


  if(dateFormatt[1].length < 2)
    dateFormatt[1] = `0${dateFormatt[1]}`;

    if(dateFormatt[2].length < 2)
    dateFormatt[2] = `0${dateFormatt[2]}`;

  let x = dateFormatt.join('/');
  console.log(x);

  return x;

}
  // if(dateFormatt[1].charAt(0) === '0')
  //   dateFormatt[1] = dateFormatt[1].slice(1);

  // if(dateFormatt[2].charAt(0) === '0')
  //   dateFormatt[2] = dateFormatt[2].slice(1);
