

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

  return x;

}

export const utilsMonthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril',
  'Mayo', 'Junio', 'Julio', 'Agosto',
  'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const UtilsDaysShort = [ 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do' ];
