import { exchangeFirstAPI } from '@/api/exchangeID';
/*
*   交易所选择下拉框 选中id this.exchangeSelect
*/
export default {
  data() {
    return {
      exchangeOptions: [],
      exchangeSelect: ''
    }
  },
  methods: {
    initExchanges() {
      return new Promise((resolve, reject) => {
        exchangeFirstAPI()
        .then( res => {
          this.exchangeOptions = res.data;
          this.exchangeSelect = res.data[0].exchange_id;
          resolve();
        })
        .catch(error => {
          reject(error)
        })
      })
    }
  }
}
