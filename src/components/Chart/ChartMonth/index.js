import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import {API} from '../../../context/constanst';
import moment from 'moment';
import 'moment/locale/vi';
import CustomSpinner from '../../CustomSpinner';
import classNames from 'classnames/bind';

import styles from './ChartMonth.module.scss';

const cx = classNames.bind(styles);

// const options = {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   };
function sumByMonth(data) {
  let result = new Array(12).fill(0);
  data.forEach(item => {
    let month = new Date(item.createdAt).getMonth();
    result[month] += item.totalAmount;
  });
  return result;
}
const ChartMonth = () => {
  const [loading, setLoading] = useState(false)
  const [dataAPI, setDataAPI] = useState([])
  const [year, setYear] = useState('2024')
  console.log(year)
  
  
  useEffect(() => {
    const getOrders = async () => {
        setLoading(true)
        const res = await axios.get(`${API}/api/order/orderbyGross/grossing?year=${year}`)
        if (res.data.success) {
          setDataAPI(sumByMonth(res.data.orders))
          setLoading(false)
        }
    }
    getOrders()
  }, [year])
  
        
     
  //     }
  //   return dataArray.reduce((a, b) => a + b,0)
  // })
  // console.log(date)
  
  // const dataGrossing = (data) => {
  //   let dataArr = [];
  //   for(let i= 0; i< 12; i++) {
      
  //     for(let j = 0; j< data.length; j++) {
  //       let monthArr = []
  //       if (moment(data[j].createdAt).month() === i) {
  //         monthArr.push(data[j].totalAmount)
  //         // console.log(i, data[j].totalAmount)
  //         console.log(monthArr)
  //       }
        
        
  //     }
      
  //   }
  //   return dataArr
  // } 
  // // dataGrossing(dataAPI)
  // console.log(dataGrossing(dataAPI))
 
  const data = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6','Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [
      {
        label: 'Doanh thu (đơn vị VNĐ)',
        data: dataAPI,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  return (
  <>
    <div className='header'>
      <h1 className={cx('title')}>Biểu đồ doanh thu theo từng tháng</h1>
      <div className={cx('select-year')}>
        <select className={cx('input-select')} name="years" id="years" value={year} onChange={(e) => setYear(e.target.value)}>
         
          <option value="2024">2023</option>
          <option value="2023">2022</option>
          <option value="2022">2021</option>
          <option value="2021">2020</option>
          <option value="2020">2019</option>
        </select>
      </div>
    </div>
    {
      loading ? <CustomSpinner /> :  <Bar data={data} />
    }
   
  </>
  )
};

export default ChartMonth;