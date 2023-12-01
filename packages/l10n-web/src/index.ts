import axios from 'axios';

function createInstance() {
  const instance = {
    init: (params, cb) => {
      axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log('params', params);

      cb && cb(params);
    }
  };

  return instance;
}

const l10nClient = createInstance();

export {
  l10nClient,
  createInstance,
};
