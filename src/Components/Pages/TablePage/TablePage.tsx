import { FC, useEffect, useState } from 'react';
import Table from 'react-bootstrap/esm/Table';
import { format } from 'date-fns';
import "../../../App.css";
import axios from 'axios';

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

   useEffect(()=>{
      const getInfoIntoTable = async ()=>{
         try{
            // const result = await axios.get("http://localhost:5107/api/get_all_survey_data")
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

   useEffect(()=>{
      console.log("listPolling reload.",listPolling);
   },[listPolling]);

   function dateString(date: Date) {
      const currentDate: Date = date;
      const formattedDate: string = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
      return formattedDate;
   }

   return (
      <div className="Table table-responsive">
         <Table striped bordered hover variant='secondary'>
            <thead style={{ textAlign: 'center' }}>
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
   // return (
   //    <div className='App'>
   //       <Table striped bordered hover>
   //          <thead>
   //             <tr>
   //                <th>#</th>
   //                <th>User Id</th>
   //                <th>Telegram Name</th>
   //                <th>First Name</th>
   //                <th>Last Name</th>
   //                <th>Date and time</th>
   //             </tr>
   //          </thead>
   //          <tbody>
   //             {/* {listUsers?.map((item, index) => {
   //                return (
   //                   <tr key={index}>
   //                      <td>{index + 1}</td>
   //                      <td>{item.userId}</td>
   //                      <td>{item.telegramName}</td>
   //                      <td>{item.firstName}</td>
   //                      <td>{item.lastName}</td>
   //                      <td>{dateString(item.createDate)}</td>
   //                   </tr>)
   //             })} */}
   //          </tbody>
   //       </Table>
   //    </div>
   // )
}

export default TablePage;
