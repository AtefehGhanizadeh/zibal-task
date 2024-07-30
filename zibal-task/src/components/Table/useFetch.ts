import React, { useEffect, useState } from 'react'
import { DataType } from '../../interfaces';

const useFetch = () => {
    const [data, setData] = useState<DataType[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("http://localhost:8000/data");
    
          if (!response.ok) {
            throw new Error("Something went wrong!");
          }
    
          const responseData: DataType[] = await response.json();
          responseData.forEach((item) => {
            if (item.status === 1) {
              item.status = "پرداخت موفق";
            } else {
              item.status = " پرداخت ناموفق";
            }
            item.amount = item.amount.toLocaleString();
          });
          setData(responseData);
        };
    
        fetchData().catch((error) => {
          throw new Error(error.message);
        });
      }, []);

  return data
}

export default useFetch