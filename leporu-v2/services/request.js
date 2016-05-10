import axios from 'axios';

export default {
  get() {
    return axios.get(`http://localhost/test-ajax.php`);
  },
  
  getSalon() {
    return axios.get(`http://localhost/test-ajax-salon.php`);
  }
}
