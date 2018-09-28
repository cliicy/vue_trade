import { symbolsAPI } from '@/api/exchangeID'
/*
*   货币下拉框 选中id this.symbolSelect
*/
export default {
  data() {
    return {
      symbolOptions: [],
      symbolSelect: ''
    }
  },
  methods: {
    initSymbols() {
      return new Promise((resolve, reject) => {
        symbolsAPI()
        .then( res => {
          this.symbolOptions = res.data;
          this.symbolSelect = res.data[0].symbol_id;
          resolve();
        })
        .catch(error => {
          reject(error)
        })
      })
    }
  }
}
