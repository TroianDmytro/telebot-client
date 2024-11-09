import { FC, useEffect, useState } from 'react';
import Table from 'react-bootstrap/esm/Table';
import { format } from 'date-fns';
import "../../../App.css";
import axios from 'axios';
import "./TablePage.css";

// Интерфейс для объекта Blum
interface Blum {
   id: string;
   points: number;
   tickets: number;
   userId: number;
}

// Интерфейс для объекта Clayton
interface Clayton {
   id: string;
   points: number;
   tickets: number;
   userId: number;
}

// Интерфейс для объекта Hexacore
interface Hexacore {
   id: string;
   cups: number;
   userId: number;
}

// Интерфейс для объекта Major
interface Major {
   id: string;
   points: number;
   userId: number;
}

// Интерфейс для объекта TapSwap
interface TapSwap {
   id: string;
   buildings_20th_lvl: number;
   coins: number;
   crystals: number;
   cups: number;
   userId: number;
}

// Интерфейс для объекта TonStation
interface TonStation {
   id: string;
   points: number;
   toh: number;
   userId: number;
}

// Основной интерфейс, который включает все вложенные объекты
interface DataObject {
   blum: Blum;
   blumId: string;
   clayton: Clayton;
   claytonId: string;
   createDate: Date; // Для даты создания
   hexacore: Hexacore;
   hexacoreId: string;
   major: Major;
   majorId: string;
   tapSwap: TapSwap;
   tapSwapId: string;
   tonStation: TonStation;
   tonStationId: string;
   userId: number; // Общий userId
}

const TablePage: FC = () => {
   const [listPolling, setListPolling] = useState<DataObject[]|null>(null);

   //get запрос. Получение даних для таблици
   useEffect(()=>{
      const getInfoIntoTable = async ()=>{
         try{
            const result = await axios.get("https://ironfalcon.somee.com/api/get_all_survey_data")
            console.log(result.data);
            setListPolling(result.data);
         }
         catch(err){
            console.log("Error: ",err);
         }
         
      } 
      getInfoIntoTable();
   },[])
   //обновляет listPolling 
   useEffect(()=>{
   },[listPolling]);

   //устанавливает дату ивремя в нужний формат
   function dateString(date: Date) {
      const currentDate: Date = date;
      const formattedDate: string = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
      return formattedDate;
   }

   return (
      <div className="table-survey-users table-responsive">
         <Table striped bordered hover variant='secondary'>
            <thead className='table-header'>
               <tr>
                  <th rowSpan={2}>№</th>
                  <th rowSpan={2} style={{ minWidth: "150px" }}>Id</th>
                  <th rowSpan={2} style={{ minWidth: "150px" }}>Время</th>
                  <th colSpan={4} >
                     TapSwap
                  </th>
                  <th>
                     Hexacore
                  </th>
                  <th>
                     Major
                  </th>
                  <th colSpan={2} >
                     Blum
                  </th>
                  <th colSpan={2} >
                     Clayton
                  </th>
                  <th colSpan={2} >
                     TonStation
                  </th>
               </tr>
               <tr>
                  <th>Монеты</th>
                  <th>Кубки</th>
                  <th>Кристалы</th>
                  <th>кол&nbsp;-&nbsp;во&nbsp;зданий 20-го&nbsp;уровня</th>
                  <th>Кубки</th>
                  <th>Поинты</th>
                  <th>Билеты</th>
                  <th>Поинты</th>
                  <th>Билеты</th>
                  <th>Поинты</th>
                  <th>Поинты</th>
                  <th>TOH</th>
               </tr>
            </thead>
            <tbody style={{textAlign:"center"}}>
 {listPolling?.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime()).map((item, index) => {
                  return (
                     <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.userId}</td>
                        <td>{dateString(item.createDate)}</td>
                        <td>{item.tapSwap.coins}</td>
                        <td>{item.tapSwap.cups}</td>
                        <td>{item.tapSwap.crystals}</td>
                        <td>{item.tapSwap.buildings_20th_lvl}</td>
                        <td>{item.hexacore.cups}</td>
                        <td>{item.major.points}</td>
                        <td>{item.blum.tickets}</td>
                        <td>{item.blum.points}</td>
                        <td>{item.clayton.tickets}</td>
                        <td>{item.clayton.points}</td>
                        <td>{item.tonStation.points}</td>
                        <td>{item.tonStation.toh}</td>
                     </tr>)
               })}
            </tbody>
         </Table>
      </div>
   );

}

export default TablePage;
