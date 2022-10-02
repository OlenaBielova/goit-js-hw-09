import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
// const delayInput = document.querySelector('[name = delay]');
// const stepInput = document.querySelector('[name = step]');
// const amountInput = document.querySelector('[name = amount]');
form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  
  let delay = Number(e.currentTarget.elements.delay.value);
  const step = Number(e.currentTarget.elements.step.value);
  const amount = Number(e.currentTarget.elements.amount.value);

  let position = 1;
  while (position <= amount) {
    createPromise(position, delay)
    .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
    .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  })
    position += 1;
    delay = delay + step;
}
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });// Fulfill
      } else {
        reject({ position, delay });// Reject
      }
    }, delay);
  });
}
