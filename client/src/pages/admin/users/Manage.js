import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import { getUsers } from '../../../functions/user';
import { toast } from "react-toastify";
import { getAuth, updateProfile } from 'firebase/auth';
import { disableUser } from '../../../functions/admin';
import { ConsoleSqlOutlined } from '@ant-design/icons';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
      loadAllUsers();
      //listAllUsers();
    }, [])

    const loadAllUsers = () => getUsers(user.token).then((res) => setUsers(res.data));

    const handleDisableLogin = (userId, disabled) => {
      disableUser(userId, disabled, user.token).then((res) => {
        console.log(res);
        loadAllUsers();
      })
    }

    /*const disableLogin = () => {
      const auth = getAuth();
      const user = auth.currentUser();
      if(user !== null) {
        const dsplayName = user.displayName;
        const email = user.email;
        const uid = user.uid;
        console.log(dsplayName, email, uid)
      }
    }*/

    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <AdminNav />
            </div>
            <div className="col-md-10">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Ime</th>
                    <th scope="col">Email</th>
                    <th scope="col">Rola</th>
                    <th scope="col">Akcije</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      {u.role !== "admin" ? 
                        (u.disabled ? 
                          (<td><button className='btn btn-success' onClick={() => handleDisableLogin(u._id, false)}>Omogućite prijavu</button></td>):
                          (<td><button className='btn btn-warning' onClick={() => handleDisableLogin(u._id, true)}>Onemogućite prijavu</button></td>)) : 
                        (<td><button className='btn' disabled>Onemogućite prijavu</button></td>)
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
}

export default ManageUsers;