import { FC, useEffect, useState } from 'react'
import '../../../App.css'
import Table from 'react-bootstrap/esm/Table'
import axios from 'axios';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Form from 'react-bootstrap/esm/Form';
import { Button } from 'react-bootstrap';
import TablePage from '../TablePage/TablePage';
import "./MainPage.css";

interface User {
  recordId: string; // GUID в C# представлений як string в TypeScript
  userId: number; // long в C# представлений як number в TypeScript
  firstName: string; // string в C# представлений як string в TypeScript
  lastName: string; // string в C# представлений як string в TypeScript
  telegramName?: string; // ? означає, що це поле є необов'язковим
  createDate: Date; // DateTime в C# представлений як Date в TypeScript
}

const MainPage: FC = () => {
  const [listUsers, setListUsers] = useState<User[] | null>(null);
  const [value, setValue] = useState<string>('');
  const [statusId, setStatusId] = useState<string>();

  //Get запрос. Получает список пользователей которие подали заявку на доступ к боту.
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const result = await axios.get("https://ironfalcon.somee.com/api");
        setListUsers(result.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    getAllUsers();
  }, [setListUsers])
//обновляет listUsers
  useEffect(() => {
  }, [listUsers]);

//обработчик ввода в поле "Дать доступ". Пропускает только цифри.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setStatusId('');
    // Перевіряємо, чи складається введене значення лише з цифр
    if (/^\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  const handleOnClickTD = (event: React.MouseEvent<HTMLTableCellElement>) => {
    const textTD = event.currentTarget.textContent;
    setValue(textTD ?? '');
  }

  const handleOnClickSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await axios.post('https://ironfalcon.somee.com/white_list/', value, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response.data);
      setStatusId(response.data)
    } catch (err) {
      alert(`Error posting ID: ${err}`);
    }
  }

  return (<>
    <div className='provide-access-container'>
      <div>
        <div className='Status-id'>{statusId}</div>
        <InputGroup className="mb-2" size="lg" >
          <Form.Control
            placeholder='Введите Id пользивателя'
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            className='bg-secondary'
            value={value}
            onChange={handleInputChange}
          />
          <Button type='button' variant='success' onClick={handleOnClickSubmit} >Дать доступ</Button>
        </InputGroup>
      </div>

      <div className='table-userid-container'>
        {value && < Table bordered hover  >
          <tbody >
            {listUsers?.filter(item => item.userId.toString().startsWith(value)).map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td onClick={handleOnClickTD}>{item.userId}</td>
                </tr>)
            })}
          </tbody>
        </Table>
        }
      </div>
    </div>
    <TablePage />
    <div></div>
    <div></div>
  </>
  );
}

export default MainPage;
