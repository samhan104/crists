let number = 1

const createNew = () => {
    number += 1;
}



$(() => {
    $('#new').on('click', createNew )
   })